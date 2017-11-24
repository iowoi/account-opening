import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './assets/svg/icn-logo.svg';
import {Header} from './component/Common';
import {RouteWithSubRoutes} from './route';
import {
    CnIndex,
    CnTerm,
    CnApply,
    CnApplyInfo,
    CnAccountInformation,
    CnInvestmentBackground,
    CnDeclaration,
    CnFinish,
    EnIndex,
    EnTerm,
    EnForm
} from './component/index';
import {CnPersonalDetail, CnSelectLocation} from './container';
import {MemoryRouter} from 'react-router'
import {browserHistory} from 'react-router'

import {BrowserRouter as Router, Switch, withRouter} from 'react-router-dom';

// 3rd
import './styles/bootstrap/bootstrap.scss';
// custom
import './styles/app.scss';
import {Provider} from 'react-redux';
import store from './store';

const routes = [
    {
        path: '/cn',
        component: CnIndex,
        routes: [
            {
                path: '/cn/term',
                component: CnSelectLocation
            }, {
                path: '/cn/apply',
                component: CnApply
            }, {
                path: '/cn/applyInfo',
                component: CnApplyInfo
            }, {
                path: '/cn/personal-detail',
                component: CnPersonalDetail
            }, {
                path: '/cn/account-information',
                component: CnAccountInformation
            }, {
                path: '/cn/investment-background',
                component: CnInvestmentBackground
            }, {
                path: '/cn/declaration',
                component: CnDeclaration
            }, {
                path: '/cn/finish',
                component: CnFinish
            }
        ]
    }, {
        path: '/en',
        component: EnIndex,
        routes: [
            {
                path: '/en/term',
                component: EnTerm
            }, {
                path: '/en/form',
                component: EnForm
            }
        ]

    }
]

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <div>
                        <Header/>
                        <div className="clearfix"></div>
                        <MuiThemeProvider>
                            <div className="container-fluid">
                                <RouteWithSubRoutes routes={routes}/>
                            </div>
                        </MuiThemeProvider>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;