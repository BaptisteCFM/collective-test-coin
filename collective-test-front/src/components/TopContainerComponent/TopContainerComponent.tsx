import { useEffect, useState } from 'react';
import { getCoinsInfos } from '../../lib/CoinsInfos';
import { Coin } from '../../pages/CoinsPage/CoinsPage';
import TopListGainerComponent from '../TopListGainerComponent/TopListGainerComponent';
import TopListLossComponent from '../TopListLossComponent/TopListLossComponent';
import TopListVolumeComponent from '../TopListVolumeComponent/TopListVolumeComponent';
import './TopContainerComponent.css'

const TopContainerComponent = () => {
    const [data, setData] = useState<Array<Coin>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getData() {
            const currentData = await getCoinsInfos();
            setData(currentData);
            setIsLoading(false);
        }

        getData();

    }, [isLoading]);


    return (
        <>
        {
            !isLoading ? <div className='tops-coin-container'>
            <TopListGainerComponent data={data}/>
            <TopListLossComponent data={data}/>
            <TopListVolumeComponent data={data}/>
            </div> : <h1>Loading ...</h1>
        }
        </>

    )
}

export default TopContainerComponent