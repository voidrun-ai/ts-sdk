
# ProcessInfo


## Properties

Name | Type
------------ | -------------
`pid` | number
`command` | string
`startTime` | Date
`running` | boolean
`exitCode` | number

## Example

```typescript
import type { ProcessInfo } from ''

// TODO: Update the object below with actual values
const example = {
  "pid": 1234,
  "command": sleep 3600,
  "startTime": null,
  "running": true,
  "exitCode": 0,
} satisfies ProcessInfo

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProcessInfo
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


