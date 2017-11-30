import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'
import {Link} from 'react-router-dom';
import autoBind from 'auto-bind';
import {Redirect} from 'react-router';
const location = {
    pathname: ROOT_PATH + 'cn/apply'
}

class CnTerm extends Component {
    constructor(props) {
        super(props);
        autoBind(this)
    }

    handleSubmit(e) {
        this
            .props
            .sendLocation(e)
        console.log(location)
        this
            .props
            .history
            .push(location)
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="col-lg-9 col-md-10 col-center column-wrap">
                <div className="row">
                    <form onSubmit={handleSubmit(this.handleSubmit)}>
                        <div className="col-lg-4 col-md-5 left-wrap">
                            <h4>请先选取你的居住地</h4>
                            <Field component="select" name="loc" className="custom-select">
                                <option value="Argentina">Argentina 阿根廷</option>
                                <option value="Austria">Austria 奥地利</option>
                                <option value="Belgium">Belgium 比利时</option>
                                <option value="Brazil">Brazil 巴西</option>
                                <option value="Canada">Canada 加拿大</option>
                                <option value="China">China 中国</option>
                                <option value="Denmark">Denmark 丹麦</option>
                                <option value="Finland">Finland 芬兰</option>
                                <option value="France">France 法国</option>
                                <option value="Germany">Germany 德国</option>
                                <option value="Greece">Greece 希腊</option>
                                <option value="HK">Hong Kong, China 中国香港</option>
                                <option value="Iceland">Iceland 冰岛</option>
                                <option value="India">India 印度</option>
                                <option value="Ireland">Ireland 爱尔兰</option>
                                <option value="Italy">Italy 意大利</option>
                                <option value="Japan">Japan 日本</option>
                                <option value="Netherlands">Kingdom of the Netherlands 荷兰</option>
                                <option value="Luxembourg">Luxembourg 卢森堡</option>
                                <option value="Macau">Macau, China 中国澳门</option>
                                <option value="Mexico">Mexico 墨西哥</option>
                                <option value="NewZealand">New Zealand 新西兰</option>
                                <option value="Norway">Norway 挪威</option>
                                <option value="Portugal">Portugal 葡萄牙</option>
                                <option value="Korea">Republic of Korea 韩国</option>
                                <option value="RussianFederation">Russian Federation 俄罗斯联邦</option>
                                <option value="Singapore">Singapore 新加坡</option>
                                <option value="SouthAfrica">South Africa 南非</option>
                                <option value="Spain">Spain 西班牙</option>
                                <option value="Sweden">Sweden 瑞典</option>
                                <option value="Switzerland">Switzerland 瑞士</option>
                                <option value="Taiwan">Taiwan 台灣</option>
                                <option value="Turkey">Turkey 土耳其</option>
                                <option value="UnitedKingdom">United Kingdom 联合王国</option>
                            </Field>
                            <p>*若您的居住地没有在表上，<br/>请您电邮到
                                <a href="mailto:onlineaccount@kvbkunlun.com">
                                    onlineaccount@kvbkunlun.com</a>。</p>
                            <button className="btn btn-primary hidden-md-down" type="submit">下一步</button>
                        </div>
                        <div className="col-lg-8 col-md-7 right-wrap">
                            <Term/>
                            <button className="btn btn-primary hidden-lg-up" type="submit">下一步</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

const Term = () => (
    <section>
        <p>免责声明</p>
        <p>外汇保证金交易、差价合约交易,
            股票交易以及其他衍生工具交易涉及高风险，亏损风险可以相当巨大。投资者应谨慎考虑，并根据自身的财务状况和投资目标來评估是否合适订立任何交易。在作出该评估时，投资者也应考虑向专业顾问寻求意见。投资者在进行任何投资决定前，应仔细阅读KVB最新版本的
            <a
                href="https://www.kvbkunlun.com/download/KVB_margin/creat/KVB_Kunlun_PDS.pdf"
                target="_blank">
                产品信息披露声明
            </a>。<a
                href="https://www.kvbkunlun.com/download/KVB_margin/creat/KVB_Kunlun_PDS.pdf"
                target="_blank">
                产品信息披露声明
            </a>及<a href="https://www.kvbkunlun.com/cn/legal-documents/" target="_blank">
                投资顾问披露声明
            </a>可向KVB昆仑国际免费索取。此产品披露声明亦备案于新西兰商务部官方网站
            <a href="www.business.govt.nz/disclose" target="_blank">www.business.govt.nz/disclose</a>
        </p>
        <p>
            本网页内容提供之市场信息仅供参考，并不构成投资建议。所有数据、价格及意见均随时变更而不作另行通知。文中某些投资产品，信息和推广计划并不适于KVB昆仑国际所有公司，请与所在国家或地区的KVB昆仑国际代表作出查询。
        </p>
        <p>
            外汇保证金、差价合约, 股票交易及衍生工具是由 KVB 昆仑国际纽西兰公司提供，而您同意接受<a
                href="https://www.kvbkunlun.com/download/KVB_margin/creat/Client-Services-Agreement-individual.pdf"
                target="_blank">纽西兰客户服务协议</a>与纽西兰法律的制约。
        </p>
    </section>
);

export default CnTerm = reduxForm({form: 'location'})(CnTerm);
