# SandboxesApi

All URIs are relative to *http://localhost:33944/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createSandbox**](SandboxesApi.md#createsandboxoperation) | **POST** /sandboxes | Create sandbox |
| [**createSnapshot**](SandboxesApi.md#createsnapshot) | **POST** /sandboxes/{id}/snapshot | Create snapshot |
| [**deleteSandbox**](SandboxesApi.md#deletesandbox) | **DELETE** /sandboxes/{id} | Delete sandbox |
| [**getSandbox**](SandboxesApi.md#getsandbox) | **GET** /sandboxes/{id} | Get sandbox details |
| [**listSandboxes**](SandboxesApi.md#listsandboxes) | **GET** /sandboxes | List sandboxes |
| [**listSnapshots**](SandboxesApi.md#listsnapshots) | **GET** /sandboxes/{id}/snapshots | List snapshots |
| [**pauseSandbox**](SandboxesApi.md#pausesandbox) | **POST** /sandboxes/{id}/pause | Pause sandbox |
| [**restoreSandbox**](SandboxesApi.md#restoresandboxoperation) | **POST** /sandboxes/restore | Restore sandbox from snapshot |
| [**resumeSandbox**](SandboxesApi.md#resumesandbox) | **POST** /sandboxes/{id}/resume | Resume sandbox |
| [**startSandbox**](SandboxesApi.md#startsandbox) | **POST** /sandboxes/{id}/start | Start sandbox |
| [**stopSandbox**](SandboxesApi.md#stopsandbox) | **POST** /sandboxes/{id}/stop | Stop sandbox |



## createSandbox

> CreateSandbox201Response createSandbox(createSandboxRequest)

Create sandbox

Create a new virtual machine sandbox

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from '';
import type { CreateSandboxOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SandboxesApi(config);

  const body = {
    // CreateSandboxRequest
    createSandboxRequest: ...,
  } satisfies CreateSandboxOperationRequest;

  try {
    const data = await api.createSandbox(body);
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
| **createSandboxRequest** | [CreateSandboxRequest](CreateSandboxRequest.md) |  | |

### Return type

[**CreateSandbox201Response**](CreateSandbox201Response.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Sandbox created |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **409** | Sandbox already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createSnapshot

> SuccessResponse createSnapshot(id)

Create snapshot

Create a snapshot of the sandbox

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from '';
import type { CreateSnapshotRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
  } satisfies CreateSnapshotRequest;

  try {
    const data = await api.createSnapshot(body);
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

### Return type

[**SuccessResponse**](SuccessResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Snapshot created |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteSandbox

> SuccessResponse deleteSandbox(id)

Delete sandbox

Delete a sandbox and all its resources

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from '';
import type { DeleteSandboxRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
  } satisfies DeleteSandboxRequest;

  try {
    const data = await api.deleteSandbox(body);
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

### Return type

[**SuccessResponse**](SuccessResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox deleted |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSandbox

> ApiResponseSandbox getSandbox(id)

Get sandbox details

Get detailed information about a specific sandbox

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from '';
import type { GetSandboxRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
  } satisfies GetSandboxRequest;

  try {
    const data = await api.getSandbox(body);
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

### Return type

[**ApiResponseSandbox**](ApiResponseSandbox.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox details |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listSandboxes

> ApiResponseSandboxesList listSandboxes(page, limit)

List sandboxes

Get all sandboxes for the current organization with pagination support

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from '';
import type { ListSandboxesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SandboxesApi(config);

  const body = {
    // number | Page number (default 1, must be >= 1) (optional)
    page: 1,
    // number | Number of sandboxes per page (min 1, max 100, default from server config) (optional)
    limit: 50,
  } satisfies ListSandboxesRequest;

  try {
    const data = await api.listSandboxes(body);
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
| **page** | `number` | Page number (default 1, must be &gt;&#x3D; 1) | [Optional] [Defaults to `1`] |
| **limit** | `number` | Number of sandboxes per page (min 1, max 100, default from server config) | [Optional] [Defaults to `undefined`] |

### Return type

[**ApiResponseSandboxesList**](ApiResponseSandboxesList.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of sandboxes with pagination metadata |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listSnapshots

> Array&lt;Snapshot&gt; listSnapshots(id)

List snapshots

Get all snapshots for a sandbox

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from '';
import type { ListSnapshotsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
  } satisfies ListSnapshotsRequest;

  try {
    const data = await api.listSnapshots(body);
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

### Return type

[**Array&lt;Snapshot&gt;**](Snapshot.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of snapshots |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## pauseSandbox

> SuccessResponse pauseSandbox(id)

Pause sandbox

Pause a running sandbox

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from '';
import type { PauseSandboxRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
  } satisfies PauseSandboxRequest;

  try {
    const data = await api.pauseSandbox(body);
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

### Return type

[**SuccessResponse**](SuccessResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox paused |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## restoreSandbox

> Sandbox restoreSandbox(restoreSandboxRequest)

Restore sandbox from snapshot

Create a new sandbox from an existing snapshot

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from '';
import type { RestoreSandboxOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SandboxesApi(config);

  const body = {
    // RestoreSandboxRequest
    restoreSandboxRequest: ...,
  } satisfies RestoreSandboxOperationRequest;

  try {
    const data = await api.restoreSandbox(body);
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
| **restoreSandboxRequest** | [RestoreSandboxRequest](RestoreSandboxRequest.md) |  | |

### Return type

[**Sandbox**](Sandbox.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Sandbox restored |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## resumeSandbox

> SuccessResponse resumeSandbox(id)

Resume sandbox

Resume a paused sandbox

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from '';
import type { ResumeSandboxRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
  } satisfies ResumeSandboxRequest;

  try {
    const data = await api.resumeSandbox(body);
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

### Return type

[**SuccessResponse**](SuccessResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox resumed |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## startSandbox

> SuccessResponse startSandbox(id)

Start sandbox

Start a stopped sandbox

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from '';
import type { StartSandboxRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
  } satisfies StartSandboxRequest;

  try {
    const data = await api.startSandbox(body);
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

### Return type

[**SuccessResponse**](SuccessResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox started |  -  |
| **400** | Invalid request (sandbox not stopped) |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## stopSandbox

> SuccessResponse stopSandbox(id)

Stop sandbox

Stop a running sandbox

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from '';
import type { StopSandboxRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
  } satisfies StopSandboxRequest;

  try {
    const data = await api.stopSandbox(body);
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

### Return type

[**SuccessResponse**](SuccessResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox stopped |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

