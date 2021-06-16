
import axios from 'axios';
import crypto from 'crypto';

interface ReqOptions  {
    limit?:number | string;
    offset?:number | string;
}

const reqDefault: ReqOptions = {
    limit: 20,
    offset: 0
}

export default class MarvelService {
    private baseUrl = 'http://gateway.marvel.com';
    private PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
    private PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;

    async characters(options: ReqOptions = null) {
        try {
            const { limit, offset } = {...reqDefault, ...options }
            const res =  await axios.get(`${this.baseUrl}/v1/public/characters?limit=${limit}&offset=${offset}&${this.authPath()}`);
            const results = res?.data?.data?.results;
            return results?.map((char:any) => char.id)
        } catch (error) {
            throw (error)
        }
    }

    private authPath(): string {
        const ts = Date.now();
        const hash = crypto.createHash('md5').update(`${ts}${this.PRIVATE_KEY}${this.PUBLIC_KEY}`).digest('hex');
        return `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`
    }
}