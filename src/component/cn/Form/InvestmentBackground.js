import React, {Component} from 'react';
import autoBind from 'auto-bind';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import FormHeader from './common/Header';
import {connect} from 'react-redux';
import {CreateRadios} from '../../Common';

const validate = values => {
    const errors = {}
    const requiredFields = ['ExchangeExperenceId']
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

class InvestmentBackground extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleChange(event, index, value) {
        //  console.log(event, index, value) this.setState({loc:value})
    }
    handleNextPage(e) {
        e.preventDefault();
        this.props.handleRenderPage(this.props.nextPage);
    }
    handlePrevPage(e) {
        e.preventDefault();
        this.props.handleRenderPage(this.props.prevPage);
    }

    render() {
        const steps = [
            {
                cn: "金融市场投资经验等级",
                en: "Level of Experience Investing in Financial Markets"
            }, {
                cn: "产品特点及风险",
                en: "Products Features and Risks"
            }
        ]
        const {pristine, submitting, source, style} = this.props
        return (
            <div style={style}>
                <FormHeader steps={steps}/>
                <div className="form-page col-md-10 col-center">
                    <div id="step1" className="steps">
                        <h3>Level of Experience Investing in Financial Markets 金融市场投资经验等级</h3>

                        <div className="form-group">
                            <label>Please detail your trading experience with Over-the-Counter or Exchange
                                Traded Derivatives?
                                <br/>
                                请问您是否经常进行场外衍生品交易或交易所衍生品交易？</label>
                            <div className="form-group">
                                {source && CreateRadios(source.ExperienceLevels, 'ExchangeExperenceId')}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Please detail your trading experience with shares or bonds. 请问您是否有过股票或者债券交易经验？</label>
                            <div className="form-group">
                                {source && CreateRadios(source.ExperienceLevels, 'SharesOrBondsExperenceId')}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Annual Income (USD equivalent) 年收入 (美元计算)</label>
                            <div className="form-group">
                                {source && CreateRadios(source.FundsAvailableLevels, 'IncomeLevelsId')}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Source of funds for security trading 交易资金来源</label>
                            <div className="form-group">
                                {source && CreateRadios(source.FundSourceTypes, 'FundSourceTypesId')}
                            </div>
                        </div>
                        <hr/>
                        <h3>Products Features and Risks 产品特点及风险</h3>
                        <div className="form-group">
                            <label>I have clear understanding and knowledge that trading or investing in
                                financial products such as CFDs, Derivatives and Securities carry a high degree
                                of risk.
                                <br/>我清楚的理解并且知道进行交易或投资诸如差价合约，衍生工具和证券等金融产品具有较高的风险。</label>
                            {source && CreateRadios(source.YesNoTypes, 'ClearUnderstandingId', 'inline')}
                        </div>
                        <hr/>

                        <p>外汇保证金交易、差价合约交易,
                            股票交易以及其他衍生工具交易涉及高风险，亏损风险可以相当巨大。投资者应谨慎考虑，并根据自身的财务状况和投资目标來评估是否合适订立任何交易。在作出该评估时，投资者也应考虑向专业顾问寻求意见。投资者在进行任何投资决定前，应仔细阅读KVB最新版本的
                            产品信息披露声明 。 产品信息披露声明 及 投资顾问披露声明 可向KVB昆仑国际免费索取。此产品披露声明亦备案于新西兰商务部官方网站
                            www.business.govt.nz/disclose</p>

                        <p>本网页内容提供之市场信息仅供参考，并不构成投资建议。所有数据、价格及意见均随时变更而不作另行通知。文中某些投资产品，信息和推广计划并不适于KVB昆仑国际所有公司，请与所在国家或地区的KVB昆仑国际代表作出查询。</p>

                        <p>外汇保证金、差价合约, 股票交易及衍生工具是由 KVB 昆仑国际纽西兰公司提供，而您同意接受纽西兰客户服务协议与纽西兰法律的制约。</p>
                    </div>

                    <div className="text-center">
                        <button onClick={this.handlePrevPage} className="btn btn-primary">返回
                        </button>
                        <button onClick={this.handleNextPage} className="btn btn-primary">下一步
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

InvestmentBackground = reduxForm({
    form: 'InvestmentBackground', validate
    // , asyncValidate
})(InvestmentBackground)

const CnInvestmentBackground = connect(state => {
    const initialValues = {
        ExchangeExperenceId: "1",
        SharesOrBondsExperenceId: "1",
        IncomeLevelsId: "1",
        FundSourceTypesId: "1",
        ClearUnderstandingId: '1'
    }
    const source = state.info.source
    return {source, initialValues};
})(InvestmentBackground)

export default CnInvestmentBackground;