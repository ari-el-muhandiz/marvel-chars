import express from "express";
import dotenv from "dotenv";
import MarvelService from "./services/marvel.service";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT; // default port to listen


const marvelService = new MarvelService();

// define a route handler for the default home page
app.get( "/", async ( req, res ) => {
    try {
        const marvelRes  = await marvelService.characters(req.query);
        res.json({ data: marvelRes });
    } catch (error) {
        res.status(500).json({error: error.message})
    }
} );

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );