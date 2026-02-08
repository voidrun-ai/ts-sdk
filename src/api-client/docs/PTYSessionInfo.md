
# PTYSessionInfo


## Properties

Name | Type
------------ | -------------
`id` | string
`createdAt` | Date
`clients` | number
`alive` | boolean

## Example

```typescript
import type { PTYSessionInfo } from ''

// TODO: Update the object below with actual values
const example = {
  "id": session-123456,
  "createdAt": null,
  "clients": 1,
  "alive": true,
} satisfies PTYSessionInfo

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PTYSessionInfo
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


