
# CreateImageRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`version` | string
`path` | string

## Example

```typescript
import type { CreateImageRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": custom-image,
  "version": 1.0,
  "path": /var/lib/images/custom.img,
} satisfies CreateImageRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateImageRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


