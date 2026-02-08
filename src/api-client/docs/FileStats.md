
# FileStats


## Properties

Name | Type
------------ | -------------
`name` | string
`path` | string
`size` | number
`mode` | string
`isDir` | boolean
`modTime` | Date
`uid` | number
`gid` | number

## Example

```typescript
import type { FileStats } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "path": null,
  "size": null,
  "mode": null,
  "isDir": null,
  "modTime": null,
  "uid": null,
  "gid": null,
} satisfies FileStats

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FileStats
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


