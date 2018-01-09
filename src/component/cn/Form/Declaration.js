import React, {Component} from 'react';
import FormHeader from './common/Header';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {InputField} from '../../Common';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {sendForm, setCookie, cookieDate} from '../../../actions';
import $ from 'jquery';
const validate = (values) => {
    const requiredFields = ["AgreeAccuracyAndNotification", "AgreeKVBTermsConditions", "AgreeRisks", "AgreePrivacy", "AgreeOther"]
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        const $input = $(`input[name="${field}"]`)

        if (!values[field]) {
            $('html, body').animate({
                scrollTop: $($input[0])
                    .parents('.steps')
                    .offset()
                    .top - $('header').height()
            });
            return field;
        }
    }
}

class Declaration extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            isCN: WEB_LANG('cn')
        }
    }
    handleChange(e) {
        const target = e.target;
        const field = target.name;
        const $input = $(`input[name="${field}"]`)
        if (target.checked) {
            this.setState({
                ["error_" + field]: null
            })
        }
    }
    handlePrevPage(e) {
        e.preventDefault();
        this.props.handleRenderPage(this.props.prevPage);
    }
    handleNextPage(e) {
        const {isCN} = this.state
        e.preventDefault();
        const validFailed = validate(this.props.dataForm.PersonalDetail.values)
        //setCookie('No','S100078',cookieDate)
        if (!validFailed) {
            this.props.sendForm(this.props.dataForm);
            this.props.handleRenderPage(this.props.nextPage);
        } else {
            this.setState({
                ["error_" + validFailed]: isCN
                    ? 'Required 必填栏位'
                    : 'Required'
            })
        }
    }

    render() {
        const {className} = this.props
        const {
            isCN,
            error_AgreeAccuracyAndNotification,
            error_AgreeKVBTermsConditions,
            error_AgreeRisks,
            error_AgreePrivacy,
            error_AgreeOther
        } = this.state
        return (
            <div className={className}>
                <div className="form-page col-md-10 col-center declaration">
                    <form onSubmit={this.handleSubmit}>
                        <div id="step1" className="steps">
                            <h3>Accuracy and Notification{isCN && "信息准确性及通知"}</h3>
                            <small className="mt-2">I confirm that all the details provided are true and
                                correct. Should any circumstances change, I will notify KVB in writing
                                immediately.<br/>{isCN && "本人确认所有提供的信息为真实准确。如该等资料有任何变更，本人将及时通知KVB昆仑国际。"}
                            </small>
                            <div className="text-center form-check-inline">
                                <Field
                                    type="checkbox"
                                    name="AgreeAccuracyAndNotification"
                                    component="input"
                                    onClick={this.handleChange}/>
                                I agree {isCN && "我同意"}
                                <div className="error-text">{error_AgreeAccuracyAndNotification
                                        ? error_AgreeAccuracyAndNotification
                                        : null}</div>

                            </div>
                        </div>

                        <hr/>

                        <div id="step2" className="steps">
                            <h3>KVB Terms & Conditions {isCN && "KVB昆仑国际条款及细则"}</h3>
                            <small className="mt-2">I confirm that a copy of the Broker Disclosure
                                Statementand Adviser’s Disclosure Statement (if applicable) has been provided to
                                me via the KVB website.<br/>{isCN && "我确认KVB网站已经向我提供了经纪商披露声明和顾问披露声明（如适用）的副本。"}
                            </small>
                            <small className="mt-2">I have read, understand and agree with all the above
                                documents and the Terms and Conditions of the Client Services Agreement.<br/>{isCN && "我已阅读，理解并同意上述所有文件以及客户服务协议的条款。"}
                            </small>
                            <small className="mt-2">By ticking the box and submitting this online
                                application I agree to be legally bound by the terms and conditions of these
                                documents.<br/>{isCN && "通过勾选该框并提交此在线申请，我同意遵守这些文件的条款和条件的法律约束。"}
                            </small>
                            <small className="mt-2">I understand that this application is subject to KVB
                                account opening criteria and KVB reserves the right to reject any applicationfor
                                any reason.<br/>{isCN && "我了解，本申请须遵守KVB开户准则，KVB保留以任何理由拒绝任何申请的权利。"}
                            </small>
                            <div className="text-center form-check-inline">
                                <Field
                                    type="checkbox"
                                    name="AgreeKVBTermsConditions"
                                    component="input"
                                    onClick={this.handleChange}/>
                                I agree {isCN && "我同意"}
                                <div className="error-text">{error_AgreeKVBTermsConditions
                                        ? error_AgreeKVBTermsConditions
                                        : null}</div>
                            </div>
                        </div>

                        <hr/>

                        <div id="step3" className="steps">
                            <h3>Risks {isCN && "风险"}</h3>
                            <small className="mt-2">I have read, understand and agree with the Risk Warning
                                and Risk Disclosure Statement contained in the Client Services Agreement.
                                <br/>{isCN && "我已阅读，理解并同意客户服务协议中包含的风险警告和风险披露声明"}
                            </small>
                            <small className="mt-2">I understand that the risk of loss in CFDs, derivatives
                                and securities trading can be substantial and have therefore carefully
                                considered whether such trading is suitable in light of my own financial
                                position and investment objectives.<br/>{isCN && "我理解，差价合约，衍生工具和证券交易的风险可能很大，因此我会根据自身的财务状况和投资目标仔细考虑这种交易是否合适。"}
                            </small>
                            <small className="mt-2">I am advised by KVB if necessary to seek appropriate
                                professional advice before making any investment decision. I understand and
                                agree that the information contained in these document does not constitute
                                financial or investment advice and has not taken into account my financial
                                position,objectives or needs.
                                <br/>{isCN && "我被KVB告知，在作出任何投资决定前，如有需要请寻求适当的专业意见。我理解并同意，这些文件中包含的信息不构成财务或投资咨询，并没有考虑到我的财务状况，目标或需求" +
                                    "。"}
                            </small>
                            <small className="mt-2">I understand and agree that all information, prices and
                                opinions are subject to change without prior notice. The product information may
                                not apply to all KVB Kunlun companies and I will contact KVB representatives in
                                my country or region, if I have any enquiries.
                                <br/>{isCN && "我理解并同意所有信息，价格和意见如有更改，恕不另行通知。产品信息可能不适用于所有KVB昆仑公司，如果有任何疑问，我将联系我所在国家或地区的KVB代表。"}
                            </small>
                            <div className="text-center form-check-inline">
                                <Field
                                    type="checkbox"
                                    name="AgreeRisks"
                                    component="input"
                                    onClick={this.handleChange}/>
                                I agree {isCN && "我同意"}
                                <div className="error-text">{error_AgreeRisks
                                        ? error_AgreeRisks
                                        : null}</div>
                            </div>
                        </div>

                        <hr/>

                        <div id="step4" className="steps">
                            <h3>Privacy {isCN && "隐私"}</h3>
                            <small className="mt-2">I have read, understand and agree to the provisions
                                contained in the Client Services Agreement relating to the Privacy Act 1993.
                                <br/> {isCN && "我已阅读，明白和同意包含在客户服务协议中隐私法例1993的条款。"}

                            </small>
                            <div className="text-center form-check-inline">
                                <Field
                                    type="checkbox"
                                    name="AgreePrivacy"
                                    component="input"
                                    onClick={this.handleChange}/>
                                I agree {isCN && "我同意"}
                                <div className="error-text">{error_AgreePrivacy
                                        ? error_AgreePrivacy
                                        : null}</div>
                            </div>
                        </div>

                        <hr/>

                        <div id="step5" className="steps">
                            <h3>Other {isCN && "其他"}</h3>
                            <small className="mt-2">I have provided KVB with my Taxpayer Identification
                                Number (TIN) for non-New Zealand residents (if applicable).
                                <br/>{isCN && "本人已将非新西兰居民纳税人识别号码（TIN）提供给KVB昆仑国际（若适用）。"}
                            </small>
                            <small className="mt-2">I confirm that I will not supply, show or make available
                                or permit to be supplied, shown or make available any market data from any
                                service provided by KVB, to any third party in any manner. I will not use any
                                data from the service to establish, maintain or provide, or assist in providing
                                trading in any financial instruments which is not authorized by law.
                                <br/>{isCN && "本人确认本人不会将KVB昆仑国际提供的市场数据以任何方式提供，发布或泄露或者同意提供，发布或泄露给任何第三方。本人也不会将此类数据用于建立，维护，提供或者协助任" +
                                    "何法律不允许的金融工具交易。"}
                            </small>
                            <small className="mt-2">I confirm that I am not a U.S. citizen or resident in the U.S. for tax purposes.
                                <br/>{isCN && "本人并非美国公民，包括从税务角度而言的居美外籍人士及／或美国居民。"}
                            </small>

                            <div className="text-center form-check-inline">
                                <Field
                                    type="checkbox"
                                    name="AgreeOther"
                                    component="input"
                                    onClick={this.handleChange}/>
                                I agree {isCN && "我同意"}
                                <div className="error-text">{error_AgreeOther
                                        ? error_AgreeOther
                                        : null}</div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button onClick={this.handlePrevPage} className="btn btn-primary">{isCN
                                    ? "返回"
                                    : "Back"}
                            </button>
                            <button onClick={this.handleNextPage} className="btn btn-primary">{isCN
                                    ? "下一步"
                                    : "Next"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Declaration = reduxForm({
    form: 'PersonalDetail'
    // , asyncValidate
})(Declaration)

const mapStateToProps = (state) => {
    const source = state.info.source
    const dataForm = state.form
    return {source, dataForm};
}

const mapDispatchToProps = (dispatch) => ({
    sendForm: (data) => {
        dispatch(sendForm(data))
    }
})

const CnDeclaration = connect(mapStateToProps, mapDispatchToProps)(Declaration)

export default CnDeclaration;
