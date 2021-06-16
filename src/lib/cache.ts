// in memory cache helper
interface CacheObjectInterface  {
    data: any,
    ttl?: number,
    expiredIn?: number
}

export default class MemoryCache {
    private static instance: MemoryCache;
    private store : any;

    constructor() {
        this.store = {};
    }

    public set(key: string, data: CacheObjectInterface):void {
        if(data.ttl) {
            // set expiredIn if ttl available
            data.expiredIn = Date.now() + (data.ttl * 1000);
        }
        this.store[key] = data
    }

    public get(key:string):CacheObjectInterface {
        const result = this.store[key];
        // delete cache if expired
        if (result && result.expiredIn && Date.now() >= result.expiredIn) {
            delete this.store[key];
            return null;
        }
        return result;
    }

    public static getInstance(): MemoryCache {
        if (!MemoryCache.instance) {
            MemoryCache.instance = new MemoryCache();
        }

        return MemoryCache.instance;
    }
}