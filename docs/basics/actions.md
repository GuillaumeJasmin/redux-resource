# Actions

resourceful-redux exports Action Types to help you create, read, update,
and delete resources. Although these action types represent four different
operations, there are many similarities between them.

All actions have a single required value, `resourceName`, which is the name
of the resource that is being affected. The simplest action, then, looks
something like this:

```js
import { actionTypes } from 'resourceful-redux';

{
  type: actionTypes.READ_RESOURCES,
  resourceName: 'books'
}
```

This action type isn't very useful, however. Without more information about this
request, resourceful-redux doesn't know how to change your state. Consequently,
this action is a no-op.

To observe changes in the state, you need to supply one of two additional
options: a `resources` array, and/or a `label`.

We'll first look at `resources`, then `labels`.

### `resources`

A `resources` array represents the resources being affected by the action.
It can be an array if IDs, such as `[1, 2, 3]`, or an array of resource objects,
such as

```js
[
  {
    id: 1,
    name: 'Brian',
    phone: '444.444.4444'
  },
  {
    id: 2,
    name: 'Sarah',
    phone: '222.222.2222'
  }
]
```

You can even mix the two. When it comes to a `resources` array, the important
part is that the objects have some `id`. This associates the action with some
resources.

You may be wondering when you might use the object form versus the shorthand
form. Well, if you're reading a single book, for instance, you may initiate the
request with just an ID, since that is all of the information that you have at
that time. That action may look like the following:

```js
import { actionTypes } from 'resourceful-redux';

{
  type: actionTypes.READ_RESOURCES,
  resourceName: 'books',
  resources: [23]
}
```

When the request succeeds, you might now have additional information about this
book to add to your store. So you would include the full definition in the
action representing success:

```js
import { actionTypes } from 'resourceful-redux';

{
  type: actionTypes.READ_RESOURCES_SUCCESS,
  resourceName: 'books',
  resources: [{
    id: 23,
    releaseYear: 2015,
    author: 'Jane M. Goodfellow',
    title: 'A History of Canada'
  }]
}
```

Whenever a `resources` array is supplied, resourceful-redux will update the
`meta` for each resource in that array.

The "success" action types also have special behavior with the `resources`
array. For creates, reads, and updates, your state's resources array will be
updated to reflect any new data. And for successful deletes, any resources
passed in will be _removed_ from the state's resources array, as well as from
the `ids` array of all labels.

### `label`

Supplying a `label` will track the status of this request under the `labels`
property of your store. Also, if you pass `resources`, then the IDs of those
resources will be associated with the label, too.

For instance, if you let users search for a books resource in a modal, you might
use the following action:

```js
import { actionTypes } from 'resourceful-redux';

{
  type: actionTypes.READ_RESOURCES,
  resourceName: 'books',
  label: 'modalSearch',
  query: 'Lord of the Flies'
}
```

This will allow you to keep track of which books are associated with this
specific search. Labels are a powerful feature, and are covered more thoroughly
in the next guide.

### Other action properties

The following action attributes are all optional.

- `mergeResources` *(Boolean)*: When an action results in resources being
  updated in the store, this determines if the new data is merged with the old,
  or if it replaces the old data. Defaults to `true`.
- `mergeMeta` *(Boolean)*: This is like `mergeResources`, but for metadata.
  Defaults to `true`.
- `mergeLabelIds` *(Boolean)*: When a label is supplied, this lets you control
  whether or not the new list of IDs replaces or gets merged into the existing
  list of IDs for that label. When `true`, it will protect against duplicate
  IDs being added. Defaults to `true`.
