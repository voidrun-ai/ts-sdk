
# Sandbox


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`imageId` | string
`ip` | string
`cpu` | number
`mem` | number
`status` | string
`createdAt` | Date
`createdBy` | string
`orgId` | string
`envVars` | { [key: string]: string; }

## Example

```typescript
import type { Sandbox } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 65ae1234567890abcdef1234,
  "name": vm-01,
  "imageId": 65ae1234567890abcdef1234,
  "ip": 192.168.1.100,
  "cpu": 2,
  "mem": 2048,
  "status": running,
  "createdAt": null,
  "createdBy": 65ae1234567890abcdef1234,
  "orgId": 65ae1234567890abcdef1234,
  "envVars": {"DEBUG":"true","LOG_LEVEL":"info"},
} satisfies Sandbox

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Sandbox
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


