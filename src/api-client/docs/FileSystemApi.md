# FileSystemApi

All URIs are relative to *http://localhost:33944/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**changePermissions**](FileSystemApi.md#changepermissions) | **POST** /sandboxes/{id}/files/chmod | Change file permissions |
| [**compressFile**](FileSystemApi.md#compressfile) | **POST** /sandboxes/{id}/files/compress | Compress file or directory |
| [**copyFile**](FileSystemApi.md#copyfile) | **POST** /sandboxes/{id}/files/copy | Copy file or directory |
| [**createDirectory**](FileSystemApi.md#createdirectory) | **POST** /sandboxes/{id}/files/mkdir | Create directory |
| [**createFile**](FileSystemApi.md#createfileoperation) | **POST** /sandboxes/{id}/files/create | Create file |
| [**deleteFile**](FileSystemApi.md#deletefile) | **DELETE** /sandboxes/{id}/files | Delete file or directory |
| [**diskUsage**](FileSystemApi.md#diskusage) | **GET** /sandboxes/{id}/files/du | Disk usage |
| [**downloadFile**](FileSystemApi.md#downloadfile) | **GET** /sandboxes/{id}/files/download | Download file |
| [**extractArchive**](FileSystemApi.md#extractarchive) | **POST** /sandboxes/{id}/files/extract | Extract archive |
| [**headTail**](FileSystemApi.md#headtail) | **GET** /sandboxes/{id}/files/head-tail | Read file head or tail |
| [**listFiles**](FileSystemApi.md#listfiles) | **GET** /sandboxes/{id}/files | List files |
| [**moveFile**](FileSystemApi.md#movefile) | **POST** /sandboxes/{id}/files/move | Move file or directory |
| [**searchFiles**](FileSystemApi.md#searchfiles) | **GET** /sandboxes/{id}/files/search | Search files |
| [**startWatch**](FileSystemApi.md#startwatchoperation) | **POST** /sandboxes/{id}/files/watch | Start watching a directory |
| [**statFile**](FileSystemApi.md#statfile) | **GET** /sandboxes/{id}/files/stat | Get file stats |
| [**streamWatchEvents**](FileSystemApi.md#streamwatchevents) | **GET** /sandboxes/{id}/files/watch/{sessionId}/stream | Stream file watch events (WebSocket) |
| [**uploadFile**](FileSystemApi.md#uploadfile) | **POST** /sandboxes/{id}/files/upload | Upload file |



## changePermissions

> ExecResponse changePermissions(id, path, mode)

Change file permissions

Change the permissions (mode) of a file or directory

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { ChangePermissionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    path: /script.sh,
    // string | Octal file mode (e.g., 755, 0644)
    mode: 755,
  } satisfies ChangePermissionsRequest;

  try {
    const data = await api.changePermissions(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **path** | `string` |  | [Defaults to `undefined`] |
| **mode** | `string` | Octal file mode (e.g., 755, 0644) | [Defaults to `undefined`] |

### Return type

[**ExecResponse**](ExecResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Permissions changed |  -  |
| **401** | Unauthorized |  -  |
| **400** | Invalid mode or path not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## compressFile

> ExecResponse compressFile(id, path, format)

Compress file or directory

Create an archive from a file or directory

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { CompressFileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    path: /dir,
    // 'tar' | 'tar.gz' | 'tar.bz2' | 'zip' (optional)
    format: tar.gz,
  } satisfies CompressFileRequest;

  try {
    const data = await api.compressFile(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **path** | `string` |  | [Defaults to `undefined`] |
| **format** | `tar`, `tar.gz`, `tar.bz2`, `zip` |  | [Optional] [Defaults to `&#39;tar.gz&#39;`] [Enum: tar, tar.gz, tar.bz2, zip] |

### Return type

[**ExecResponse**](ExecResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | File compressed |  -  |
| **401** | Unauthorized |  -  |
| **400** | Invalid path or format |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## copyFile

> ExecResponse copyFile(id, from, to)

Copy file or directory

Copy a file or directory to a new location

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { CopyFileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    from: /src,
    // string
    to: /dst,
  } satisfies CopyFileRequest;

  try {
    const data = await api.copyFile(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **from** | `string` |  | [Defaults to `undefined`] |
| **to** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ExecResponse**](ExecResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | File copied |  -  |
| **401** | Unauthorized |  -  |
| **400** | Invalid paths or source not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createDirectory

> ExecResponse createDirectory(id, path)

Create directory

Create a new directory

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { CreateDirectoryRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    path: /new/dir,
  } satisfies CreateDirectoryRequest;

  try {
    const data = await api.createDirectory(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **path** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ExecResponse**](ExecResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Directory created |  -  |
| **401** | Unauthorized |  -  |
| **400** | Invalid path or already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createFile

> ExecResponse createFile(id, path, content, createFileRequest)

Create file

Create a new file with optional content

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { CreateFileOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    path: /file.txt,
    // string (optional)
    content: hello,
    // CreateFileRequest (optional)
    createFileRequest: ...,
  } satisfies CreateFileOperationRequest;

  try {
    const data = await api.createFile(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **path** | `string` |  | [Defaults to `undefined`] |
| **content** | `string` |  | [Optional] [Defaults to `undefined`] |
| **createFileRequest** | [CreateFileRequest](CreateFileRequest.md) |  | [Optional] |

### Return type

[**ExecResponse**](ExecResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | File created |  -  |
| **401** | Unauthorized |  -  |
| **400** | Invalid path |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteFile

> ExecResponse deleteFile(id, path)

Delete file or directory

Delete a file or directory

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { DeleteFileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    path: /root/file.txt,
  } satisfies DeleteFileRequest;

  try {
    const data = await api.deleteFile(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **path** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ExecResponse**](ExecResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | File deleted |  -  |
| **401** | Unauthorized |  -  |
| **404** | File not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## diskUsage

> ExecResponse diskUsage(id, path)

Disk usage

Get disk usage for a path

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { DiskUsageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    path: /dir,
  } satisfies DiskUsageRequest;

  try {
    const data = await api.diskUsage(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **path** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ExecResponse**](ExecResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Disk usage information |  -  |
| **401** | Unauthorized |  -  |
| **404** | Path not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## downloadFile

> Blob downloadFile(id, path)

Download file

Download a file from the sandbox

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { DownloadFileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    path: /root/output.log,
  } satisfies DownloadFileRequest;

  try {
    const data = await api.downloadFile(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **path** | `string` |  | [Defaults to `undefined`] |

### Return type

**Blob**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/octet-stream`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | File content |  -  |
| **401** | Unauthorized |  -  |
| **404** | File not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## extractArchive

> ExecResponse extractArchive(id, archive, dest)

Extract archive

Extract an archive to a destination directory

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { ExtractArchiveRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    archive: /backup.tar.gz,
    // string
    dest: /restore,
  } satisfies ExtractArchiveRequest;

  try {
    const data = await api.extractArchive(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **archive** | `string` |  | [Defaults to `undefined`] |
| **dest** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ExecResponse**](ExecResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Archive extracted |  -  |
| **401** | Unauthorized |  -  |
| **400** | Invalid archive or destination |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## headTail

> ExecResponse headTail(id, path, lines, head)

Read file head or tail

Get the first or last N lines of a file

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { HeadTailRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    path: /var/log/syslog,
    // number (optional)
    lines: 50,
    // boolean | If true, return head (first lines), if false, return tail (last lines) (optional)
    head: false,
  } satisfies HeadTailRequest;

  try {
    const data = await api.headTail(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **path** | `string` |  | [Defaults to `undefined`] |
| **lines** | `number` |  | [Optional] [Defaults to `10`] |
| **head** | `boolean` | If true, return head (first lines), if false, return tail (last lines) | [Optional] [Defaults to `true`] |

### Return type

[**ExecResponse**](ExecResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | File content (head or tail) |  -  |
| **401** | Unauthorized |  -  |
| **404** | File not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listFiles

> ListFiles200Response listFiles(id, path)

List files

List files and directories in a path

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { ListFilesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    path: /root,
  } satisfies ListFilesRequest;

  try {
    const data = await api.listFiles(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **path** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ListFiles200Response**](ListFiles200Response.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of files |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox or path not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## moveFile

> ExecResponse moveFile(id, from, to)

Move file or directory

Move or rename a file or directory

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { MoveFileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    from: /src,
    // string
    to: /dst,
  } satisfies MoveFileRequest;

  try {
    const data = await api.moveFile(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **from** | `string` |  | [Defaults to `undefined`] |
| **to** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ExecResponse**](ExecResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | File moved |  -  |
| **401** | Unauthorized |  -  |
| **400** | Invalid paths or source not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## searchFiles

> ExecResponse searchFiles(id, path, pattern)

Search files

Search for files matching a pattern

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { SearchFilesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    path: /var/log,
    // string
    pattern: *.error,
  } satisfies SearchFilesRequest;

  try {
    const data = await api.searchFiles(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **path** | `string` |  | [Defaults to `undefined`] |
| **pattern** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ExecResponse**](ExecResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Matching files |  -  |
| **401** | Unauthorized |  -  |
| **404** | Path not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## startWatch

> StartWatch200Response startWatch(id, startWatchRequest)

Start watching a directory

Start monitoring a directory for file system events (create, modify, delete, rename) with optional recursion and hidden-dir filtering.

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { StartWatchOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // StartWatchRequest
    startWatchRequest: ...,
  } satisfies StartWatchOperationRequest;

  try {
    const data = await api.startWatch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **startWatchRequest** | [StartWatchRequest](StartWatchRequest.md) |  | |

### Return type

[**StartWatch200Response**](StartWatch200Response.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Watch session started successfully |  -  |
| **400** | Invalid path or parameters |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## statFile

> ExecResponse statFile(id, path)

Get file stats

Get detailed information about a file or directory

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { StatFileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    path: /file.txt,
  } satisfies StatFileRequest;

  try {
    const data = await api.statFile(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **path** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ExecResponse**](ExecResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | File statistics |  -  |
| **401** | Unauthorized |  -  |
| **404** | File not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## streamWatchEvents

> streamWatchEvents(id, sessionId)

Stream file watch events (WebSocket)

**RECOMMENDED:** Real-time WebSocket streaming of file system events.  Connect via WebSocket to receive events as they occur. This is more efficient than polling the &#x60;/events&#x60; endpoint and provides immediate notification of file system changes.  **WebSocket Protocol:** - Client connects to this endpoint - Server upgrades connection to WebSocket - Events are pushed to client as JSON objects - Connection stays open until client disconnects or session is stopped  **Event Format:** Each message is a FileEvent object (same as polling endpoint) 

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { StreamWatchEventsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    sessionId: a1b2c3d4-e5f6-7890-abcd-ef1234567890,
  } satisfies StreamWatchEventsRequest;

  try {
    const data = await api.streamWatchEvents(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **sessionId** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **101** | Switching Protocols - WebSocket connection established |  -  |
| **400** | Invalid session ID or upgrade failed |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox or session not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## uploadFile

> SuccessResponse uploadFile(id, path, body)

Upload file

Upload a file to the sandbox

### Example

```ts
import {
  Configuration,
  FileSystemApi,
} from '';
import type { UploadFileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new FileSystemApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    path: /root/script.sh,
    // Blob
    body: BINARY_DATA_HERE,
  } satisfies UploadFileRequest;

  try {
    const data = await api.uploadFile(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **path** | `string` |  | [Defaults to `undefined`] |
| **body** | `Blob` |  | |

### Return type

[**SuccessResponse**](SuccessResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: `application/octet-stream`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | File uploaded |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

