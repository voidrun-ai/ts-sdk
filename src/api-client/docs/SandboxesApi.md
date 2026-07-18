# SandboxesApi

All URIs are relative to *https://platform.void-run.com/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createSandbox**](SandboxesApi.md#createsandboxoperation) | **POST** /sandboxes | Create sandbox |
| [**deleteSandbox**](SandboxesApi.md#deletesandbox) | **DELETE** /sandboxes/{id} | Delete sandbox |
| [**getSandbox**](SandboxesApi.md#getsandbox) | **GET** /sandboxes/{id} | Get sandbox details |
| [**listSandboxes**](SandboxesApi.md#listsandboxes) | **GET** /sandboxes | List sandboxes |
| [**sleepSandbox**](SandboxesApi.md#sleepsandbox) | **POST** /sandboxes/{id}/sleep | Sleep sandbox |
| [**startSandbox**](SandboxesApi.md#startsandbox) | **POST** /sandboxes/{id}/start | Start sandbox |
| [**wakeSandbox**](SandboxesApi.md#wakesandbox) | **POST** /sandboxes/{id}/wake | Wake sandbox |



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

> ApiResponseSandboxesList listSandboxes(page, limit, labels)

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
    // string | Filter by labels as comma-separated `key=value` pairs. Sandboxes must match **all** given pairs (AND semantics); extra labels on the sandbox are ignored. Omit to return sandboxes regardless of labels. (optional)
    labels: env=prod,team=backend,
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
| **labels** | `string` | Filter by labels as comma-separated &#x60;key&#x3D;value&#x60; pairs. Sandboxes must match **all** given pairs (AND semantics); extra labels on the sandbox are ignored. Omit to return sandboxes regardless of labels. | [Optional] [Defaults to `undefined`] |

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
| **400** | Malformed labels selector (bad &#x60;key&#x3D;value&#x60; syntax, invalid key format, or too many pairs) |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## sleepSandbox

> SuccessResponse sleepSandbox(id)

Sleep sandbox

Put a running sandbox to sleep (state is persisted, VM process exits).

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from '';
import type { SleepSandboxRequest } from '';

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
  } satisfies SleepSandboxRequest;

  try {
    const data = await api.sleepSandbox(body);
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
| **200** | Sandbox snapshotted |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## startSandbox

> SuccessResponse startSandbox(id)

Start sandbox

Boot a stopped sandbox back into a running state. Accepts sandboxes in &#x60;snapshotted&#x60;, &#x60;killed&#x60;, or &#x60;error&#x60; status and restores from the latest on-disk snapshot. Returns 500 if no snapshot is available (the sandbox must then be deleted and recreated). 

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
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |
| **500** | Start failed (e.g. no snapshot available, or restore error) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## wakeSandbox

> SuccessResponse wakeSandbox(id)

Wake sandbox

Wake a sleeping sandbox from its persisted state.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from '';
import type { WakeSandboxRequest } from '';

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
  } satisfies WakeSandboxRequest;

  try {
    const data = await api.wakeSandbox(body);
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
| **200** | Sandbox restored |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

