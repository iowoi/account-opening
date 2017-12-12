import React, {Component} from 'react';
import {RouteWithSubRoutes} from '../../route/';
import {Route, Redirect} from 'react-router-dom';
import {Page404} from '../404';
import { Header } from '../Common/index';
class CnIndex extends Component {
    constructor(props) {
        super(props);
    }
    render() {        
        console.log('Redirect:',ROOT_PATH)
       const {location} = this.props
        return (
            <div>
                {location.pathname.indexOf('form') != -1 ? null : <Header/>}
                <RouteWithSubRoutes routes={this.props.routes}/>
                <Route exact path={ROOT_PATH} render={() => (<Redirect to={ROOT_PATH+'cn/term'}/>)}/>
                <Route exact path={ROOT_PATH+'cn'} render={() => (<Redirect to={ROOT_PATH+'cn/term'}/>)}/>
                <Route exact path={ROOT_PATH+'cn/'} render={() => (<Redirect to={ROOT_PATH+'cn/term'}/>)}/>

                <Route component={Page404}></Route>
            </div>
        );
    }
}

export default CnIndex;
