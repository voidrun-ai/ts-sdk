import { Readable } from "node:stream";
import { writeFileSync, statSync, readFileSync, mkdirSync } from "node:fs";
import { VoidRun } from "../src/index.js";

async function main() {

    const vr = new VoidRun({});

    console.time("createSandbox");
    const sandbox = await vr.createSandbox({
        // name: "fs-suite-" + Date.now(),
        // cpu: 1,
        // mem: 1024,
        // orgId: "",
        // envVars: {
        //     DEBUG: 'true'
        // }
    });
    console.log(`Sandbox created: ${sandbox.id}`);
    console.timeEnd("createSandbox");


    // --- FS test plan ---
    // 1) mkdir
    // 2) create file + upload content
    // 3) list files
    // 4) stat file
    // 5) head/tail
    // 6) copy + move
    // 7) compress + extract
    // 8) search
    // 9) download + verify
    // 10) delete

    const fs = sandbox.fs;
    const baseDir = "/tmp/fs-e2e";
    const filePath = `${baseDir}/hello.txt`;
    const copyPath = `${baseDir}/hello-copy.txt`;
    const movedPath = `${baseDir}/sub/hello.txt`;
    let archivePath = `${baseDir}/hello.tar.gz`;
    const extractDir = `${baseDir}/extract`;

    const step = async (title: string, fn: () => Promise<any>) => {
        console.log(`\n[STEP] ${title}`);
        const result = await fn();
        console.log(JSON.stringify(result, null, 2));
        return result;
    };

    try {
        await step("createDirectory base", () => fs.createDirectory(baseDir));
        await step("createDirectory sub", () => fs.createDirectory(`${baseDir}/sub`));

        await step("createFile", () => fs.createFile(filePath));

        // Upload content via string
        await step("uploadFile (string)", () => fs.uploadFile(filePath, "hello world\nline two\nline three\n"));

        // Upload via stream (covers uploadFileStream helper)
        const stream = Readable.from(["streamed line A\n", "streamed line B\n"]);
        await step("uploadFileStream", () => fs.uploadFileStream(`${baseDir}/stream.txt`, Readable.toWeb(stream) as any));

        await step("listFiles", () => fs.listFiles(baseDir));

        await step("statFile", () => fs.statFile(filePath));

        await step("headTail", () => fs.headTail(filePath));

        await step("changePermissions", () => fs.changePermissions(filePath, "644"));

        await step("copyFile", () => fs.copyFile(filePath, copyPath));

        await step("moveFile", () => fs.moveFile(copyPath, movedPath));

        const archiveResp = await step("compressFile", () => fs.compressFile(baseDir, "tar.gz"));
        // Update archivePath based on response
        if (archiveResp?.archivePath) {
            archivePath = archiveResp.archivePath;
        } else if (archiveResp?.data?.archivePath) {
            archivePath = archiveResp.data.archivePath;
        }

        await step("extractArchive", () => fs.extractArchive(archivePath, extractDir));

        await step("folderSize", () => fs.folderSize(baseDir));

        await step("searchFiles", () => fs.searchFiles(baseDir, "*.txt"));

        // Download to verify content and save to temp file
        const downloaded = await step("downloadFile", () => fs.downloadFile(filePath));
        const downloadPath = `${baseDir}/downloaded.txt`;
        // Ensure target directory exists before writing
        mkdirSync(baseDir, { recursive: true });
        // Support Buffer or Uint8Array
        const downloadBuffer = Buffer.isBuffer(downloaded) ? downloaded : Buffer.from(downloaded);
        writeFileSync(downloadPath, downloadBuffer);
        const savedSize = statSync(downloadPath).size;
        const savedContent = readFileSync(downloadPath, "utf-8");
        console.log(`Saved downloaded file to ${downloadPath} (${savedSize} bytes)`);
        console.log(`Downloaded content preview:\n${savedContent}`);

        await step("deleteFile moved", () => fs.deleteFile(movedPath));
        await step("deleteFile stream.txt", () => fs.deleteFile(`${baseDir}/stream.txt`));
        await step("deleteFile downloaded", () => fs.deleteFile(downloadPath));
        await step("deleteFile archive", () => fs.deleteFile(archivePath));
        await step("deleteFile extract dir", () => fs.deleteFile(extractDir));
        await step("deleteFile base dir", () => fs.deleteFile(baseDir));

        console.log("\n✅ All filesystem operations completed successfully!");


    } catch (err) {
        console.error("FS test failed", err);
        process.exit(1);
    } finally {
        await sandbox.remove();
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});