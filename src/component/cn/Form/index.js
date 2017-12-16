import React, {Component} from 'react';
import {RouteWithSubRoutes} from '../../../route';
import {Route, Redirect} from 'react-router-dom';
import NavBar from './common/Navbar';
import {findDOMNode} from 'react-dom';
import autoBind from 'auto-bind';

import {
    CnTerm,
    CnApply,
    CnApplyInfo,
    CnUpload,
    CnInvestmentBackground,
    CnSecurityQuestions,
    CnDeclaration,
    CnFinish,
    CnAccountInformation
} from '../../index';
import {CnIndex, CnPersonalDetail, CnSelectLocation} from '../../../container';

import {Switch} from 'react-router-dom';
import {component} from 'react-router';
class FormIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'personal-detail'
            //page: 'security-question'
        }
        autoBind(this);
    }
    handleRenderPage(page) {
        console.log(page)
        this.setState({page: page})
        window.scrollTo(0,0)

    }

    render() {
        // console.log("routes",this.props.routes) const FormComponents  =
        // this.props.routes
        const {routes, handleRenderPage} = this.props
        const {page} = this.state
        const show = {
            display: 'block'
        }
        const hide = {
            display: 'none'
        }
        return (
            <div>
                 <CnPersonalDetail
                    style={page === 'personal-detail'
                    ? show
                    : hide}
                    nextPage='account-information'
                    handleRenderPage={this.handleRenderPage}/>
                <CnAccountInformation
                    style={page === 'account-information'
                    ? show
                    : hide}
                    prevPage='personal-detail'
                    nextPage='investment-background'
                    handleRenderPage={this.handleRenderPage}/> 
                <CnInvestmentBackground
                    style={page === 'investment-background'
                    ? show
                    : hide}
                    prevPage='investment-background'
                    nextPage='security-question'
                    handleRenderPage={this.handleRenderPage}/> 
                <CnSecurityQuestions
                    style={page === 'security-question'
                    ? show
                    : hide}
                    prevPage='investment-background'
                    nextPage='declaration'
                    handleRenderPage={this.handleRenderPage}/>
                <CnDeclaration
                    style={page === 'declaration'
                    ? show
                    : hide}
                    nextPage='security-questio'
                    nextPage='finish'
                    handleRenderPage={this.handleRenderPage}/>
                <CnFinish
                    style={page === 'finish'
                    ? show
                    : hide}/>
            </div>
        )

        //<RouteWithSubRoutes routes={this.props.routes}/>

    }
}

export default FormIndex;
