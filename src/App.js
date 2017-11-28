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
                path: '/term',
                component: CnSelectLocation
            }, {
                path: '/apply',
                component: CnApply
            }, {
                path: '/applyInfo',
                component: CnApplyInfo
            }, {
                path: '/personal-detail',
                component: CnPersonalDetail
            }, {
                path: '/account-information',
                component: CnAccountInformation
            }, {
                path: '/investment-background',
                component: CnInvestmentBackground
            }, {
                path: '/declaration',
                component: CnDeclaration
            }, {
                path: '/finish',
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