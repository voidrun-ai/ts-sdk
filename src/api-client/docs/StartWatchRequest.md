
# StartWatchRequest


## Properties

Name | Type
------------ | -------------
`path` | string
`recursive` | boolean
`ignoreHidden` | boolean

## Example

```typescript
import type { StartWatchRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "path": /app/logs,
  "recursive": null,
  "ignoreHidden": null,
} satisfies StartWatchRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StartWatchRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


