import React, {Component} from 'react';
import {RouteWithSubRoutes} from '../../route/';
import {Route, Redirect} from 'react-router-dom';
import {Page404} from '../404';
class CnIndex extends Component {
    constructor(props) {
        super(props);
    }
    render() {        
       console.log(this.props)
       console.log(ROOT_PATH)
        return (
            <div>
                <RouteWithSubRoutes routes={this.props.routes}/>
                <Route exact path={ROOT_PATH} render={() => (<Redirect to={ROOT_PATH+'cn/term'}/>)}/>
                <Route component={Page404}></Route>
            </div>
        );
    }
}

export default CnIndex;
