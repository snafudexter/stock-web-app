import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from './container/Home'
import Waitlist from './container/Waitlist'

class Router extends React.Component{

    render(){
        return(<Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/waitlist" component={Waitlist} />
        </Switch>)
    }
}

export default Router;