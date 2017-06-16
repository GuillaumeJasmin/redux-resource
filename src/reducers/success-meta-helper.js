import requestStatuses from '../utils/request-statuses';
import setResourceMeta from '../utils/set-resource-meta';

export default function({state, ids = [], setIds = true, crudAction, requestLabel}) {
  const meta = state.meta;
  const listMeta = state.listMeta;
  const labelStatus = state.labelStatus;
  let newMeta, newListMeta, newLabelStatus;
  const statusAttribute = `${crudAction}Status`;

  if (requestLabel) {
    newMeta = meta;
    newListMeta = listMeta;
    newLabelStatus = {
      ...labelStatus,
      [requestLabel]: requestStatuses.SUCCEEDED
    };
  }

  else if (!setIds || !ids.length) {
    newMeta = meta;
    newListMeta = {
      ...listMeta,
      [statusAttribute]: requestStatuses.SUCCEEDED
    };
    newLabelStatus = labelStatus;
  }

  else {
    if (crudAction === 'delete') {
      const nullMeta = ids.reduce((memo, id) => {
        memo[id] = null;
        return memo;
      }, {});

      newMeta = {
        ...meta,
        ...nullMeta
      };
    } else {
      newMeta = setResourceMeta({
        newMeta: {[statusAttribute]: requestStatuses.SUCCEEDED},
        mergeMeta: true,
        meta,
        ids
      });
    }

    newListMeta = listMeta;
    newLabelStatus = labelStatus;
  }

  return {
    meta: newMeta,
    listMeta: newListMeta,
    labelStatus: newLabelStatus
  };
}
