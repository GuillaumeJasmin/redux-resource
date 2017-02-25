import {
  updateResourceMeta, upsertResource, xhrStatuses
} from '../utils';

export function readOne(idAttr, state, action) {
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
    newMeta: {retrievingStatus: xhrStatuses.PENDING},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourceMeta,
  };
}

export function readOneFail(idAttr, state, action) {
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
    newMeta: {retrievingStatus: xhrStatuses.FAILED},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourceMeta,
  };
}

export function readOneSucceed(idAttribute, state, action) {
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
    newMeta: {retrievingStatus: xhrStatuses.SUCCEEDED},
    id: action[idAttribute],
    replace: false
  });

  const replace = typeof action.replace !== 'undefined' ? action.replace : true;
  const resources = upsertResource({
    resources: state.resources,
    resource: action.resource,
    id: action[idAttribute],
    idAttribute, replace
  });

  return {
    ...state,
    resourceMeta,
    resources
  };
}

export function readOneAbort(idAttr, state, action) {
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
    newMeta: {retrievingStatus: xhrStatuses.ABORTED},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourceMeta,
  };
}

export function readOneReset(idAttr, state, action) {
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
    newMeta: {retrievingStatus: xhrStatuses.NULL},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourceMeta,
  };
}
