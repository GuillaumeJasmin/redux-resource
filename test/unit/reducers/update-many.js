import simpleResource, {requestStatuses} from '../../../src';

describe('reducers: updateMany', function() {
  it('should handle `UPDATE_MANY_HELLOS`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS',
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.PENDING
        },
        4: {
          updateStatus: requestStatuses.PENDING
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_HELLOS_FAIL`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS_FAIL',
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.FAILED
        },
        4: {
          updateStatus: requestStatuses.FAILED
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_HELLOS_RESET`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS_RESET',
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.NULL
        },
        4: {
          updateStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_HELLOS_SUCCEED`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS_SUCCEED',
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: true},
        {id: 4, hungry: false},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.SUCCEEDED
        },
        4: {
          updateStatus: requestStatuses.SUCCEEDED
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_HELLOS_SUCCEED`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS_SUCCEED',
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: true},
        {id: 4, hungry: false},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.SUCCEEDED
        },
        4: {
          updateStatus: requestStatuses.SUCCEEDED
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_HELLOS_SUCCEED` with a custom idAttribute', () => {
    const result = simpleResource('hello', {
      idAttribute: 'movieId',
      initialState: {
        resources: [
          {movieId: 1, hungry: null},
          {movieId: 3, hungry: null},
          {movieId: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS_SUCCEED',
      resources: [
        {
          movieId: 3,
          hungry: true
        },
        {
          movieId: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {movieId: 1, hungry: null},
        {movieId: 3, hungry: true},
        {movieId: 4, hungry: false},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.SUCCEEDED
        },
        4: {
          updateStatus: requestStatuses.SUCCEEDED
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_HELLOS_SUCCEED` with `replace: true`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS_SUCCEED',
      replace: true,
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 3, hungry: true},
        {id: 4, hungry: false},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.SUCCEEDED
        },
        4: {
          updateStatus: requestStatuses.SUCCEEDED
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });
});
