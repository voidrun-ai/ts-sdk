# ExecutionApi

All URIs are relative to *http://localhost:33944/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**attachToBackgroundProcess**](ExecutionApi.md#attachtobackgroundprocess) | **POST** /sandboxes/{id}/commands/attach | Attach to process output (SSE stream) |
| [**connectPTY**](ExecutionApi.md#connectpty) | **GET** /sandboxes/{id}/pty | Connect to ephemeral PTY (WebSocket) |
| [**connectPTYSession**](ExecutionApi.md#connectptysession) | **GET** /sandboxes/{id}/pty/sessions/{sessionId} | Connect to PTY session (WebSocket) |
| [**createPTYSession**](ExecutionApi.md#createptysessionoperation) | **POST** /sandboxes/{id}/pty/sessions | Create PTY session |
| [**deletePTYSession**](ExecutionApi.md#deleteptysession) | **DELETE** /sandboxes/{id}/pty/sessions/{sessionId} | Delete PTY session |
| [**execCommand**](ExecutionApi.md#execcommand) | **POST** /sandboxes/{id}/exec | Execute command (synchronous) |
| [**execCommandStream**](ExecutionApi.md#execcommandstream) | **POST** /sandboxes/{id}/exec-stream | Execute command (SSE stream) |
| [**executeInPTYSession**](ExecutionApi.md#executeinptysession) | **POST** /sandboxes/{id}/pty/sessions/{sessionId}/execute | Execute command in PTY session |
| [**getPTYBuffer**](ExecutionApi.md#getptybuffer) | **GET** /sandboxes/{id}/pty/sessions/{sessionId}/buffer | Get output buffer |
| [**killBackgroundProcess**](ExecutionApi.md#killbackgroundprocessoperation) | **POST** /sandboxes/{id}/commands/kill | Kill background process |
| [**listBackgroundProcesses**](ExecutionApi.md#listbackgroundprocesses) | **GET** /sandboxes/{id}/commands/list | List running processes |
| [**listPTYSessions**](ExecutionApi.md#listptysessions) | **GET** /sandboxes/{id}/pty/sessions | List PTY sessions |
| [**resizeTerminal**](ExecutionApi.md#resizeterminaloperation) | **POST** /sandboxes/{id}/pty/sessions/{sessionId}/resize | Resize terminal |
| [**runBackgroundCommand**](ExecutionApi.md#runbackgroundcommandoperation) | **POST** /sandboxes/{id}/commands/run | Start background process |
| [**waitForBackgroundProcess**](ExecutionApi.md#waitforbackgroundprocess) | **POST** /sandboxes/{id}/commands/wait | Wait for process completion |



## attachToBackgroundProcess

> string attachToBackgroundProcess(id, killBackgroundProcessRequest)

Attach to process output (SSE stream)

Connect to a background process and stream its output as Server-Sent Events. Events: &#x60;stdout&#x60;, &#x60;stderr&#x60;, &#x60;exit&#x60;, &#x60;error&#x60;. 

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { AttachToBackgroundProcessRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // KillBackgroundProcessRequest
    killBackgroundProcessRequest: ...,
  } satisfies AttachToBackgroundProcessRequest;

  try {
    const data = await api.attachToBackgroundProcess(body);
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
| **killBackgroundProcessRequest** | [KillBackgroundProcessRequest](KillBackgroundProcessRequest.md) |  | |

### Return type

**string**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `text/event-stream`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | SSE stream of process output |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **404** | Process not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## connectPTY

> connectPTY(id)

Connect to ephemeral PTY (WebSocket)

Establish a WebSocket connection for temporary terminal access. The WebSocket URL format is: &#x60;ws://host/api/sandboxes/{id}/pty&#x60; 

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { ConnectPTYRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
  } satisfies ConnectPTYRequest;

  try {
    const data = await api.connectPTY(body);
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

`void` (Empty response body)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **101** | Switching to WebSocket protocol |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## connectPTYSession

> connectPTYSession(id, sessionId)

Connect to PTY session (WebSocket)

Establish a WebSocket connection to a PTY session for interactive terminal access. The WebSocket URL format is: &#x60;ws://host/api/sandboxes/{id}/pty/sessions/{sessionId}&#x60; 

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { ConnectPTYSessionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    sessionId: session-123456,
  } satisfies ConnectPTYSessionRequest;

  try {
    const data = await api.connectPTYSession(body);
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
| **101** | Switching to WebSocket protocol |  -  |
| **401** | Unauthorized |  -  |
| **404** | Session not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createPTYSession

> CreatePTYSession200Response createPTYSession(id, createPTYSessionRequest)

Create PTY session

Create a new PTY (pseudo-terminal) session for interactive commands

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { CreatePTYSessionOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // CreatePTYSessionRequest (optional)
    createPTYSessionRequest: ...,
  } satisfies CreatePTYSessionOperationRequest;

  try {
    const data = await api.createPTYSession(body);
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
| **createPTYSessionRequest** | [CreatePTYSessionRequest](CreatePTYSessionRequest.md) |  | [Optional] |

### Return type

[**CreatePTYSession200Response**](CreatePTYSession200Response.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Session created |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deletePTYSession

> SuccessResponse deletePTYSession(id, sessionId)

Delete PTY session

Close and delete a PTY session

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { DeletePTYSessionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    sessionId: session-123456,
  } satisfies DeletePTYSessionRequest;

  try {
    const data = await api.deletePTYSession(body);
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

[**SuccessResponse**](SuccessResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Session deleted |  -  |
| **401** | Unauthorized |  -  |
| **404** | Session not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## execCommand

> ExecResponse execCommand(id, execRequest)

Execute command (synchronous)

Execute a command in the sandbox and wait for the result

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { ExecCommandRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // ExecRequest
    execRequest: ...,
  } satisfies ExecCommandRequest;

  try {
    const data = await api.execCommand(body);
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
| **execRequest** | [ExecRequest](ExecRequest.md) |  | |

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
| **200** | Command executed |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## execCommandStream

> string execCommandStream(id, execRequest)

Execute command (SSE stream)

Execute a command and stream output as Server-Sent Events. Events: &#x60;stdout&#x60;, &#x60;stderr&#x60;, and final &#x60;exit&#x60;. 

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { ExecCommandStreamRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // ExecRequest
    execRequest: ...,
  } satisfies ExecCommandStreamRequest;

  try {
    const data = await api.execCommandStream(body);
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
| **execRequest** | [ExecRequest](ExecRequest.md) |  | |

### Return type

**string**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `text/event-stream`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | SSE stream of command output |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## executeInPTYSession

> SuccessResponse executeInPTYSession(id, sessionId, executeInSessionRequest)

Execute command in PTY session

Execute a command asynchronously in an existing PTY session

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { ExecuteInPTYSessionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    sessionId: session-123456,
    // ExecuteInSessionRequest
    executeInSessionRequest: ...,
  } satisfies ExecuteInPTYSessionRequest;

  try {
    const data = await api.executeInPTYSession(body);
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
| **executeInSessionRequest** | [ExecuteInSessionRequest](ExecuteInSessionRequest.md) |  | |

### Return type

[**SuccessResponse**](SuccessResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Command executed |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **404** | Session not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getPTYBuffer

> GetPTYBuffer200Response getPTYBuffer(id, sessionId)

Get output buffer

Get the current output buffer from a PTY session

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { GetPTYBufferRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    sessionId: session-123456,
  } satisfies GetPTYBufferRequest;

  try {
    const data = await api.getPTYBuffer(body);
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

[**GetPTYBuffer200Response**](GetPTYBuffer200Response.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Output buffer |  -  |
| **401** | Unauthorized |  -  |
| **404** | Session not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## killBackgroundProcess

> CommandKillResponse killBackgroundProcess(id, killBackgroundProcessRequest)

Kill background process

Terminate a running background process by PID

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { KillBackgroundProcessOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // KillBackgroundProcessRequest
    killBackgroundProcessRequest: ...,
  } satisfies KillBackgroundProcessOperationRequest;

  try {
    const data = await api.killBackgroundProcess(body);
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
| **killBackgroundProcessRequest** | [KillBackgroundProcessRequest](KillBackgroundProcessRequest.md) |  | |

### Return type

[**CommandKillResponse**](CommandKillResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Process killed |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **404** | Process not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listBackgroundProcesses

> CommandListResponse listBackgroundProcesses(id)

List running processes

Get list of all running background processes in the sandbox

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { ListBackgroundProcessesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
  } satisfies ListBackgroundProcessesRequest;

  try {
    const data = await api.listBackgroundProcesses(body);
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

[**CommandListResponse**](CommandListResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Process list |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listPTYSessions

> ListPTYSessions200Response listPTYSessions(id)

List PTY sessions

Get all active PTY sessions for a sandbox

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { ListPTYSessionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
  } satisfies ListPTYSessionsRequest;

  try {
    const data = await api.listPTYSessions(body);
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

[**ListPTYSessions200Response**](ListPTYSessions200Response.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of sessions |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## resizeTerminal

> SuccessResponse resizeTerminal(id, sessionId, resizeTerminalRequest)

Resize terminal

Resize the terminal dimensions for a PTY session

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { ResizeTerminalOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // string
    sessionId: session-123456,
    // ResizeTerminalRequest
    resizeTerminalRequest: ...,
  } satisfies ResizeTerminalOperationRequest;

  try {
    const data = await api.resizeTerminal(body);
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
| **resizeTerminalRequest** | [ResizeTerminalRequest](ResizeTerminalRequest.md) |  | |

### Return type

[**SuccessResponse**](SuccessResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Terminal resized |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **404** | Session not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## runBackgroundCommand

> CommandRunResponse runBackgroundCommand(id, runBackgroundCommandRequest)

Start background process

Start a command as a background process and return its PID

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { RunBackgroundCommandOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // RunBackgroundCommandRequest
    runBackgroundCommandRequest: ...,
  } satisfies RunBackgroundCommandOperationRequest;

  try {
    const data = await api.runBackgroundCommand(body);
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
| **runBackgroundCommandRequest** | [RunBackgroundCommandRequest](RunBackgroundCommandRequest.md) |  | |

### Return type

[**CommandRunResponse**](CommandRunResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Process started |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **404** | Sandbox not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## waitForBackgroundProcess

> CommandWaitResponse waitForBackgroundProcess(id, killBackgroundProcessRequest)

Wait for process completion

Block until a background process completes and return its exit code

### Example

```ts
import {
  Configuration,
  ExecutionApi,
} from '';
import type { WaitForBackgroundProcessRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new ExecutionApi(config);

  const body = {
    // string
    id: 65ae1234567890abcdef1234,
    // KillBackgroundProcessRequest
    killBackgroundProcessRequest: ...,
  } satisfies WaitForBackgroundProcessRequest;

  try {
    const data = await api.waitForBackgroundProcess(body);
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
| **killBackgroundProcessRequest** | [KillBackgroundProcessRequest](KillBackgroundProcessRequest.md) |  | |

### Return type

[**CommandWaitResponse**](CommandWaitResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Process completed |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **404** | Process not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

