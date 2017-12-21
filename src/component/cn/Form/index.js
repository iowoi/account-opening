import React, {Component} from 'react';
import {RouteWithSubRoutes} from '../../../route';
import {Route, Redirect} from 'react-router-dom';
import NavBar from './common/Navbar';
import {findDOMNode} from 'react-dom';
import autoBind from 'react-autobind';
import FormHeader from './common/Header';
import {getSource} from '../../../actions';

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


const steps = [
    {cn:"个人申请", en:"Individual Applicant"},
    {cn:"银行帐户资料", en:"Settlement details"},
    {cn:"就业资料", en:"Employment Information"},
    {html:"<font class='hidden-lg-down'>Common Reporting Standard</font>普通报告标准</font> <br/> <font class='hidden-lg-down'>Individual Self-Certification</font>个人认证"},
]
const pageInfo = {
    'personal-detail':{
        steps : [
            {cn:"个人申请", en:"Individual Applicant"},
            {cn:"银行帐户资料", en:"Settlement details"},
            {cn:"就业资料", en:"Employment Information"},
            {html:"<font class='hidden-lg-down'>Common Reporting Standard</font>普通报告标准</font> <br/> <font class='hidden-lg-down'>Individual Self-Certification</font>个人认证"},
        ]
    },
    'account-information':{
        steps : [
            {cn: "投资性质与目的", en: "Nature and Purpose"}, 
            {cn: "开户币种", en: "Currency Type"}, 
            {cn: "帐户类别", en: "Account type"},
            {cn: "交易市場", en: "Market access"}
        ]
    },
    'investment-background':{
        steps : [
            {cn: "金融市场投资经验等级", en: "Level of Experience Investing in Financial Markets"}, 
            {cn: "产品特点及风险", en: "Products Features and Risks"}
        ]
    },
    'security-question': {
        steps : [
            {cn: "安全问题", en: "Security Questions"}
        ]
    },
    'declaration' :{
        steps : [
            {html: "<font class='hidden-lg-down'>Accuracy and Notification</font><br/>信息准确性及通知</font>"},
            {html: "<font class='hidden-lg-down'>KVB Terms & Conditions</font><br/>KVB昆仑国际条款及细则</font>"}, 
            {cn: "风险", en: "Risks"},
            {cn: "隐私", en: "Privacy"}, 
            {cn: "其他", en: "Other"}
        ]
    },
    'finish' : {
        step : []
    }
}
class FormIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'personal-detail'
            //page: 'investment-background'
        }
        autoBind(this);
    }
    componentDidUpdate(){
        //console.log('componentDidUpdate')
    }
    handleRenderPage(page) {
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
        //console.log(pageInfo.page)
        return (
            <div>
                <FormHeader steps={pageInfo[page].steps} currentPage={page}/> 

                <CnPersonalDetail
                    className={page === 'personal-detail'
                    ? "d-block"
                    : "d-none"}
                    nextPage='account-information'
                    currentPage={page}
                    handleRenderPage={this.handleRenderPage}/>
                <CnAccountInformation
                    className={page === 'account-information'
                    ? "d-block"
                    : "d-none"}
                    prevPage='personal-detail'
                    nextPage='investment-background'
                    currentPage={page}
                    handleRenderPage={this.handleRenderPage}/> 
                <CnInvestmentBackground
                    className={page === 'investment-background'
                    ? "d-block"
                    : "d-none"}
                    prevPage='account-information'
                    nextPage='security-question'
                    currentPage={page}
                    handleRenderPage={this.handleRenderPage}/> 
                <CnSecurityQuestions
                    className={page === 'security-question'
                    ? "d-block"
                    : "d-none"}
                    prevPage='investment-background'
                    nextPage='declaration'
                    currentPage={page}
                    handleRenderPage={this.handleRenderPage}/>
                <CnDeclaration
                    className={page === 'declaration'
                    ? "d-block"
                    : "d-none"}
                    prevPage='security-question'
                    nextPage='finish'
                    currentPage={page}
                    handleRenderPage={this.handleRenderPage}/>
                <CnFinish
                    className={page === 'finish'
                    ? "d-block"
                    : "d-none"}/>
            </div>
        )

        //<RouteWithSubRoutes routes={this.props.routes}/>

    }
}

export default FormIndex;
