
# ExecRequest


## Properties

Name | Type
------------ | -------------
`command` | string
`args` | Array&lt;string&gt;
`timeout` | number
`env` | { [key: string]: string; }
`cwd` | string
`background` | boolean

## Example

```typescript
import type { ExecRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "command": ls -la /root,
  "args": ["-la","/root"],
  "timeout": 30,
  "env": {"PATH":"/usr/bin:/bin"},
  "cwd": /root,
  "background": null,
} satisfies ExecRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


