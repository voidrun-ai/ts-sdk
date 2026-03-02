
# SessionExecStreamRequest


## Properties

Name | Type
------------ | -------------
`sessionId` | string
`command` | string

## Example

```typescript
import type { SessionExecStreamRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "sessionId": sess-1a2b3c4d5e6f7788,
  "command": tail -f /var/log/syslog,
} satisfies SessionExecStreamRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SessionExecStreamRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


