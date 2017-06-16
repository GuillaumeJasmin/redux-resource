import updateMetaHelper from './update-meta-helper';
import requestStatuses from '../utils/request-statuses';
import upsertResources from '../utils/upsert-resources';

export function create(state, action) {
  return updateMetaHelper({
    ids: action.ids,
    requestLabel: action.requestLabel,
    requestStatus: requestStatuses.PENDING,
    crudAction: 'create',
    setIds: false,
    state
  });
}

export function createFail(state, action) {
  return updateMetaHelper({
    ids: action.ids,
    requestLabel: action.requestLabel,
    requestStatus: requestStatuses.FAILED,
    crudAction: 'create',
    setIds: false,
    state
  });
}

export function createNull(state, action) {
  return updateMetaHelper({
    ids: action.ids,
    requestLabel: action.requestLabel,
    requestStatus: requestStatuses.NULL,
    crudAction: 'create',
    setIds: false,
    state
  });
}

export function createSucceed(state, action) {
  const resources = action.resources;
  const mergeResources = action.mergeResources;

  const newResources = upsertResources(state.resources, resources, mergeResources);

  return {
    ...state,
    resources: newResources
  };
}
