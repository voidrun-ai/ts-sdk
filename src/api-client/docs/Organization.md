
# Organization


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`ownerId` | string
`members` | Array&lt;string&gt;
`plan` | string
`usage` | number
`createdAt` | Date
`createdBy` | string
`updatedAt` | Date

## Example

```typescript
import type { Organization } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 65ae1234567890abcdef1234,
  "name": My Organization,
  "ownerId": 65ae1234567890abcdef1234,
  "members": null,
  "plan": free,
  "usage": 5,
  "createdAt": null,
  "createdBy": null,
  "updatedAt": null,
} satisfies Organization

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Organization
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


