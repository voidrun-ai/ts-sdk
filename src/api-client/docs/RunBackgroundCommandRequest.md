
# RunBackgroundCommandRequest


## Properties

Name | Type
------------ | -------------
`command` | string
`env` | { [key: string]: string; }
`cwd` | string
`timeout` | number

## Example

```typescript
import type { RunBackgroundCommandRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "command": sleep 3600,
  "env": null,
  "cwd": /root,
  "timeout": 30,
} satisfies RunBackgroundCommandRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RunBackgroundCommandRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


