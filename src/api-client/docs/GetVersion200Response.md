
# GetVersion200Response


## Properties

Name | Type
------------ | -------------
`version` | string
`commit` | string
`buildTime` | string

## Example

```typescript
import type { GetVersion200Response } from ''

// TODO: Update the object below with actual values
const example = {
  "version": 0.1.0,
  "commit": a1b2c3d,
  "buildTime": 2026-02-28T12:00:00Z,
} satisfies GetVersion200Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetVersion200Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


