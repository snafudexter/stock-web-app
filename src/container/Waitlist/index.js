import React from 'react';
import axios from 'axios';
import Header from '../../components/common/Header';
import { saveSymbols, getUser } from '../../actions/user'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import StockItem from '../../components/StockItem'

const stocksJSON = require('../../stocks.json')

class Home extends React.Component {

    ref = React.createRef();
    constructor(props) {
        super(props);
        let user = localStorage.getItem('user');
        if (user)
            user = JSON.parse(user)
        this.state = {
            user: user,
            topsStocksSymbols: user.symbols,
            topStocks: [],
            queryOptions: []
        }
    }

    async componentDidMount() {
        this.getUserData();
    }

    getUserData = () => {
        const {user} = this.state
        getUser(user.uid).then((res)=> {
            if(res.data)
            {
                this.setState({user: res.data, topsStocksSymbols: res.data.symbols}, () => {
                    this.loadData();
                })
            }
        })
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

    handleChange = (value) => {
        this.ref.clear();
        const { topsStocksSymbols } = this.state;
        topsStocksSymbols.unshift(value[0].symbol)

        this.setState({ topsStocksSymbols }, () => {
            saveSymbols({ uid: this.state.user.uid, symbols: topsStocksSymbols })
            this.loadData();
        })
    }

    handleSearch = (query) => {
        let filt = stocksJSON.filter(item => item.company.toLowerCase().includes(query.toLowerCase()) || item.symbol.toLowerCase().includes(query.toLowerCase()))
        this.setState({ queryOptions: filt })
    }

    goHome = () => {
        this.props.history.push('/')
    }

    handleRemove = (index) => {
        let topsStocksSymbols = this.state.topsStocksSymbols
        topsStocksSymbols.splice(index, 1)
        this.setState((topsStocksSymbols), () => {
            console.log(this.state.user, topsStocksSymbols)
            saveSymbols({ uid: this.state.user.uid, symbols: topsStocksSymbols })
            this.loadData();
        })
    }

    render() {
        const { topStocks } = this.state;
        return (
            <div className="container main-container">
                <Header goHome={this.goHome} />
                <div className="content mt-5 d-flex flex-column align-items-center">
                    <AsyncTypeahead className="typeahead" ref={(ref) => this.ref = ref} value={[]} isLoading={false} labelKey="company" options={this.state.queryOptions} id="gg" onSearch={this.handleSearch} renderMenuItemChildren={(option, props) => {
                        return <React.Fragment><span>{option.company}</span></React.Fragment>
                    }} onChange={this.handleChange} />

                    <h1 className="page-heading">WatchList</h1>
                    <div className="stock-container">
                        <div>
                            <div className="m-4 d-flex flex-row align-items-center justify-content-between">
                                <h4>COMPANY</h4>
                                <h4>MARKET PRICE</h4>
                            </div>
                            {topStocks.map((item, index) => {
                                return <StockItem handleRemove={this.handleRemove} item={item} index={index} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;