
# Snapshot


## Properties

Name | Type
------------ | -------------
`id` | string
`createdAt` | Date
`fullPath` | string

## Example

```typescript
import type { Snapshot } from ''

// TODO: Update the object below with actual values
const example = {
  "id": snapshot-123,
  "createdAt": null,
  "fullPath": /var/lib/snapshots/snapshot-123.tar.gz,
} satisfies Snapshot

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Snapshot
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


