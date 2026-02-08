
# ExtractRequest


## Properties

Name | Type
------------ | -------------
`archive` | string
`dest` | string

## Example

```typescript
import type { ExtractRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "archive": /backup.tar.gz,
  "dest": /restore,
} satisfies ExtractRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExtractRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


