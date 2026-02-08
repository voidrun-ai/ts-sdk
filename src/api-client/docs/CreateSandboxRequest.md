
# CreateSandboxRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`templateId` | string
`cpu` | number
`mem` | number
`orgId` | string
`userId` | string
`sync` | boolean
`envVars` | { [key: string]: string; }

## Example

```typescript
import type { CreateSandboxRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": vm-01,
  "templateId": 65ae1234567890abcdef1234,
  "cpu": 2,
  "mem": 2048,
  "orgId": 65ae1234567890abcdef1234,
  "userId": 65ae1234567890abcdef1234,
  "sync": true,
  "envVars": {"DEBUG":"true","LOG_LEVEL":"info"},
} satisfies CreateSandboxRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateSandboxRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


