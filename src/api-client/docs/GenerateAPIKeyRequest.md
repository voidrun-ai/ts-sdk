
# GenerateAPIKeyRequest


## Properties

Name | Type
------------ | -------------
`orgId` | string
`keyName` | string

## Example

```typescript
import type { GenerateAPIKeyRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "orgId": 65ae1234567890abcdef1234,
  "keyName": CI/CD Key,
} satisfies GenerateAPIKeyRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GenerateAPIKeyRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


