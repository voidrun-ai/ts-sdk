
# GetCurrentUser200Response


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`email` | string
`imageUrl` | string
`createdAt` | Date
`orgs` | [Array&lt;GetCurrentUser200ResponseOrgsInner&gt;](GetCurrentUser200ResponseOrgsInner.md)

## Example

```typescript
import type { GetCurrentUser200Response } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 65ae1234567890abcdef1234,
  "name": Admin User,
  "email": admin@example.com,
  "imageUrl": https://example.com/avatar.png,
  "createdAt": null,
  "orgs": null,
} satisfies GetCurrentUser200Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetCurrentUser200Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


