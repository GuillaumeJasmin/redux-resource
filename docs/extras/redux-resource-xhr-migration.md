# Migrating to v3

Follow the steps below in order to migrate each of your action creators to the
`redux-resource-xhr@3.0.0` API.

### Migrate gradually

`redux-resource-xhr@2.2.0` supports both the v2 and v3 API. We recommend installing
that version and performing this migration gradually, rather than all at once.

### Use the new `crudRequest` export

There used to be five action creators; now there is just one.

```diff
- import {
-   crudAction,
-   createResources,
-   readResources,
-   updateResources,
-   deleteResources
- } from 'redux-resource-xhr';

+ import { crudRequest } from 'redux-resource-xhr';
```

### Specifying the CRUD operation

Instead of using a different action creator for each CRUD operations, you now pass a string as
the first argument to `crudRequest` to specify the CRUD operation. This string must be one of "create,"
"read," "update," or "delete."

For instance, for create requests:

```diff
- createResources(options);

+ crudRequest('create', options);
```

### Using `actionDefaults`

In `@2.x`, all of the `options` were included in the dispatched actions. In `@3.x`, only the
values included in `actionDefaults` are included in the dispatched actions.

```diff
- createResources({
-   resourceName: 'books',
-   resources: [1, 24],
-   xhrOptions,
-   dispatch
- });

+ crudRequest('create', {
+   actionDefaults: {
+     resourceName: 'books',
+     resources: [1, 24],
+   },
+   xhrOptions,
+   dispatch
+ });
```

### Replacing the callback

There is no longer a callback for when the request has concluded. Instead,
there are individual callbacks for when the request succeeds, fails, or
is aborted.

With these new callbacks, you are passed the action, and **you must dispatch
the action yourself**. Previously, `redux-resource-xhr` always dispatched the action for you.

```diff
- createResources(options, (err, res, body) => {
-   console.log('The request is complete');
- });

+ crudRequest('create', {
+   ...options,
+   onSucceeded(action, res, body) {
+     dispatch(action);
+
+     console.log('The request is complete');
+   }
+ });
```

This allows you to have greater control over the "end" actions. If your backend
returns requests with related resources included, then you can use `onSucceeded`
to modify the action that is dispatched to add the related resources to your slice.

Or, you can chain multiple requests together to gather data from several endpoints,
and then dispatch a single action.

With the `@2.x` API, it was difficult or impossible to do either of those things.

### That's all

Everything else is unchanged, such as `transformData`.

If you have problems performing this migration, or if you have ideas on how this guide
could be better, please
[open an issue](https://github.com/jmeas/redux-resource/issues/new?title=Problem%20migrating%20redux-resource-xhr)
and we will do our best to assist you. Thank you!
