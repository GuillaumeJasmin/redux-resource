# API Reference

### Top-Level Exports

* [resourceReducer](/docs/api-reference/resource-reducer.md)
* [getStatus](/docs/api-reference/get-status.md)
* [getResources](/docs/api-reference/get-resources.md)
* [upsertResources](/docs/api-reference/upsert-resources.md)
* [setResourceMeta](/docs/api-reference/set-resource-meta.md)
* [actionTypes](/docs/api-reference/action-types.md)
* [requestStatuses](/docs/api-reference/request-statuses.md)

### Importing

Every function or object described above is a top-level export. You can import
any of them like this:

#### ES6

```js
import { resourceReducer } from 'resourceful-redux';
```

#### ES5 (CommonJS)

```js
var resourceReducer = require('resourceful-redux').resourceReducer;
```
