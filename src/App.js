import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './assets/svg/icn-logo.svg';
import {Header} from './component/Common';
import {RouteWithSubRoutes} from './route';
import {connect} from 'react-redux';



import {
    CnTerm,
    CnApply,
    CnApplyInfo,
    CnUpload,
    CnAccountInformation,
    CnInvestmentBackground,
    CnSecurityQuestions,
    CnDeclaration,
    CnFinish,
    FormIndex,
} from './component/index';
import {CnIndex, CnPersonalDetail, CnSelectLocation} from './container';
import {browserHistory} from 'react-router'

import {BrowserRouter as Router, Switch, withRouter, Route, Redirect} from 'react-router-dom';

// 3rd
import './styles/bootstrap/bootstrap.scss';
// custom
import './styles/app.scss';
import {Provider} from 'react-redux';
import store from './store';
console.log("ENV => "+process.env.NODE_ENV)
console.log("ROOT_PATH => "+ROOT_PATH)
import {getSource} from './actions';


getSource();
const routes = [
    {
        path: process.env.NODE_ENV === 'develop' ?  ROOT_PATH : '/',
        component: CnIndex,
        routes: [
            {
                path: ROOT_PATH + 'cn/term',
                component: CnSelectLocation
            }, {
                path: ROOT_PATH + 'cn/apply',
                component: CnApply
            }, {
                path: ROOT_PATH + 'cn/applyInfo',
                component: CnApplyInfo
            }, {
                path: ROOT_PATH + 'cn/upload',
                component: CnUpload
            },  {
                path: ROOT_PATH + 'cn/form',
                component: FormIndex,
                routes: [
                    {
                        path: ROOT_PATH + 'cn/form/personal-detail',
                        component: CnPersonalDetail
                    },{
                        path: ROOT_PATH + 'cn/form/account-information',
                        component: CnAccountInformation
                    }, {
                        path: ROOT_PATH + 'cn/form/investment-background',
                        component: CnInvestmentBackground
                    }, {
                        path: ROOT_PATH + 'cn/form/security-question',
                        component: CnSecurityQuestions
                    }, {
                        path: ROOT_PATH + 'cn/form/declaration',
                        component: CnDeclaration
                    }, {
                        path: ROOT_PATH + 'cn/form/finish',
                        component: CnFinish
                    }
                ]                    
            }
        ]
    },
]

class App extends Component {
    
    render() {
        console.log("APP",this.props)
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    {/* <RouteWithSubRoutes routes={routes}/> */}
                    <Switch>
                        {routes &&
                        routes.map((route, i) => (
                            <Route path={route.path} key={i} render={props => (<route.component {...props} routes={route.routes}/>)}/>
                        ))}`
                       
                    </Switch>
                </Router>
            </Provider>
        );
    }
}




export default App;