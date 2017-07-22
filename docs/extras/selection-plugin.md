# Selection Plugin

Use this plugin to maintain a list of "selected" resources within a slice.
This is useful for interfaces that let users select a subset of resources to
perform a bulk CRUD operation on.

For instance, consider your email. You may be able to select multiple emails,
and then mark them all as read. This plugin can help with a feature like this.

### Usage

First, you need to register this plugin for any slice that needs it. This plugin
adds an additional property to your slice, `selectedIds`, so it comes with
initial state that you should add to the slice, too.

```js
import { resourceReducer } from 'resourceful-redux';
import { selection } from 'resourceful-plugins';

const reducer = resourceReducer('books', {
  initialState: {
    ...selection.initialState
  },
  plugins: [selection]
});
```

Then, you can use the action creators that ships with the plugin to manage the
selected resources.

```js
import { selection } from 'resourceful-plugins';
import store from './store';

// Select resources with ID "24" and ID "100"
store.dispatch(selection.selectResources('books', [24, 100]));

// Deselect resources with ID "24" and ID "100"
store.dispatch(selection.deselectResources('books', [24, 100]));

// Clear all of the selected books
store.dispatch(selection.clearSelectedResources('books'));
```

To access the selected resources, you can use code that might look something
like the following:

```js
import store from './store';

const books = store.getState().books;
const selectedBooks = books.selectedIds.map(id => books.resources[id]);
```

### `selectResources(resourceName, resources)`

Selects `resources` for slice `resourceName`. Resources that are already
selected will be ignored.

#### Arguments

1. `resourceName` *(String)*: The name of the slice to select resources from.

2. `resources` *(Array)*: An array of resources, or resource IDs, to be
  selected.

#### Returns

(*`Object`*): A Redux action.

### `deselectResources(resourceName, resources)`

Deselects `resources` for slice `resourceName`. Resources that aren't selected
will be ignored.

#### Arguments

1. `resourceName` *(String)*: The name of the slice to deselect resources from.

2. `resources` *(Array)*: An array of resources, or resource IDs, to deselect.

#### Returns

(*`Object`*): A Redux action.

### `clearSelectedResources(resourceName)`

Deselects every resource for slice `resourceName`.

#### Arguments

1. `resourceName` *(String)*: The name of the slice to clear the selected
  resources from.

#### Returns

(*`Object`*): A Redux action.

### Tips

- When you delete resources, you will want to make sure that you manually
  deselect them.
