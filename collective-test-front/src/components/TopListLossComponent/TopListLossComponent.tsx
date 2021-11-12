import { useEffect, useState } from 'react'
import { sortByLoss } from '../../lib/CoinsInfos';
import { Coin } from '../../pages/CoinsPage/CoinsPage'
import './TopListLossComponent.css'

interface DataTopList {
    data: Array<Coin>;
}

const TopListLossComponent = ({data} : DataTopList) => {
    const [tabData, setTabData] = useState<Array<Coin>>([]);
    useEffect(() => {
        setTabData(sortByLoss(data));
    }, [data])

    return (
        <div className='top-coin'>
            <h1><span style={{fontSize: 30}}>😱</span> Biggest Loosers</h1>
            {
                tabData.map((coin: Coin, key: number) => {
                    return (
                        <div key={key} className='coin-top'>
                            <p style={{marginRight: '1rem'}}>{key + 1}</p>
                            <div style={{display: 'flex', alignContent: 'center', width: '80%'}}>
                                <div style={{display: 'flex', height: 'auto', alignItems: 'center'}}>
                                    <img style={{ width: '20px', height: '20px', marginRight: '0.5rem', borderRadius: '25px' }} src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="logoicon" />
                                </div>
                                <p className='name'>{coin.name}</p>
                                <p className='symbol'>{coin.symbol}</p>
                            </div>
                            <div>
                                <p style={{ color: parseFloat(coin.changePercent24Hr) > 0 ? 'green' : 'red' }}>{coin.changePercent24Hr.substring(0, 5)}%</p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default TopListLossComponent