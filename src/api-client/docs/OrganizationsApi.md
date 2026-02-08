# OrganizationsApi

All URIs are relative to *http://localhost:33944/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**generateAPIKey**](OrganizationsApi.md#generateapikeyoperation) | **POST** /orgs/{orgId}/apikeys | Generate new API key |
| [**getCurrentOrg**](OrganizationsApi.md#getcurrentorg) | **GET** /orgs/me | Get current organization |
| [**listAPIKeys**](OrganizationsApi.md#listapikeys) | **GET** /orgs/{orgId}/apikeys | List API keys |
| [**revokeAPIKey**](OrganizationsApi.md#revokeapikey) | **DELETE** /orgs/{orgId}/apikeys/{keyId} | Revoke API key |



## generateAPIKey

> GeneratedAPIKeyResponse generateAPIKey(orgId, generateAPIKeyRequest)

Generate new API key

Create a new API key for the organization. The plain key is only returned once.

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
    // string
    orgId: 65ae1234567890abcdef1234,
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
| **orgId** | `string` |  | [Defaults to `undefined`] |
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


## getCurrentOrg

> Organization getCurrentOrg()

Get current organization

Get the organization associated with the API key

### Example

```ts
import {
  Configuration,
  OrganizationsApi,
} from '';
import type { GetCurrentOrgRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: ApiKeyAuth
    apiKey: "YOUR API KEY",
  });
  const api = new OrganizationsApi(config);

  try {
    const data = await api.getCurrentOrg();
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

[**Organization**](Organization.md)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Organization details |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listAPIKeys

> Array&lt;APIKeyResponse&gt; listAPIKeys(orgId)

List API keys

Get all API keys for an organization

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

  const body = {
    // string
    orgId: 65ae1234567890abcdef1234,
  } satisfies ListAPIKeysRequest;

  try {
    const data = await api.listAPIKeys(body);
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
| **orgId** | `string` |  | [Defaults to `undefined`] |

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

> SuccessResponse revokeAPIKey(orgId, keyId)

Revoke API key

Delete/revoke an API key

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
    orgId: 65ae1234567890abcdef1234,
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
| **orgId** | `string` |  | [Defaults to `undefined`] |
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

