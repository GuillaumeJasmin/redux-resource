# Resourceful Redux

[![Gitter](https://badges.gitter.im/jmeas/resourceful-redux.svg)](https://gitter.im/jmeas/resourceful-redux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Travis build status](http://img.shields.io/travis/jmeas/resourceful-redux.svg?style=flat)](https://travis-ci.org/jmeas/resourceful-redux)
[![npm version](https://img.shields.io/npm/v/resourceful-redux.svg)](https://www.npmjs.com/package/resourceful-redux)
[![Test Coverage](https://codeclimate.com/github/jmeas/resourceful-redux/badges/coverage.svg)](https://codeclimate.com/github/jmeas/resourceful-redux)
[![Code Climate GPA](https://codeclimate.com/github/jmeas/resourceful-redux/badges/gpa.svg)](https://codeclimate.com/github/jmeas/resourceful-redux)
[![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-redux/dist/resourceful-redux.min.js?compression=gzip)](https://unpkg.com/resourceful-redux/dist/resourceful-redux.min.js)

A tiny but powerful system for managing 'resources': data that is persisted to
remote servers.

✓ Removes nearly all "boilerplate" code for remotely-stored data  
✓ Tracks the status (pending, failed, success, etc.) of _every_ request  
✓ Encourages [normalized state](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html)  
✓ Works well with APIs that adhere to standardized formats, such as JSON API  
✓ Works well with APIs that don't adhere to standardized formats, too  
✓ Integrates well with lots of technologies: HTTP, GRPC, streams, redux-observable, redux-saga, and more    
✓ Microscopic file size (2kb gzipped!)

### Installation

To install the latest stable version:

```
npm install --save resourceful-redux
```

### Documentation

View the documentation at
**[resourceful-redux.js.org ⇗](https://resourceful-redux.js.org/)**.

### Quick Start

Follow this guide to get a taste of what it's like to work with Resourceful
Redux.

First, we set up our store with a "resource reducer," which is a reducer that
manages the state for one type of resource. In this guide, our reducer will
handle the data for our "books" resource.

```js
import { store, combineReducers } from 'redux';
import { resourceReducer } from 'resourceful-redux';

const reducer = combineReducers({
  books: resourceReducer('books')
});

const store = createStore(reducer);
```

Once we have a store, we can start dispatching actions to it. In this example,
we initiate a request to read a book with an ID of 24, then follow it up with an
action representing success. There are two actions, because requests usually
occur over a network, and therefore take time to complete.

```js
import { actionTypes } from 'resourceful-redux';
import store from './store';

// This action represents beginning the request to read a book with ID of 24. This
// may could represent the start of an HTTP request, for instance.
store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceName: 'books',
  resources: [24]
});

// Later, when the request succeeds, we dispatch the success action.
store.dispatch({
  type: actionTypes.READ_RESOURCES_SUCCEEDED,
  resourceName: 'books',
  // The `resources` list here is usually the response from an API call
  resources: [{
    id: 24,
    title: 'My Name is Red',
    releaseYear: 1998,
    author: 'Orhan Pamuk'
  }]
});
```

Later, in your view layer, you can access information about the status of
this request. When it succeeds, accessing the returned book is straightforward.

```js
import { getStatus } from 'resourceful-redux';
import store from './my-store';

const state = store.getState();
// The second argument to this method is a path into the state. This method
// protects you from needing to check for undefined values.
const readStatus = getStatus(store, 'books.meta.24.readStatus');

if (readStatus.pending) {
  console.log('The request is in flight.');
}

else if (readStatus.failed) {
  console.log('The request failed.');
}

else if (readStatus.succeeded) {
  const book = state.books.resources[24];

  console.log('The book was retrieved successfully, and here is the data:', book);
}
```

This is just a small sample of what it's like working with Resourceful Redux.

For a real-life webapp example that uses many more CRUD operations, check out
the **[zero-boilerplate-redux webapp ⇗](https://github.com/jmeas/zero-boilerplate-redux)**.
This example project uses [React](https://facebook.github.io/react/), although
Resourceful Redux works well with any view layer.

### Repository Structure

This repository is a [Lerna](https://github.com/lerna/lerna) project. That means
it's a single repository that allows us to control the publishing of a number
of packages:

| Package | Version | Size | Description |
| ---- | ---- | ---- | ---- |
| `resourceful-redux` | [![npm version](https://img.shields.io/npm/v/resourceful-redux.svg)](https://www.npmjs.com/package/resourceful-redux) | [![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-redux/dist/resourceful-redux.min.js?compression=gzip)](https://unpkg.com/resourceful-redux/dist/resourceful-redux.min.js) | The main library |
| `resourceful-xhr` | [![npm version](https://img.shields.io/npm/v/resourceful-xhr.svg)](https://www.npmjs.com/package/resourceful-xhr) | [![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-xhr/dist/resourceful-xhr.min.js?compression=gzip)](https://unpkg.com/resourceful-xhr/dist/resourceful-xhr.min.js) | A library that includes basic CRUD action creators |
| `resourceful-plugins` | [![npm version](https://img.shields.io/npm/v/resourceful-plugins.svg)](https://www.npmjs.com/package/resourceful-plugins) | [![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-plugins/dist/resourceful-plugins.min.js?compression=gzip)](https://unpkg.com/resourceful-plugins/dist/resourceful-plugins.min.js) | A collection of common plugins |
| `resourceful-prop-types` | [![npm version](https://img.shields.io/npm/v/resourceful-prop-types.svg)](https://www.npmjs.com/package/resourceful-prop-types) | [![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-prop-types/dist/resourceful-prop-types.min.js?compression=gzip)](https://unpkg.com/resourceful-prop-types/dist/resourceful-prop-types.min.js) | Handy Prop Types to use with Resourceful Redux |

### Contributing

Thanks for your interest in helping out! Check out the
[Contributing Guide](./CONTRIBUTING.md), which covers everything you'll need to
 get up and running.

### Contributors

([Emoji key](https://github.com/kentcdodds/all-contributors#emoji-key))

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/2322305?v=4" width="100px;"/><br /><sub>James, please</sub>](http://www.jmeas.com)<br />[💻](https://github.com/jmeas/resourceful-redux/commits?author=jmeas "Code") [🔌](#plugin-jmeas "Plugin/utility libraries") [📖](https://github.com/jmeas/resourceful-redux/commits?author=jmeas "Documentation") [🤔](#ideas-jmeas "Ideas & Planning") | [<img src="https://avatars3.githubusercontent.com/u/682566?v=4" width="100px;"/><br /><sub>Stephen Rivas JR</sub>](http://www.stephenrivasjr.com)<br />[💻](https://github.com/jmeas/resourceful-redux/commits?author=sprjr "Code") [📖](https://github.com/jmeas/resourceful-redux/commits?author=sprjr "Documentation") [🤔](#ideas-sprjr "Ideas & Planning") | [<img src="https://avatars0.githubusercontent.com/u/4119765?v=4" width="100px;"/><br /><sub>Ian Stewart</sub>](https://github.com/ianmstew)<br />[🤔](#ideas-ianmstew "Ideas & Planning") | [<img src="https://avatars3.githubusercontent.com/u/181635?v=4" width="100px;"/><br /><sub>Tim Branyen</sub>](http://tbranyen.com/)<br />[🤔](#ideas-tbranyen "Ideas & Planning") | [<img src="https://avatars1.githubusercontent.com/u/254562?v=4" width="100px;"/><br /><sub>Jason Laster</sub>](https://github.com/jasonLaster)<br />[🤔](#ideas-jasonLaster "Ideas & Planning") | [<img src="https://avatars2.githubusercontent.com/u/1104846?v=4" width="100px;"/><br /><sub>marlonpp</sub>](https://github.com/marlonpp)<br />[🤔](#ideas-marlonpp "Ideas & Planning") | [<img src="https://avatars1.githubusercontent.com/u/4296756?v=4" width="100px;"/><br /><sub>Javier Porrero</sub>](https://github.com/JPorry)<br />[🤔](#ideas-JPorry "Ideas & Planning") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars2.githubusercontent.com/u/25591356?v=4" width="100px;"/><br /><sub>Smai Fullerton</sub>](https://github.com/smaifullerton-wk)<br />[📖](https://github.com/jmeas/resourceful-redux/commits?author=smaifullerton-wk "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/276971?v=4" width="100px;"/><br /><sub>vinodkl</sub>](https://github.com/vinodkl)<br />[🤔](#ideas-vinodkl "Ideas & Planning") | [<img src="https://avatars3.githubusercontent.com/u/828125?v=4" width="100px;"/><br /><sub>Eric Valadas</sub>](https://github.com/ericvaladas)<br />[📖](https://github.com/jmeas/resourceful-redux/commits?author=ericvaladas "Documentation") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind are welcome!
