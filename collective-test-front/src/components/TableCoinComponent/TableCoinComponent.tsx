import { Coin } from '../../pages/CoinsPage/CoinsPage';
import SupplyBarComponent from '../SupplyBarComponent/SupplyBarComponent';
import './TableCoinComponent.css'

interface DataCoin {
    data: Array<Coin>;
}

const TableCoinComponent = ({data}: DataCoin) => {
    return (
        <div className='table-coin'>
            <div className='coincard-row'>
                <div id='rank'>
                    <p>Rank</p>
                </div>
                <div id='name'>
                    <p>Name</p>
                </div>
                <div id='price'>
                    <p>Price</p>
                </div>
                <div id='percentage'>
                    <p>24h %</p>
                </div>
                <div id='marketcap'>
                    <p>Market cap</p>
                </div>
                <div id='volume'>
                    <p>Volume(24h)</p>
                </div>
                <div id='supply'>
                    <p>Circulating Supply</p>
                </div>
            </div>
            {
                !data.length && <div>
                    <h1 style={{textAlign: 'center', marginTop: '25vh', fontSize: '60px'}}>🥲 Coin not found 🥲</h1>
                </div>
            }
            {
                data.map((coin: Coin, key: number) => {
                    return (
                        <div key={key} className='coincard-row'>
                            <div id='rank'>
                                <p>{coin.rank}</p>
                            </div>
                            <div id='name'>
                                <img style={{ width: '25px', height: '25px', marginRight: '0.5rem', borderRadius: '25px' }} src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="logoicon" />
                                <p className='name-coin'>{coin.name}</p>
                                <p style={{ marginLeft: '0.5rem', color: 'grey' }}>{coin.symbol}</p>
                            </div>
                            <div id='price'>
                                <p>{coin.priceUsd.substring(0, 7)}$</p>
                            </div>
                            <div id='percentage'>
                                <p style={{ color: parseFloat(coin.changePercent24Hr) > 0 ? 'green' : 'red' }}>{coin.changePercent24Hr.substring(0, 5)}%</p>
                            </div>
                            <div id='marketcap'>
                                <p>{coin.marketCapUsd.substring(0, 17)}$</p>
                            </div>
                            <div id='volume'>
                                <p style={{ marginBottom: '5px' }}>{coin.volumeUsd24Hr.substring(0, 15)}$</p>
                                <p className='volume-in-coin'>{parseFloat(coin.volumeUsd24Hr) / parseFloat(coin.priceUsd)} {coin.symbol}</p>
                            </div>
                            <div id='supply'>
                                <p style={{ marginBottom: '5px' }}>{coin.supply.substring(0, 17)}$</p>
                                {
                                    coin.maxSupply && <SupplyBarComponent maxSupply={parseFloat(coin.maxSupply)} supply={parseFloat(coin.supply)} />
                                }
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default TableCoinComponent