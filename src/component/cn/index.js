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
                <Route exact path={ROOT_PATH} render={() => (<Redirect to={ROOT_PATH+'term'}/>)}/>
            </div>
        );
    }
}

export default CnIndex;
