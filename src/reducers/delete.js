import {updateResourceMeta, requestStatuses} from '../utils';

export function del(idAttr, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {deleteStatus: requestStatuses.PENDING},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    meta,
  };
}

export function delFail(idAttr, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {deleteStatus: requestStatuses.FAILED},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    meta,
  };
}

export function delSucceed(idAttr, state, action) {
  const id = action[idAttr];

  // Remove this resource from the resources meta.
  const meta = {
    // Shallow clone the meta
    ...state.meta,
    [id]: null
  };

  // Shallow clone the existing resource array, removing the deleted resource
  const resources = state.resources.filter(r => r[idAttr] !== id);

  return {
    ...state,
    meta,
    resources
  };
}

export function delReset(idAttr, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {deleteStatus: requestStatuses.NULL},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    meta,
  };
}
