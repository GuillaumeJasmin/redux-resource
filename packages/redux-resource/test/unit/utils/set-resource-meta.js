import {setResourceMeta} from '../../../src';

describe('setResourceMeta', function() {
  beforeEach(() => {
    this.meta = {
      1: {
        isSelected: false,
        otherData: {
          hungry: true,
          food: 'pizza'
        }
      },
      2: {thirsty: true},
      3: {what: false}
    };
  });

  describe('mergeMeta: false', () => {
    it('should only keep metadata that is passed in', () => {
      const result = setResourceMeta({
        meta: this.meta,
        newMeta: {isSelected: true},
        resources: [1, 2, 5],
        mergeMeta: false
      });

      expect(result).to.deep.equal({
        1: {isSelected: true},
        2: {isSelected: true},
        3: {what: false},
        5: {isSelected: true}
      });

      // The original `meta` is shallow cloned
      expect(result).to.not.equal(this.meta);
      // The existing item is not modified
      expect(result[1]).to.not.equal(this.meta[1]);
      expect(result[2]).to.not.equal(this.meta[2]);
    });

    it('should only keep metadata that is passed in when `resources` is an object', () => {
      const result = setResourceMeta({
        meta: this.meta,
        newMeta: {isSelected: true},
        resources: {
          1: {id: 1},
          2: {id: 2},
          5: {id: 5}
        },
        mergeMeta: false
      });

      expect(result).to.deep.equal({
        1: {isSelected: true},
        2: {isSelected: true},
        3: {what: false},
        5: {isSelected: true}
      });

      // The original `meta` is shallow cloned
      expect(result).to.not.equal(this.meta);
      // The existing item is not modified
      expect(result[1]).to.not.equal(this.meta[1]);
      expect(result[2]).to.not.equal(this.meta[2]);
    });

    it('should ignore badly formed resources, object form (gh-118)', () => {
      const result = setResourceMeta({
        meta: this.meta,
        newMeta: {isSelected: true},
        resources: [1, {name: 'pasta'}],
        mergeMeta: false
      });

      expect(result).to.deep.equal({
        1: {isSelected: true},
        2: {thirsty: true},
        3: {what: false}
      });

      // The original `meta` is shallow cloned
      expect(result).to.not.equal(this.meta);
      // The existing item is not modified
      expect(result[1]).to.not.equal(this.meta[1]);
    });

    it('should ignore badly formed resources, non-object form (gh-118)', () => {
      const result = setResourceMeta({
        meta: this.meta,
        newMeta: {isSelected: true},
        resources: [1, {id: {}}],
        mergeMeta: false
      });

      expect(result).to.deep.equal({
        1: {isSelected: true},
        2: {thirsty: true},
        3: {what: false}
      });

      // The original `meta` is shallow cloned
      expect(result).to.not.equal(this.meta);
      // The existing item is not modified
      expect(result[1]).to.not.equal(this.meta[1]);
    });
  });

  describe('mergeMeta: true', () => {
    it('should keep other list items and merge in the new results', () => {
      const result = setResourceMeta({
        meta: this.meta,
        newMeta: {isSelected: true},
        resources: [1, 2, 5],
        mergeMeta: true
      });

      expect(result).to.deep.equal({
        1: {
          isSelected: true,
          otherData: {
            hungry: true,
            food: 'pizza'
          }
        },
        2: {thirsty: true, isSelected: true},
        3: {what: false},
        5: {isSelected: true}
      });

      // The original `meta` is shallow cloned
      expect(result).to.not.equal(this.meta);
      // The existing item is not modified
      expect(result[1]).to.not.equal(this.meta[1]);
      expect(result[2]).to.not.equal(this.meta[2]);
      // Unrelated items pass through unchanged
      expect(result[3]).to.equal(this.meta[3]);
    });

    it('should keep other list items and merge in the new results when `resources` is an object', () => {
      const result = setResourceMeta({
        meta: this.meta,
        newMeta: {isSelected: true},
        resources: {
          1: {id: 1},
          2: {id: 2},
          5: {id: 5}
        },
        mergeMeta: true
      });

      expect(result).to.deep.equal({
        1: {
          isSelected: true,
          otherData: {
            hungry: true,
            food: 'pizza'
          }
        },
        2: {thirsty: true, isSelected: true},
        3: {what: false},
        5: {isSelected: true}
      });

      // The original `meta` is shallow cloned
      expect(result).to.not.equal(this.meta);
      // The existing item is not modified
      expect(result[1]).to.not.equal(this.meta[1]);
      expect(result[2]).to.not.equal(this.meta[2]);
      // Unrelated items pass through unchanged
      expect(result[3]).to.equal(this.meta[3]);
    });
  });

  describe('update resource meta', () => {
    it('should perform updates for IDs that are the number 0 (gh-298)', () => {
      const result = setResourceMeta({
        meta: {},
        newMeta: {updated: true},
        resources: [0, '', {id: false}, 1, 2, 3, '1234'],
      });

      expect(result).to.deep.equal({
        0: {
          updated: true
        },
        1: {
          updated: true,
        },
        2: {
          updated: true,
        },
        3: {
          updated: true,
        },
        1234: {
          updated: true,
        },
      });
    });
  });
});
