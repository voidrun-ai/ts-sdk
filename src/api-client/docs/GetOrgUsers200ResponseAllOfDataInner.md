
# GetOrgUsers200ResponseAllOfDataInner


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`email` | string
`imageUrl` | string
`createdAt` | Date

## Example

```typescript
import type { GetOrgUsers200ResponseAllOfDataInner } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 65ae1234567890abcdef1234,
  "name": Admin User,
  "email": admin@example.com,
  "imageUrl": https://example.com/avatar.png,
  "createdAt": null,
} satisfies GetOrgUsers200ResponseAllOfDataInner

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetOrgUsers200ResponseAllOfDataInner
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


