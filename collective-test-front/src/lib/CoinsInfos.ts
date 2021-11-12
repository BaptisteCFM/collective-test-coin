import axios from "axios";
import { Coin } from "../pages/CoinsPage/CoinsPage";

export async function getCoinsInfos() {
    let coinData = []
    try {
        const { data } = await axios.get('http://localhost:4040/assets')
        coinData = data.data;
    } catch (e) {
        console.log('Error:', e);
    }
    finally {
        console.log("ALL COIN DATA RECEIVE");
    }
    return coinData;
}

export async function getSearchCoinsInfos(search: string) {
    let coinData = []
    try {
        const { data } = await axios.get(`http://localhost:4040/search/${search}`)
        coinData = data;
    } catch (e) {
        console.log('Error:', e);
    }
    finally {
        console.log("SEARCH COIN DATA RECEIVE");
    }
    return coinData;
}

export function sortByGain(data: Array<Coin>) {
    const tab = data;
    tab.sort((a,b) => (parseFloat(a.changePercent24Hr) < parseFloat(b.changePercent24Hr)) ? 1 : ((parseFloat(b.changePercent24Hr) < parseFloat(a.changePercent24Hr)) ? -1 : 0))
    return tab.slice(0, 3);
}

export function sortByLoss(data: Array<Coin>) {
    var tab = data;
    tab.sort((a,b) => (parseFloat(a.changePercent24Hr) > parseFloat(b.changePercent24Hr)) ? 1 : ((parseFloat(b.changePercent24Hr) > parseFloat(a.changePercent24Hr)) ? -1 : 0))
    return tab.slice(0, 3);
}

export function sortByVolume(data: Array<Coin>) {
    let tab = data;
    tab.sort((a,b) => (parseFloat(a.volumeUsd24Hr) < parseFloat(b.volumeUsd24Hr)) ? 1 : ((parseFloat(b.volumeUsd24Hr) < parseFloat(a.volumeUsd24Hr)) ? -1 : 0))
    return tab.slice(0, 3);
}