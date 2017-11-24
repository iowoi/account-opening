import React, {Component} from 'react';
import {RouteWithSubRoutes} from '../../route/';
import {Route, Redirect} from 'react-router-dom';

class CnIndex extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <RouteWithSubRoutes routes={this.props.routes}/>
                <Route exact path='/cn' render={() => (<Redirect to='cn/term'/>)}/>
            </div>
        );
    }
}

export default CnIndex;
