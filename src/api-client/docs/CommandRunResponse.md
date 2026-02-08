
# CommandRunResponse


## Properties

Name | Type
------------ | -------------
`success` | boolean
`pid` | number
`command` | string

## Example

```typescript
import type { CommandRunResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "success": true,
  "pid": 1234,
  "command": sleep 3600,
} satisfies CommandRunResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CommandRunResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


