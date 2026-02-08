
# ExecResponseData


## Properties

Name | Type
------------ | -------------
`stdout` | string
`stderr` | string
`exitCode` | number

## Example

```typescript
import type { ExecResponseData } from ''

// TODO: Update the object below with actual values
const example = {
  "stdout": total 16
drwx------  2 root root 4096 Jan  1 12:00 .
drwxr-xr-x 18 root root 4096 Jan  1 12:00 ..
,
  "stderr": null,
  "exitCode": 0,
} satisfies ExecResponseData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecResponseData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


