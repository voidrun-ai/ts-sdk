
# Image


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`tag` | string
`system` | boolean
`orgId` | string
`createdAt` | Date
`createdBy` | string

## Example

```typescript
import type { Image } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 65ae1234567890abcdef1234,
  "name": ubuntu-22.04,
  "tag": latest,
  "system": false,
  "orgId": 65ae1234567890abcdef1234,
  "createdAt": null,
  "createdBy": 65ae1234567890abcdef1234,
} satisfies Image

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Image
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


