# SystemApi

All URIs are relative to *https://platform.void-run.com/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getVersion**](SystemApi.md#getversion) | **GET** /version | Get server version |



## getVersion

> GetVersion200Response getVersion()

Get server version

Get server version, commit, and build metadata.

### Example

```ts
import {
  Configuration,
  SystemApi,
} from '';
import type { GetVersionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SystemApi();

  try {
    const data = await api.getVersion();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetVersion200Response**](GetVersion200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Version information |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

