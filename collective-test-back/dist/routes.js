"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./lib/utils");
var axios = require('axios');
function routes(app) {
    let cachedData;
    let cacheTime;
    app.get('/', (req, res) => res.send('Server work !'));
    app.get('/check', (req, res) => res.sendStatus(200));
    app.get('/search/:research', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            let { data } = yield axios.get('https://api.coincap.io/v2/assets?limit=150');
            let result = (0, utils_1.searchInDataFromString)(data.data, req.params.research);
            return res.json(result);
        }
        catch (e) {
            if (cachedData) {
                let result = (0, utils_1.searchInDataFromString)(cachedData, req.params.research);
                return res.json(result);
            }
            else {
                return next(e);
            }
        }
    }));
    app.get('/assets', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (cacheTime && cacheTime > Date.now() - 10 * 1000) {
            return res.json(cachedData);
        }
        try {
            let { data } = yield axios.get('https://api.coincap.io/v2/assets?limit=150');
            cachedData = data;
            data.data.cacheTime = cacheTime;
            cacheTime = Date.now();
            return res.json(data);
        }
        catch (e) {
            if (cachedData) {
                return res.json(cachedData);
            }
            else {
                return next(e);
            }
        }
    }));
}
exports.default = routes;
