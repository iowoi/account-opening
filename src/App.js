
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
    CnAccountType,
    CnUpload,
    CnAccountInformation,
    CnInvestmentBackground,
    CnSecurityQuestions,
    CnDeclaration,
    CnFinish,
    CnFormIndex,
    PEP
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

//console.log("ENV => "+process.env.NODE_ENV)
 //console.log("ROOT_PATH => "+ROOT_PATH)
const routes = [
    {
        path: process.env.NODE_ENV === 'develop' ?  ROOT_PATH : '/',
        component: CnIndex,
        routes: [
            {
                path: ROOT_PATH + 'cn/type',
                component: CnAccountType
            },{
                path: ROOT_PATH + 'cn/term',
                component: CnSelectLocation
            }, {
                path: ROOT_PATH + 'cn/apply',
                component: CnApply
            }, {
                path: ROOT_PATH + 'cn/applyInfo',
                component: CnApplyInfo
            }, {
                path: ROOT_PATH + 'cn/PEP',
                component: PEP
            }, {
                path: ROOT_PATH + 'cn/upload',
                component: CnUpload
            },  {
                path: ROOT_PATH + 'cn/form',
                component: CnFormIndex,
                routes: [
                    {
                        path: ROOT_PATH + 'cn/form/personal-detail',
                        component: 'PersonalDetail'
                    }
                ]                    
            },{
                path: ROOT_PATH + 'en/type',
                component: CnAccountType
            },{
                path: ROOT_PATH + 'en/term',
                component: CnSelectLocation
            }, {
                path: ROOT_PATH + 'en/apply',
                component: CnApply
            }, {
                path: ROOT_PATH + 'en/applyInfo',
                component: CnApplyInfo
            }, {
                path: ROOT_PATH + 'en/PEP',
                component: PEP
            }, {
                path: ROOT_PATH + 'en/upload',
                component: CnUpload
            },  {
                path: ROOT_PATH + 'en/form',
                component: CnFormIndex,
                routes: [
                    {
                        path: ROOT_PATH + 'en/form/personal-detail',
                        component: 'PersonalDetail',
                    }
                ]                    
            }
        ]
    },
]

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router   history={browserHistory}>
                    {/* <RouteWithSubRoutes routes={routes}/> */}
                    <div>
                        {routes &&
                        routes.map((route, i) => (
                            <Route  path={route.path} key={i} render={props => (<route.component {...props} routes={route.routes}/>)}/>
                        ))}`
                    </div>
                </Router>
            </Provider>
        );
    }
}



const ScrollToTop = () => {
    window.scrollTo(0, 0);
    return null;
  };
  
export default App;