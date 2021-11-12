"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchInDataFromString = void 0;
function searchInDataFromString(data, text) {
    let search = text.toLowerCase();
    let result = [];
    data.forEach((coin) => {
        if (coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)) {
            result.push(coin);
        }
    });
    return result;
}
exports.searchInDataFromString = searchInDataFromString;
