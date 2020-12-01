import React from 'react';
import removeIcon from '../../assets/images/remove.png'
const StockItem = ({ item, index, handleRemove }) => {
    const { quote } = item.data;
    return (<div key={index} className="m-4 d-flex flex-direction-row align-items-center justify-content-between">
        <div className="stock-tile-left d-flex align-items-center">
            <img className="company-logo" src={item.logo.url} />
            <p className="ml-3">{quote.companyName}</p>
        </div>
        <div className="stock-item-right">
            <div className="d-flex flex-column text-right">
                <b>{quote.latestPrice} USD</b>
                <p>$ {quote.change} ({parseFloat(quote.changePercent).toFixed(3)})</p>
            </div>
            {handleRemove && <img onClick={()=> {
                handleRemove(index)
            }} className="remove-icon" src={removeIcon} />}
        </div>

    </div>)
}

export default StockItem;