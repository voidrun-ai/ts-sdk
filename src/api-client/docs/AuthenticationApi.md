# AuthenticationApi

All URIs are relative to *http://localhost:33944/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**register**](AuthenticationApi.md#registeroperation) | **POST** /register | Register a new user |



## register

> RegisterResponse register(registerRequest)

Register a new user

Create a new user account and default organization. This is the only public endpoint - no authentication required. **Important:** Save the returned API key immediately as it\&#39;s only shown once. 

### Example

```ts
import {
  Configuration,
  AuthenticationApi,
} from '';
import type { RegisterOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthenticationApi();

  const body = {
    // RegisterRequest
    registerRequest: ...,
  } satisfies RegisterOperationRequest;

  try {
    const data = await api.register(body);
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
| **registerRequest** | [RegisterRequest](RegisterRequest.md) |  | |

### Return type

[**RegisterResponse**](RegisterResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | User registered successfully |  -  |
| **400** | Invalid request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

