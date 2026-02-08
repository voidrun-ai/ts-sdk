
# ListPTYSessions200Response


## Properties

Name | Type
------------ | -------------
`status` | string
`message` | string
`data` | [ListPTYSessions200ResponseAllOfData](ListPTYSessions200ResponseAllOfData.md)

## Example

```typescript
import type { ListPTYSessions200Response } from ''

// TODO: Update the object below with actual values
const example = {
  "status": success,
  "message": Operation completed successfully,
  "data": null,
} satisfies ListPTYSessions200Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ListPTYSessions200Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


