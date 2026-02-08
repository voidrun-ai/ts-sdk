
# ApiResponseSandboxesList


## Properties

Name | Type
------------ | -------------
`status` | string
`message` | string
`data` | [Array&lt;Sandbox&gt;](Sandbox.md)
`meta` | [ApiResponseSandboxesListMeta](ApiResponseSandboxesListMeta.md)

## Example

```typescript
import type { ApiResponseSandboxesList } from ''

// TODO: Update the object below with actual values
const example = {
  "status": success,
  "message": Sandboxes fetched,
  "data": null,
  "meta": null,
} satisfies ApiResponseSandboxesList

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ApiResponseSandboxesList
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


