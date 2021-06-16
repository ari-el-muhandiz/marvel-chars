import express from "express";
import dotenv from "dotenv";
import MarvelService, { requestDefault } from "./services/marvel.service";
import MemoryCache from "./lib/cache";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT; // default port to listen

const marvelService = new MarvelService();

const swaggerDocument = YAML.load('./swagger.yaml');

app.get('/', (req, res) => {
    res.send('Demo Marvel API')
})

app.get('/characters', async ( req, res ) => {
    try {
        // fetch from cache first
        const { limit, offset } = req.query
        const memCache = MemoryCache.getInstance();
        const cacheKey = `chars-${offset||requestDefault.limit}-${limit||requestDefault.limit}`;
        if ( memCache.get(cacheKey)) {
            // tslint:disable-next-line:no-console
            console.log('cache hit')
            return res.json({ data: memCache.get(cacheKey)?.data });
        }
        // tslint:disable-next-line:no-console
        console.log('cache miss');
        const marvelRes  = await marvelService.characters(req.query);
        memCache.set(cacheKey, {ttl: 86400, data: marvelRes })
        res.json({ data: marvelRes });
    } catch (error) {
        res.status(500).json({error: { code: 500, message: error.message }})
    }
} );

app.get('/characters/:id', async (req, res) => {
    try {
       const { id } = req.params;
       const marvelRes  = await marvelService.character(id);
       res.json({data: marvelRes})
    } catch (error) {
        res.status(500).json({error: { code: 500, message: error.message }})
    }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );