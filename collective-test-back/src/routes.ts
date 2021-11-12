import { Express, NextFunction, Request, Response } from "express";
import { searchInDataFromString } from "./lib/utils";
var axios = require('axios');

export default function routes(app: Express) {
    let cachedData: any;
    let cacheTime: any;
    app.get('/', (req: Request, res: Response) => res.send('Server work !'))
    app.get('/check', (req: Request, res: Response) => res.sendStatus(200))
    app.get('/search/:research', async (req: Request, res: Response, next: NextFunction) => {
        try {
            let {data} = await axios.get('https://api.coincap.io/v2/assets?limit=150')
            let result = searchInDataFromString(data.data, req.params.research)
            return res.json(result);
        } catch (e) {
            if (cachedData) {
                let result = searchInDataFromString(cachedData, req.params.research)
                return res.json(result);
            } else {
                return next(e)
            }
        }
    })
    app.get('/assets', async (req: Request, res: Response, next: NextFunction) => {
        if (cacheTime && cacheTime > Date.now() - 10 * 1000) {
            return res.json(cachedData)
        }
        try {
            let {data} = await axios.get('https://api.coincap.io/v2/assets?limit=150')
            cachedData = data;
            data.data.cacheTime = cacheTime;
            cacheTime = Date.now();
            return res.json(data);
        } catch (e) {
            if (cachedData) {
                return res.json(cachedData)
            } else {
                return next(e)
            }
        }
    })
}