
# CompressRequest


## Properties

Name | Type
------------ | -------------
`path` | string
`format` | string

## Example

```typescript
import type { CompressRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "path": /dir/to/compress,
  "format": tar.gz,
} satisfies CompressRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CompressRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


