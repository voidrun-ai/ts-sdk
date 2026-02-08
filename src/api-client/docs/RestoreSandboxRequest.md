
# RestoreSandboxRequest


## Properties

Name | Type
------------ | -------------
`newId` | string
`snapshotPath` | string
`newIp` | string
`cold` | boolean
`cpu` | number
`mem` | number
`orgId` | string
`userId` | string

## Example

```typescript
import type { RestoreSandboxRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "newId": vm-restored,
  "snapshotPath": /var/lib/snapshots/snapshot-123.tar.gz,
  "newIp": 192.168.1.100,
  "cold": null,
  "cpu": 2,
  "mem": 2048,
  "orgId": 65ae1234567890abcdef1234,
  "userId": 65ae1234567890abcdef1234,
} satisfies RestoreSandboxRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RestoreSandboxRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


