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
        path: '',
        component: CnIndex,
        routes: [
            {
                path: ROOT_PATH+'term',
                component: CnSelectLocation
            }, {
                path: ROOT_PATH+'apply',
                component: CnApply
            }, {
                path: ROOT_PATH+'applyInfo',
                component: CnApplyInfo
            }, {
                path: ROOT_PATH+'personal-detail',
                component: CnPersonalDetail
            }, {
                path: ROOT_PATH+'account-information',
                component: CnAccountInformation
            }, {
                path: ROOT_PATH+'investment-background',
                component: CnInvestmentBackground
            }, {
                path: ROOT_PATH+'declaration',
                component: CnDeclaration
            }, {
                path: ROOT_PATH+'finish',
                component: CnFinish
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
                        <MuiThemeProvider>
                                <RouteWithSubRoutes routes={routes}/>
                        </MuiThemeProvider>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;