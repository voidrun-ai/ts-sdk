
# FileEvent


## Properties

Name | Type
------------ | -------------
`type` | string
`path` | string
`oldPath` | string
`size` | number
`timestamp` | Date

## Example

```typescript
import type { FileEvent } from ''

// TODO: Update the object below with actual values
const example = {
  "type": created,
  "path": /app/logs/app.log,
  "oldPath": /app/logs/app.log.old,
  "size": 1024,
  "timestamp": 2024-01-27T09:12:34Z,
} satisfies FileEvent

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FileEvent
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


