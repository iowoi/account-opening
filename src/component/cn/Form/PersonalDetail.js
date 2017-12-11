import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {InputField, DateField, SelectField} from '../../Common';
import Stepper from './common/Stepper';
import asyncValidate from '../../asyncValidate';
import autoBind from 'auto-bind';
import {Link} from 'react-router-dom';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import FormHeader from './common/Header';

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

class PersonalDetail extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            show_ShareTransWithAgent: false,
            show_EmploymentStatus: true,
            selfCertificationKey: 0
        };
    }

    handleChange(e) {
        const target = e.target
        target.name === 'knowFrom' && target.value
            ? this.setState({show_ShareTransWithAgent: true})
            : this.setState({show_ShareTransWithAgent: false})
       
        if (target.name === 'employmentStatus' ){
            target.value !== 'Unemployed 无业'
            ? this.setState({show_EmploymentStatus: true})
            : this.setState({show_EmploymentStatus: false})
        }
        console.log(target.name, target.value, this.state)
    }

    handleSubmit(values) {
        console.log(values)

    }
    addSelfCertification(e) {
        e.preventDefault();
        this.setState({
            selfCertificationKey: this.state.selfCertificationKey + 1
        })
    }
    
    removeSelfCertification(){
        this.setState({
            selfCertificationKey: this.state.selfCertificationKey - 1
        })
    }
    render() {
        //console.log(this.state)
        const {handleSubmit, pristine, reset, submitting} = this.props
        const {selfCertificationKey} = this.state
        const steps = [
            {cn:"个人申请", en:"Individual Applicant"},
            {cn:"就业资料", en:"Employment Information"},
            {html:"<font class='hidden-lg-down'>Common Reporting Standard</font>普通报告标准</font> <br/> <font class='hidden-lg-down'>Individual Self-Certification</font>个人认证"},
        ]
        const SelfCertificationArr = [];
        for (var i = 0; i < this.state.selfCertificationKey; i += 1) {
            SelfCertificationArr.push(<SelfCertification id={i+1} key={i} removeSelfCertification={this.removeSelfCertification}/>);
        };

        return [
                <FormHeader steps={steps} key={0}/>,
                <div className="form-page col-md-10 col-center" key={1}>
                    <form onSubmit={this.handleSubmit}>
                        <div id="step1" className="steps">
                            <h3>Individual Applicant 个人申请</h3>
                            <p className="blue-title">Please complete all required details below. Those marked with an * are
                                mandatory.<br/>请完成所有需要的栏位。标明 * 的为必须填写。</p>

                            <div className="form-group">
                                <label>Gender 性别*</label>
                                <div className="form-check-inline">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    Male 男
                                    <Field type="radio" component="input" name="gender" value="female"/>
                                    Female 女
                                </div>
                            </div>

                            <Field
                                name="firstName"
                                component={InputField}
                                label="First Name (as shown on your proof of identity) 名称（与身份证明一致）*"/>

                            <Field
                                name="middleName"
                                component={InputField}
                                label="Middle Name (if applicable) 中间名（如适用）"/>

                            <Field
                                name="surname"
                                component={InputField}
                                label="Surname (as shown on your proof of identity) 姓氏（与身份证明一致）*"/>

                            <Field
                                name="email"
                                component={InputField}
                                label="Email Address 电子邮件 *"
                                labelInfo="It is important that you provide a valid email address for future correspondence. <br/> 请确保提供一个有效的电子邮件地址以方便之后的通讯联系"/>

                            <Field
                                name="birth"
                                component={DateField}
                                label="Date of Birth 出生日期 *"
                                labelInfo="You must be over 18 years old to trade with KVB. <br/> 您必须年满18岁才可以在KVB昆仑国际开立账户"/>

                            <Field
                                name="countryOfBirth"
                                component={SelectField}
                                label="Country of Birth 出生国家 *">
                                <option value="">-- Country --</option>
                                <Countries/>
                            </Field>

                            <Field name="nationality" component={SelectField} label="Nationality 国籍 *">
                                <option value="">-- Nationality --</option>
                                <Countries/>
                            </Field>

                            <Field
                                name="address"
                                component={InputField}
                                label="Residential Address (P.O. Box Addresses are not acceptable) 通讯地址 (邮政信箱将不予接受) *"/>

                            <Field name="city" component={InputField} label="Town/City 城镇/城市 *"/>

                            <Field name="postcode" component={InputField} label="Postcode 邮政编号"/>

                            <Field name="country" component={SelectField} label="Country or Region 国家或地区 *">
                                <option value="">-- Country --</option>
                                <Countries/>
                            </Field>

                            <div className="form-group">
                                <label className="d-block">Primary Contact Number 主要联络号码 *</label>
                                <div className="form-inline col-inputs">
                                    <Field name="contactType" component="select" className="custom-select">
                                        <option value="Work 办公室">Work 办公室</option>
                                        <option value="Home 住宅">Home 住宅</option>
                                        <option value="Mobile 手机">Mobile 手机</option>
                                    </Field>
                                    <Field
                                        name="contactCountryCode"
                                        className="form-control"
                                        placeholder="Country Code 国家码"
                                        component={InputField}/>
                                    <Field
                                        name="contactAreaCode"
                                        className="form-control"
                                        placeholder="Area Code 区码"
                                        component={InputField}/>
                                    <Field
                                        name="contactNumber"
                                        className="form-control"
                                        placeholder="Number 电话号码"
                                        component={InputField}/>
                                </div>
                            </div>

                            <Field
                                name="telPassword"
                                component={InputField}
                                label="Telephone Password 电话密码 *"
                                labelInfo="It is important that you remember your telephone password for future identification when contacting KVB. <br/> 请确保记住您的电话密码以方便之后与我们联络时的身份识别"/>

                            <Field
                                name="knowFrom"
                                component={InputField}
                                onChange={this.handleChange}
                                label="If you are referred by a service provider, please specify the service provider number 如您由代理介绍开户, 烦请填写代理号码"/> {this.state.show_ShareTransWithAgent
                                ? <ShareTransWithAgent/>
                                : null}

                            
                        </div>
                        <hr/> {/* ======================= Form Two ======================= */}
                        <div id="step2" className="steps">
                            <h3>Employment Information 就业资料</h3>

                            <Field
                                name="employmentStatus"
                                component={SelectField}
                                onChange={this.handleChange}
                                label="Employment Status 就业情况 *">
                                <option value="Employed 受雇">Employed 受雇</option>
                                <option value="Self-employed 自雇">Self-employed 自雇</option>
                                <option value="Retired 退休">Retired 退休</option>
                                <option value="Unemployed 无业">Unemployed 无业</option>
                            </Field>

                            {this.state.show_EmploymentStatus
                                ? <EmploymentStatus/>
                                : null}

                            <hr/> {/* ======================= Form Four ======================= */}

                            <label className="d-block">Are you a citizen or a tax resident of the United States of America?
                                <br/>
                                您是否是美国公民或纳税居民？
                            </label>
                            <div className="form-check-inline">
                                <Field
                                    type="radio"
                                    component="input"
                                    onChange={this.handleChange}
                                    name="isUSA"
                                    value="Yes"/>
                                Yes 是
                                <Field
                                    type="radio"
                                    component="input"
                                    onChange={this.handleChange}
                                    name="isUSA"
                                    value="No"/>
                                No 否
                            </div>

                            <label className="d-block">Are you born in the U.S. (or a U.S. territory) but am
                                no longer a U.S. citizen as you have voluntarily surrendered your citizenship?
                                <br/>
                                您是否出生於美国 (或美国领土)，但本人以自愿放弃美国国籍，不在是美国公民？

                            </label>
                            <div className="form-check-inline">
                                <Field
                                    type="radio"
                                    component="input"
                                    onChange={this.handleChange}
                                    name="bornInUSA"
                                    value="Yes"/>
                                Yes 是
                                <Field
                                    type="radio"
                                    component="input"
                                    onChange={this.handleChange}
                                    name="bornInUSA"
                                    value="No"/>
                                No 否
                            </div>
                        </div>
                        <hr/> {/* ======================= Section Five ======================= */}
                        <div id="step3" className="steps">
                        <h3>Common Reporting Standard 普通报告标准
                            <br/>Individual Self-Certification 个人认证</h3>
                        <SelfCertification id="0"/>
                        {SelfCertificationArr}
                        <p>You can be a tax resident of more than one country. If you are a tax resident
                            of another jurisdiction/country<br/>
                            您可以是不止一个国家的税务居民。 如果您是其他管辖区/国家的税务居民，请点击更多
                        </p>
                        {selfCertificationKey === 3 ? null : <button
                            onClick={this.addSelfCertification}
                            className="btn btn-white">
                            More 更多
                        </button>}
                        
                        
                        </div>
                       
                        {/* <button type="submit" className="btn btn-primary">
                            下一步 >
                        </button> */}
                        <div className=" text-center">
                            <Link to="account-information" className="btn btn-primary">下一步 >
                        </Link>
                        </div>
                        
                    </form>
                </div>
        ]
    }
}

class ShareTransWithAgent extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            disabled_standadLot: 0,
        };
    }
    handleChange(e) {
        const target = e.target
        if (target.name === 'standadLotRadio') {
            this.setState({disabled_standadLot: target.value})
        }
    }
    render() {
        const {disabled_standadLot} = this.state
        
        return (
            <div className="expend">
                <div className="form-group">
                    <label>Do you agree to authorise the disclosure of account information
                        (transaction records, funds in and funds out) to your Referring Party?
                        <br/>你是否同意授权KVB披露您的帐户信息（交易记录，出入金）给您的代理人？
                    </label>
                    <div>
                        <Field
                            type="radio"
                            component="input"
                            name="shareTransWithAgent"
                            checked
                            value="0"/>
                        Yes I agree please proceed 是的，我同意，请继续
                        <br/>
                        <Field type="radio" component="input" name="shareTransWithAgent" value="1"/>
                        No, I don't agree 不，我不同意
                    </div>
                </div>
                <hr/>

                <h3>Charges Schedule 费用表</h3>

                <p>KVB Kunlun New Zealand Limited fees and charges as agreed and acknowledged by
                    the client are as follows: 客户同意并确认KVB昆仑新西兰有限公司的费用如下：</p>
                <label className="d-block">Commission per standard lot 每手标准手数佣金 (如果不加佣金，请留空)
                </label>
                <div className="form-inline">
                    <Field
                        type="radio"
                        component="input"
                        onChange={this.handleChange}
                        name="standadLotRadio"
                        value="0"/>
                    <Field
                        name="standadLot"
                        component={InputField}
                        onChange={this.handleChange}
                        disabled={disabled_standadLot != 0
                        ? true
                        : false}/>
                </div>
                <div className="form-inline">
                    <Field
                        type="radio"
                        component="input"
                        onChange={this.handleChange}
                        name="standadLotRadio"
                        value="1"/>
                    <Field
                        name="standadLot"
                        component={InputField}
                        onChange={this.handleChange}
                        disabled={disabled_standadLot != 1
                        ? true
                        : false}/>
                    %
                </div>
            </div>
        );
    }
}

class SeniorInfo extends Component {
    render() {
        return (
            <div className="senior-expend">
                <div className="form-group">
                    <label className="d-block">Please complete the details below. KVB cannot process an account application
                        without these questions being answered.<br/>
                        请填写以下信息，如以下信息不完整KVB将无法处理您的开户申请：
                    </label>

                    <small className="mt-2">Name of Director/Senior Management /Prescribed Person/PEP <br/> 董事/高级管理人员/“特定人员”/政治公众人物姓名"
                    </small>
                    <Field
                        name="senior"
                        className="form-control"
                        component={InputField}/>
                    <small>Name of entity listed on Recognized Securities Exchange/Employer/Political Position Held <br/> 上市公司名称/相关公司或企业名称/现任职位"
                    </small>
                    <Field
                        name="position"
                        className="form-control"
                        component={InputField}/>
                </div>
            </div>
        );
    }
}

class SelfCertification extends Component {
    constructor(props){
        super(props);
        autoBind(this);
        this.state = {
            haveTIN: true,
            expendStyle: props.id % 2 === 0
        }
    }
    handleChange(e) {
        const target = e.target
        target.name.indexOf('haveTIN') != -1 && target.value === 'Yes'
            ? this.setState({haveTIN: true})
            : this.setState({haveTIN: false})
    }
    render() {
        const {removeSelfCertification,id} = this.props
        const {haveTIN,expendStyle} = this.state
        return (
            <div className={!expendStyle?"expend":null}>
                {id != 0?
                    <a href="javascript:void(0);" className="pull-right" onClick={removeSelfCertification}>
                        <span className="glyphicon red glyphicon-remove" aria-hidden="true"></span>
                    </a>
                :null}

                <Field name={`taxResidentCountries[${id}]`} 
                    label="Which country or countries are you a tax resident? 您是哪个或哪些国家的税务居民？*"
                    labelInfo="(Please notify KVB if there is any material change in circumstances. 如果有任何情况发生改变，请通知KVB)"
                    component={SelectField}>
                    <option value="">-- Tax Resident Country --</option>
                    <Countries/>
                </Field>
                
                <label className="mt-4">Please provide your Taxpayer Identification Number (TIN). 请提供您的纳税人识别号码 (TIN) </label>
                <small className="d-block">(For account holder who is tax resident of China, the TIN is the China National Identity Card Number. 对于中国税务居民的账户持有人，TIN号码就是中国的居民身份证号码)</small>
                <Field name={`haveTIN${id}`} type="radio" component="input" value="Yes" onChange={this.handleChange} checked={haveTIN}/>
                <label>I do have TIN</label>
                <Field name="taxPayerIdentificationNumber" component={InputField} disabled={!haveTIN}/>
                <Field name={`haveTIN${id}`} type="radio" component="input" value="No" onChange={this.handleChange}/>
                <label>I do not have TIN</label>
                <p>If a TIN is unavailable, provide the appropriate reason: 如果您没有TIN号码，请提供适当的理由</p>
                <Field name="taxResidentCountries" component="select" className="mt-0 custom-select" disabled={haveTIN} >
                    <option value="">-- Reason --</option>
                    <option value="A: 账户持有人是在不发放TIN号码给其居民的管辖权地域作为税务居民">A: The jurisdiction where the
                        account holder is a resident for tax purposes does not issue TINs to its
                        residents. 账户持有人是在不发放TIN号码给其居民的管辖权地域作为税务居民。</option>
                    <option value="B: 账户持有人无法获得TIN，请说明原因">B: The account holder is unable to obtain
                        a TIN. Please explain the reason: 账户持有人无法获得TIN，请说明原因</option>
                    <option value="C: 不需要TIN。只有当您居住地管辖权不要求披露TIN时,才选择这个理由">C: TIN is not required.
                        Select this reason only if the authorities of the jurisdiction of residence do
                        not require the TIN to be disclosed. 不需要TIN。只有当您居住地管辖权不要求披露TIN时,才选择这个理由。</option>
                </Field>

                <hr/>
            </div>
        )
    }
}

class EmploymentStatus extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            show_SeniorInfo: false
        };
    }

    handleChange(e) {
        const target = e.target
        target.name === 'isSenior' && target.value === 'Yes'
            ? this.setState({show_SeniorInfo: true})
            : this.setState({show_SeniorInfo: false})
    }

    render() {
        return (
            <div>
                <Field name="companyName" component={InputField} label="Company Name 公司名称 *"/>

                <Field name="natureOfBusiness"
                    component={SelectField}
                    label="Nature of Business 业务性质 *">
                    <option value="">-- Nature of Business --</option>
                    <option value="Accountancy -- 会计">Accountancy -- 会计</option>
                    <option value="Admin/Secretarial -- 行政/文秘">Admin/Secretarial -- 行政/文秘</option>
                    <option value="Agricultural -- 农业">Agricultural -- 农业</option>
                    <option value="Antique/Art Dealing -- 古玩/工艺品交易">Antique/Art Dealing -- 古玩/工艺品交易</option>
                    <option value="Bullion/Precious Metal/Jewellery Dealing -- 金制品/贵金属/珠宝交易">Bullion/Precious Metal/Jewellery Dealing -- 金制品/贵金属/珠宝交易</option>
                    <option value="Catering/Hospitality -- 餐饮/服务招待">Catering/Hospitality -- 餐饮/服务招待</option>
                    <option value="Construction -- 建筑业">Construction -- 建筑业</option>
                    <option value="Defence/Military -- 国防/军事">Defence/Military -- 国防/军事</option>
                    <option value="Education -- 教育">Education -- 教育</option>
                    <option value="Emergency/Health Services -- 急救/健康服务">Emergency/Health Services -- 急救/健康服务</option>
                    <option value="Engineering/Technology -- 工程/技术">Engineering/Technology -- 工程/技术</option>
                    <option value="Export/Import/Trade -- 进出口贸易">Export/Import/Trade -- 进出口贸易</option>
                    <option value="Financial Services-Foreign Exchange -- 金融服务-外汇">Financial Services-Foreign Exchange -- 金融服务-外汇</option>
                    <option value="Financial Services-Other -- 金融服务-其他">Financial Services-Other -- 金融服务-其他</option>
                    <option value="Government/Public Sector -- 政府/公共事业">Government/Public Sector -- 政府/公共事业</option>
                    <option value="Legal/Conveyancing -- 法律/不动产转让">Legal/Conveyancing -- 法律/不动产转让</option>
                    <option value="Leisure/Entertainment/Tourism -- 休闲/娱乐/旅游">Leisure/Entertainment/Tourism -- 休闲/娱乐/旅游</option>
                    <option value="Manufacturing -- 制造业">Manufacturing -- 制造业</option>
                    <option value="Marketing/Media/PR/Advertising -- 市场营销/媒体/公关/广告">Marketing/Media/PR/Advertising -- 市场营销/媒体/公关/广告</option>
                    <option value="Motor Vehicle/Boat Dealing -- 汽车及船舶交易">Motor Vehicle/Boat Dealing -- 汽车及船舶交易</option>
                    <option value="Not for Profit/Charity/Religious organisation -- 非盈利组织/慈善机构/宗教组织">Not for Profit/Charity/Religious organisation -- 非盈利组织/慈善机构/宗教组织</option>
                    <option value="Pharmaceuticals/Medicine -- 制药/医药">Pharmaceuticals/Medicine -- 制药/医药</option>
                    <option value="Real Estate/Property -- 房地产/物业">Real Estate/Property -- 房地产/物业</option>
                    <option value="Retail -- 零售">Retail -- 零售</option>
                    <option value="Telecommunications -- 通信">Telecommunications -- 通信</option>
                    <option value="Transport/Logistics -- 运输/物流">Transport/Logistics -- 运输/物流</option>
                    <option value="Other -- 其它">Other -- 其它</option>
                </Field>

                <label>Are you a Director/Senior Management of a public listed company in any
                    recognised security exchange, a Prescribed Person, or a Politically Exposed
                    Person (PEP)
                    <br/>
                    您是否是交易所所在地上市公司的董事成员或高级管理人员，或 "特定人员" 或 政治公众人物 ？
                </label>
                <div className="form-check-inline">
                    <Field
                        type="radio"
                        component="input"
                        onChange={this.handleChange}
                        name="isSenior"
                        value="Yes"/>
                    Yes 是
                    <Field
                        type="radio"
                        component="input"
                        onChange={this.handleChange}
                        name="isSenior"
                        value="No"/>
                    No 否
                </div>
                {this.state.show_SeniorInfo
                    ? <SeniorInfo/>
                    : null}
            </div>
        );
    }
}


class Countries extends Component {
    render() {
        return (
            [
                <option value="Argentina" key="0">Argentina 阿根廷</option>,
                <option value="Australia" key="1">Australia 澳大利亚</option>,
                <option value="Austria" key="2">Austria 奥地利</option>,
                <option value="Belgium" key="3">Belgium 比利时</option>,
                <option value="Brazil" key="4">Brazil 巴西</option>,
                <option value="Canada" key="5">Canada 加拿大</option>,
                <option value="China" key="6">China 中国</option>,
                <option value="Denmark" key="7">Denmark 丹麦</option>,
                <option value="Finland" key="8">Finland 芬兰</option>,
                <option value="France" key="9">France 法国</option>,
                <option value="Germany" key="10">Germany 德国</option>,
                <option value="Greece" key="11">Greece 希腊</option>,
                <option value="HK" key="12">Hong Kong, China 中国香港</option>,
                <option value="Iceland" key="13">Iceland 冰岛</option>,
                <option value="India" key="14">India 印度</option>,
                <option value="Ireland" key="15">Ireland 爱尔兰</option>,
                <option value="Italy" key="16">Italy 意大利</option>,
                <option value="Japan" key="17">Japan 日本</option>,
                <option value="Netherlands" key="18">Kingdom of the Netherlands 荷兰</option>,
                <option value="Luxembourg" key="19">Luxembourg 卢森堡</option>,
                <option value="Macau" key="20">Macau, China 中国澳门</option>,
                <option value="Malaysia" key="21">Malaysia 馬來西亞</option>,
                <option value="Mexico" key="22">Mexico 墨西哥</option>,
                <option value="NewZealand" key="23">New Zealand 新西兰</option>,
                <option value="Norway" key="24">Norway 挪威</option>,
                <option value="Portugal" key="25">Portugal 葡萄牙</option>,
                <option value="Korea" key="26">Republic of Korea 韩国</option>,
                <option value="RussianFederation" key="27">Russian Federation 俄罗斯联邦</option>,
                <option value="Singapore" key="28">Singapore 新加坡</option>,
                <option value="SouthAfrica" key="29">South Africa 南非</option>,
                <option value="Spain" key="30">Spain 西班牙</option>,
                <option value="Sweden" key="31">Sweden 瑞典</option>,
                <option value="Switzerland" key="32">Switzerland 瑞士</option>,
                <option value="Taiwan" key="33">Taiwan 台灣</option>,
                <option value="Turkey" key="34">Turkey 土耳其</option>,
                <option value="UnitedKingdom" key="35">United Kingdom 联合王国</option>
            ]
        );
    }
}

PersonalDetail = reduxForm({
    form: 'PersonalDetail', validate
    // , asyncValidate
})(PersonalDetail)

export default PersonalDetail;