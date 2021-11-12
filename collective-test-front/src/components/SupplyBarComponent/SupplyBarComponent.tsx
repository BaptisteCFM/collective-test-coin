import './SupplyBarComponent.css'

interface Supply {
    maxSupply: number;
    supply: number;
}

const SupplyBarComponent = ({ maxSupply, supply }: Supply) => {
    let widthSupply = (supply * 100) / maxSupply;
    return (
        <>
            {
                widthSupply < 100 && 
                <div className='max-supply-bar'>
                    <div className='supply-bar' style={{ width: `${widthSupply}%` }}>
                    </div>
                </div>
            }
        </>
    )
}

export default SupplyBarComponent