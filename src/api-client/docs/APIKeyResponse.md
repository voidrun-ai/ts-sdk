
# APIKeyResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`orgId` | string
`name` | string
`createdBy` | string
`createdAt` | Date
`lastUsedAt` | Date
`isActive` | boolean
`updatedAt` | Date

## Example

```typescript
import type { APIKeyResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 65ae1234567890abcdef1234,
  "orgId": 65ae1234567890abcdef1234,
  "name": CI/CD Key,
  "createdBy": 65ae1234567890abcdef1234,
  "createdAt": null,
  "lastUsedAt": null,
  "isActive": true,
  "updatedAt": null,
} satisfies APIKeyResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as APIKeyResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


