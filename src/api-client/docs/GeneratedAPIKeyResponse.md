
# GeneratedAPIKeyResponse


## Properties

Name | Type
------------ | -------------
`plainKey` | string
`keyId` | string
`keyName` | string
`orgId` | string
`createdAt` | Date
`expiresIn` | string

## Example

```typescript
import type { GeneratedAPIKeyResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "plainKey": hf_1234567890abcdef,
  "keyId": 65ae1234567890abcdef1234,
  "keyName": CI/CD Key,
  "orgId": 65ae1234567890abcdef1234,
  "createdAt": null,
  "expiresIn": Key expires in 1 year,
} satisfies GeneratedAPIKeyResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GeneratedAPIKeyResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


