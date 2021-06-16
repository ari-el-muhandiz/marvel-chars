import MemoryCache from '../../src/lib/cache';
import chai from 'chai';
const expect = chai.expect;

describe('Memory Cache Library', () => {
  const data = [1,2,3,4];
  const memStore = MemoryCache.getInstance();
    
  it('should store cache successfully', () => {
    memStore.set('myKey', { data })
    expect(memStore.get('myKey')?.data).to.equal(data);
    expect(memStore.get('myKey')?.expiredIn).to.be.undefined;
  });
  
  it('expired should exist if ttl available', () => {
    memStore.set('myKey', { data, ttl: 5 })
    expect(memStore.get('myKey')?.expiredIn).to.exist;
    expect(memStore.get('myKey')?.data).to.equal(data);
  });

  it('should clear cache if expired', (done) => {
    memStore.set('myKey', { data, ttl: 2 })
    expect(memStore.get('myKey')?.data).to.equal(data);
    setTimeout(() => {
      expect(memStore.get('myKey')).to.be.null
      done()
    }, 3000);
  })

});