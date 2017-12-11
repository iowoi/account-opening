import React, {Component} from 'react';
import FormHeader from './common/Header';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';

const validate = values => {
    const errors = {}
    const requiredFields = [
        'gender',
        'firstName',
        'surname',
        'email',
        'birth',
        'countryOfBirth',
        'nationality',
        'address',
        'city',
        'country',
        'contactCountryCode',
        'contactNumber',
        'telPassword',
        'companyName',
        'employmentStatus',
        'natureOfBusiness',
        'taxResidentCountries'
    ]
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

class CnInvestmentBackground extends Component {
    constructor(props) {
        super(props);

    }

    handleChange(event, index, value) {
        console.log(event, index, value)
        // this.setState({loc:value})
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
        return (
            <div>
                <FormHeader steps={steps} key={0}/>
                <div className="form-page col-md-10 col-center" key={1}>
                    <form onSubmit={this.handleSubmit}>
                        <div id="step1" className="steps">
                            <h3>Level of Experience Investing in Financial Markets 金融市场投资经验等级</h3>

                            <div className="form-group">
                                <label>Please detail your trading experience with Over-the-Counter or Exchange
                                    Traded Derivatives?
                                    <br/>
                                    请问您是否经常进行场外衍生品交易或交易所衍生品交易？</label>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    Regularly (10 or more trades each year) / 经常（每年10次或以上）
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="female"/>
                                    Occasionally (3-9 trades each year) / 偶尔（每年3-9次）
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    Rarely (1-2 trades each year) / 较少（每年1-2次）
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    Never / 从没有过
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Please detail your trading experience with shares or bonds. 请问您是否有过股票或者债券交易经验？</label>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    Regularly (10 or more trades each year) / 经常（每年10次或以上）
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="female"/>
                                    Occasionally (3-9 trades each year) / 偶尔（每年3-9次）
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    Rarely (1-2 trades each year) / 较少（每年1-2次）
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    Never / 从没有过
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Annual Income (USD equivalent) 年收入 (美元计算)</label>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    10,000~100,000 / 介于10,000~100,000
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="female"/>
                                    100,000~750,000 / 介于100,000~750,000
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    Above 750,000 / 高于750,000
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    Below 10,000 / 低于10,000
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Source of funds for security trading 交易资金来源</label>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    Employment / 工作收入
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="female"/>
                                    Savings and Investment / 存款和投资
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    Inheritance / 遗产
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    Others / 其他
                                </div>
                            </div>
                            <hr/>
                            <h3>Products Features and Risks 产品特点及风险</h3>
                            <div className="form-group">
                                <label>I have clear understanding and knowledge that trading or investing in
                                    financial products such as CFDs, Derivatives and Securities carry a high degree
                                    of risk.
                                    <br/>我清楚的理解并且知道进行交易或投资诸如差价合约，衍生工具和证券等金融产品具有较高的风险。</label>
                                <div className="form-check-inline">
                                    <Field type="radio" component="input" name="gender" value="female"/>
                                    Yes 是
                                    <Field type="radio" component="input" name="gender" value="female"/>
                                    No 否
                                </div>
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
                            <Link to="account-information" className="btn btn-primary">返回
                            </Link>
                            <Link to="security-question" className="btn btn-primary">下一步
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

CnInvestmentBackground = reduxForm({
    form: 'InvestmentBackground', validate
    // , asyncValidate
})(CnInvestmentBackground)

export default CnInvestmentBackground;
