// Tests stub `Configuration.fetchApi` to exercise the SDK wire shape
// without a live gateway. Run with `npm run test:unit`.

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  Configuration,
  type Sandbox as SandboxModel,
} from '../src/api-client/index.js';
import VRSandbox from '../src/Sandbox.js';

type FetchCall = {
  url: string;
  init?: RequestInit;
};

function makeFakeFetch(response: {
  status?: number;
  body?: unknown;
  text?: string;
}) {
  const calls: FetchCall[] = [];
  const fetchApi = async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), init });
    const status = response.status ?? 200;
    const body =
      response.text !== undefined
        ? response.text
        : JSON.stringify(response.body ?? {});

    return new Response(body, {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return { fetchApi, calls };
}

function makeSandbox(
  fetchApi: typeof globalThis.fetch,
  opts?: { apiKey?: string },
) {
  const config = new Configuration({
    basePath: 'https://api.example.com/api',
    apiKey: opts?.apiKey,
    fetchApi,
  });
  const model: SandboxModel = {
    id: '65fabc1234567890abcdef12',
    name: 'sb',
    cpu: 1,
    mem: 1024,
    orgId: 'org1',
    createdAt: new Date('2026-01-01T00:00:00Z'),
    createdBy: 'user1',
    status: 'running',
  };

  return new VRSandbox(model, config);
}

const envelope = (data: unknown) => ({
  status: 'success',
  message: 'Public URLs fetched',
  data,
});

test('getPublicUrls builds correct URL and sends X-API-Key', async () => {
  const { fetchApi, calls } = makeFakeFetch({
    body: envelope([
      { port: 8080, url: 'https://sabcdef12-8080.sb.example.com' },
    ]),
  });
  const sandbox = makeSandbox(fetchApi as unknown as typeof globalThis.fetch, {
    apiKey: 'test-api-key',
  });

  const urls = await sandbox.getPublicUrls();

  assert.equal(calls.length, 1);
  assert.equal(
    calls[0]!.url,
    'https://api.example.com/api/sandboxes/65fabc1234567890abcdef12/public-urls',
  );
  assert.equal(calls[0]!.init?.method, 'GET');
  const headers = calls[0]!.init?.headers as Record<string, string>;
  assert.equal(headers['X-API-Key'], 'test-api-key');
  assert.equal(headers['Accept'], 'application/json');

  assert.deepEqual(urls, [
    { port: 8080, url: 'https://sabcdef12-8080.sb.example.com' },
  ]);
});

test('getPublicUrls omits X-API-Key when no api key is configured', async () => {
  const { fetchApi, calls } = makeFakeFetch({ body: envelope([]) });
  const sandbox = makeSandbox(fetchApi as unknown as typeof globalThis.fetch);
  await sandbox.getPublicUrls();
  const headers = calls[0]!.init?.headers as Record<string, string>;
  assert.equal(headers['X-API-Key'], undefined);
});

test('getPublicUrls parses multiple ports and preserves order', async () => {
  const { fetchApi } = makeFakeFetch({
    body: envelope([
      { port: 8080, url: 'https://s-8080.sb' },
      { port: 3000, url: 'https://s-3000.sb' },
    ]),
  });
  const sandbox = makeSandbox(fetchApi as unknown as typeof globalThis.fetch, {
    apiKey: 'k',
  });
  const urls = await sandbox.getPublicUrls();
  assert.deepEqual(urls, [
    { port: 8080, url: 'https://s-8080.sb' },
    { port: 3000, url: 'https://s-3000.sb' },
  ]);
});

test('getPublicUrls returns empty array when server sends none', async () => {
  const { fetchApi } = makeFakeFetch({ body: envelope([]) });
  const sandbox = makeSandbox(fetchApi as unknown as typeof globalThis.fetch, {
    apiKey: 'k',
  });
  const urls = await sandbox.getPublicUrls();
  assert.deepEqual(urls, []);
});

test('getPublicUrls tolerates non-array or missing data', async () => {
  const { fetchApi: fetchNonArray } = makeFakeFetch({
    body: { status: 'success', data: 'oops' },
  });
  const sb1 = makeSandbox(fetchNonArray as unknown as typeof globalThis.fetch, {
    apiKey: 'k',
  });
  assert.deepEqual(await sb1.getPublicUrls(), []);

  const { fetchApi: fetchMissing } = makeFakeFetch({
    body: { status: 'success', message: 'no data' },
  });
  const sb2 = makeSandbox(fetchMissing as unknown as typeof globalThis.fetch, {
    apiKey: 'k',
  });
  assert.deepEqual(await sb2.getPublicUrls(), []);
});

test('getPublicUrls skips entries missing port or url', async () => {
  const { fetchApi } = makeFakeFetch({
    body: envelope([
      { port: 8080, url: 'https://s-8080.sb' },
      { port: 3000 },
      { url: 'https://no-port.sb' },
      { port: 99999, url: 'https://oob.sb' },
      { port: 'not-a-number', url: 'https://bad.sb' },
      'not-an-object',
    ]),
  });
  const sandbox = makeSandbox(fetchApi as unknown as typeof globalThis.fetch, {
    apiKey: 'k',
  });
  const urls = await sandbox.getPublicUrls();
  assert.deepEqual(urls, [{ port: 8080, url: 'https://s-8080.sb' }]);
});

test('getPublicUrls throws on HTTP error and surfaces server body', async () => {
  const { fetchApi } = makeFakeFetch({
    status: 502,
    text: '{"error":"upstream boom"}',
  });
  const sandbox = makeSandbox(fetchApi as unknown as typeof globalThis.fetch, {
    apiKey: 'k',
  });
  await assert.rejects(() => sandbox.getPublicUrls(), /upstream boom/);
});

test('getPublicUrl returns matching entry by port', async () => {
  const { fetchApi } = makeFakeFetch({
    body: envelope([
      { port: 8080, url: 'https://s-8080.sb' },
      { port: 3000, url: 'https://s-3000.sb' },
    ]),
  });
  const sandbox = makeSandbox(fetchApi as unknown as typeof globalThis.fetch, {
    apiKey: 'k',
  });
  const entry = await sandbox.getPublicUrl(3000);
  assert.deepEqual(entry, { port: 3000, url: 'https://s-3000.sb' });
});

test('getPublicUrl returns undefined for unknown port', async () => {
  const { fetchApi } = makeFakeFetch({
    body: envelope([{ port: 8080, url: 'https://s-8080.sb' }]),
  });
  const sandbox = makeSandbox(fetchApi as unknown as typeof globalThis.fetch, {
    apiKey: 'k',
  });
  const entry = await sandbox.getPublicUrl(9999);
  assert.equal(entry, undefined);
});
