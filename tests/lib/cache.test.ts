import MemoryCache from '../../src/lib/cache';
import chai from 'chai';
const expect = chai.expect;

describe('Memory Cache Library', () => {
  const data = [1,2,3,4]
  describe('#set', () => {
    it('should store cache successfully', () => {
        const memStore = MemoryCache.getInstance();
        memStore.set('myKey', { data })
        expect(memStore.get('myKey')?.data).to.equal(data);
    });
  })

  it('should get cache successfully', () => {});
  it('should delete cache if expired', () => {});
});