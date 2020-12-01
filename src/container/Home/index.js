import React from 'react';
import axios from 'axios';
import Header from '../../components/common/Header';
import StockItem from '../../components/StockItem'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topsStocksSymbols: ['FB', 'GOOGL', 'AAPL', 'AMZN', 'MSFT'],
            topStocks: []
        }
    }

    goHome = () => {
        this.props.history.push('/')
    }

    async componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const { topsStocksSymbols } = this.state;

        const data = await Promise.all(topsStocksSymbols.map(async item => {
            const response = await axios.get(`https://cloud.iexapis.com/stable/stock/${item}/book?token=pk_f7ba306dc715422096e963c079e0d27a`)
            const logoResponse = await axios.get(`https://cloud.iexapis.com/stable/stock//${item}/logo?token=pk_f7ba306dc715422096e963c079e0d27a`)
            return { data: response.data, logo: logoResponse.data };
        }))

        this.setState({ topStocks: data })
    }

    render() {
        const { topStocks } = this.state;
        return (
            <div className="container main-container">
                <Header goHome={this.goHome} />
                <div className="content mt-5">
                    <h1>Popular Stocks</h1>
                    <div className="stock-container">
                        <div>
                            <div className="m-4 d-flex flex-direction-row align-items-center justify-content-between">
                                <h4>COMPANY</h4>
                                <h4>MARKET PRICE</h4>
                            </div>
                            {topStocks.map((item, index) => <StockItem item={item} index={index} />)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;