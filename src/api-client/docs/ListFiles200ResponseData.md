
# ListFiles200ResponseData


## Properties

Name | Type
------------ | -------------
`success` | boolean
`files` | [Array&lt;FileInfo&gt;](FileInfo.md)

## Example

```typescript
import type { ListFiles200ResponseData } from ''

// TODO: Update the object below with actual values
const example = {
  "success": true,
  "files": null,
} satisfies ListFiles200ResponseData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ListFiles200ResponseData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


