
# ApiResponseSandboxesListMeta


## Properties

Name | Type
------------ | -------------
`page` | number
`limit` | number
`total` | number
`totalPages` | number

## Example

```typescript
import type { ApiResponseSandboxesListMeta } from ''

// TODO: Update the object below with actual values
const example = {
  "page": 1,
  "limit": 3,
  "total": 25,
  "totalPages": 9,
} satisfies ApiResponseSandboxesListMeta

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ApiResponseSandboxesListMeta
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


