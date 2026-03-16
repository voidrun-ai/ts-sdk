# OrganizationsApi

All URIs are relative to *https://platform.void-run.com/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**activateAPIKey**](OrganizationsApi.md#activateapikeyoperation) | **POST** /orgs/apikeys/{keyId}/activate | Activate or deactivate API key |
| [**generateAPIKey**](OrganizationsApi.md#generateapikeyoperation) | **POST** /orgs/apikeys | Generate new API key |
| [**getOrgUsers**](OrganizationsApi.md#getorgusers) | **GET** /orgs/users | List organization users |
| [**listAPIKeys**](OrganizationsApi.md#listapikeys) | **GET** /orgs/apikeys | List API keys |
| [**revokeAPIKey**](OrganizationsApi.md#revokeapikey) | **DELETE** /orgs/apikeys/{keyId} | Revoke API key |
| [**touchAPIKey**](OrganizationsApi.md#touchapikey) | **PATCH** /orgs/apikeys/{keyId}/touch | Touch API key |



## activateAPIKey

> SuccessResponse activateAPIKey(keyId, activateAPIKeyRequest)

Activate or deactivate API key

Toggle an API key\&#39;s active status. The organization is derived from the API key context.

### Example

```ts
import {
  Configuration,
  OrganizationsApi,
} from '';
import type { ActivateAPIKeyOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new OrganizationsApi(config);

  const body = {
    // string
    keyId: 65ae1234567890abcdef1234,
    // ActivateAPIKeyRequest
    activateAPIKeyRequest: ...,
  } satisfies ActivateAPIKeyOperationRequest;

  try {
    const data = await api.activateAPIKey(body);
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
| **keyId** | `string` |  | [Defaults to `undefined`] |
| **activateAPIKeyRequest** | [ActivateAPIKeyRequest](ActivateAPIKeyRequest.md) |  | |

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
| **200** | API key status updated |  -  |
| **401** | Unauthorized |  -  |
| **404** | API key not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## generateAPIKey

> GeneratedAPIKeyResponse generateAPIKey(generateAPIKeyRequest)

Generate new API key

Create a new API key for the organization. The plain key is only returned once. The organization is derived from the API key context.

### Example

```ts
import {
  Configuration,
  OrganizationsApi,
} from '';
import type { GenerateAPIKeyOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new OrganizationsApi(config);

  const body = {
    // GenerateAPIKeyRequest
    generateAPIKeyRequest: ...,
  } satisfies GenerateAPIKeyOperationRequest;

  try {
    const data = await api.generateAPIKey(body);
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
| **generateAPIKeyRequest** | [GenerateAPIKeyRequest](GenerateAPIKeyRequest.md) |  | |

### Return type

[**GeneratedAPIKeyResponse**](GeneratedAPIKeyResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | API key generated |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getOrgUsers

> GetOrgUsers200Response getOrgUsers()

List organization users

Get users who are members of the authenticated user\&#39;s organization. The organization is derived from the API key context.

### Example

```ts
import {
  Configuration,
  OrganizationsApi,
} from '';
import type { GetOrgUsersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new OrganizationsApi(config);

  try {
    const data = await api.getOrgUsers();
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

[**GetOrgUsers200Response**](GetOrgUsers200Response.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Organization users |  -  |
| **401** | Unauthorized |  -  |
| **404** | Organization not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listAPIKeys

> Array&lt;APIKeyResponse&gt; listAPIKeys()

List API keys

Get all API keys for the authenticated user\&#39;s organization. The organization is derived from the API key context.

### Example

```ts
import {
  Configuration,
  OrganizationsApi,
} from '';
import type { ListAPIKeysRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new OrganizationsApi(config);

  try {
    const data = await api.listAPIKeys();
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

[**Array&lt;APIKeyResponse&gt;**](APIKeyResponse.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of API keys |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## revokeAPIKey

> SuccessResponse revokeAPIKey(keyId)

Revoke API key

Delete/revoke an API key. The organization is derived from the API key context.

### Example

```ts
import {
  Configuration,
  OrganizationsApi,
} from '';
import type { RevokeAPIKeyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new OrganizationsApi(config);

  const body = {
    // string
    keyId: 65ae1234567890abcdef1234,
  } satisfies RevokeAPIKeyRequest;

  try {
    const data = await api.revokeAPIKey(body);
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
| **keyId** | `string` |  | [Defaults to `undefined`] |

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
| **200** | API key revoked |  -  |
| **401** | Unauthorized |  -  |
| **404** | API key not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## touchAPIKey

> SuccessResponse touchAPIKey(keyId)

Touch API key

Update the API key last-used timestamp. The organization is derived from the API key context.

### Example

```ts
import {
  Configuration,
  OrganizationsApi,
} from '';
import type { TouchAPIKeyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new OrganizationsApi(config);

  const body = {
    // string
    keyId: 65ae1234567890abcdef1234,
  } satisfies TouchAPIKeyRequest;

  try {
    const data = await api.touchAPIKey(body);
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
| **keyId** | `string` |  | [Defaults to `undefined`] |

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
| **200** | API key touched |  -  |
| **401** | Unauthorized |  -  |
| **404** | API key not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

