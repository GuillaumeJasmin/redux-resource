## [0.0.6](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.6) (6/22/17)

**New Features**

- Adds `getResources` method

## [0.0.5](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.5) (6/20/17)

**Bug Fixes**

- Fixed a bug where `pending` was set to `true` anytime `treatNullAsPending`
  was `true` when calling `getStatus`.

## [0.0.4](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.4) (6/19/17)

**New Features**

- A "null" property is now included in the object returned from `getStatus`,
  which can be used to check if the request status is `"NULL"`.

## [0.0.3](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.3) (6/19/17)

- Passing an empty resources array in an action creator with `mergeLabelIds: false`
  will now clear the label's IDs array.

## [0.0.2](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.2) (6/18/17)

- First release

## Earlier development

This library began as a fork of
[redux-simple-resource v1.0.0](https://github.com/jmeas/redux-simple-resource/blob/master/CHANGELOG.md).
