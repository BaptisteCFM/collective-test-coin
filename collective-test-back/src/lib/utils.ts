export function searchInDataFromString(data: Array<any>, text: string) {
    let search = text.toLowerCase();
    let result: Array<any> = [];

    data.forEach((coin) => {
        if (coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)) {
            result.push(coin)
        }
    })

    return result;
}