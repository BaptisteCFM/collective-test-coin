import { useEffect, useState } from 'react'
import TableCoinComponent from '../../components/TableCoinComponent/TableCoinComponent';
import TopContainerComponent from '../../components/TopContainerComponent/TopContainerComponent';
import { getCoinsInfos, getSearchCoinsInfos } from '../../lib/CoinsInfos'
import './CoinsPage.css'

export type Coin = {
    changePercent24Hr: string,
    explorer: string,
    id: string,
    marketCapUsd: string,
    maxSupply: string,
    name: string,
    priceUsd: string,
    rank: string,
    supply: string,
    symbol: string,
    volumeUsd24Hr: string,
    vwap24Hr: string,
};

const CoinsPage = () => {
    const [data, setData] = useState<Array<Coin>>([]);
    const [search, setSearch] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSearching, setIsSearching] = useState<boolean>(false);


    useEffect(() => {
        getData();
        const interval = setInterval(async () => {
            if (isSearching) {
                const result = await getSearchCoinsInfos(search)
                if (result) {
                    setData(result);
                }
                return;
            }
            getData();
        }, 10000);
        return () => clearInterval(interval);
    }, [isSearching]);// eslint-disable-line react-hooks/exhaustive-deps

    async function getData() {
        const currentData = await getCoinsInfos();
        setData(currentData);
        setIsLoading(false);
    }

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const onSearch = async () => {
        if (!search.length) {
            setIsSearching(false);
            const data = await getCoinsInfos();
            setData(data);
            return
        }
        setIsSearching(true);
        const result = await getSearchCoinsInfos(search);
        if (result) {
            setData(result);
        }
    }

    return (
        <div className='coinpage'>
            <h1>Today's Cryptocurrency Prices by Collective Coin Cap</h1>
            <p style={{color: 'grey', marginTop: '0px'}}>The world's top 150 cyptomonnais ranking</p>
            <TopContainerComponent/>
            <div className='search-bar'>
                <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => { onChangeSearch(event) }} type="search" placeholder='Search' />
                <button onClick={onSearch}>Find</button>
            </div>
            {
                isLoading ? <h1>Loading ...</h1> : <TableCoinComponent data={data} />
            }
        </div>
    )
}

export default CoinsPage