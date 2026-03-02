
# SessionExecResponse


## Properties

Name | Type
------------ | -------------
`success` | boolean
`sessionId` | string
`output` | string
`error` | string
`exitCode` | number

## Example

```typescript
import type { SessionExecResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "success": true,
  "sessionId": sess-1a2b3c4d5e6f7788,
  "output": command output,
  "error": ,
  "exitCode": 0,
} satisfies SessionExecResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SessionExecResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


