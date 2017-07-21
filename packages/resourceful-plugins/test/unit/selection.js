import {actionTypes, selection} from '../../src/selection';

describe('selection', function() {
  beforeEach(() => {
    stub(console, 'error');
  });

  it('should not change the state when the resource name does not match', () => {
    const reducer = selection('books');

    const state = {
      selectedIds: [24]
    };

    const action = {
      type: actionTypes.SELECT_RESOURCES,
      resourceName: 'sandwiches',
      resources: [24]
    };

    const result = reducer(state, action);
    expect(result).to.equal(state);
  });

  it('should not change the state when the action type does not match', () => {
    const reducer = selection('books');

    const state = {
      selectedIds: [24]
    };

    const action = {
      type: 'PLS_AND_TY',
      resourceName: 'books',
      resources: [24]
    };

    const result = reducer(state, action);
    expect(result).to.equal(state);
  });

  it('should update the state without dupes for SELECT_RESOURCES', () => {
    const reducer = selection('books');

    const state = {
      pasta: true,
      selectedIds: [24]
    };

    const action = {
      type: actionTypes.SELECT_RESOURCES,
      resourceName: 'books',
      resources: [1, 24, 100, 210]
    };

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      pasta: true,
      selectedIds: [24, 1, 100, 210]
    });
  });

  it('should update the state for DESELECT_RESOURCES', () => {
    const reducer = selection('books');

    const state = {
      pasta: true,
      selectedIds: [24, 100, 1000]
    };

    const action = {
      type: actionTypes.DESELECT_RESOURCES,
      resourceName: 'books',
      resources: [100]
    };

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      pasta: true,
      selectedIds: [24, 1000]
    });
  });

  it('should update the state for CLEAR_SELECTED_RESOURCES', () => {
    const reducer = selection('books');

    const state = {
      pasta: true,
      selectedIds: [24, 100, 1000]
    };

    const action = {
      type: actionTypes.CLEAR_SELECTED_RESOURCES,
      resourceName: 'books'
    };

    const result = reducer(state, action);
    expect(result).to.deep.equal({
      pasta: true,
      selectedIds: []
    });
  });
});
