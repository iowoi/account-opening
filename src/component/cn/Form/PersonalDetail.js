import React, {Component} from 'react';
import {InputField, DateField, SelectField, LocationOption, CreateOptions} from '../../Common';
import Stepper from './common/Stepper';
import autoBind from 'auto-bind';
import FormHeader from './common/Header';
import {Field, reduxForm} from 'redux-form';

function validate(values){
    const errors = {}
    const requiredFields = [
        'GendersId',
        'TitleTypesId',
        'FirstName',
        'Surname',
        'Email',
        'Birthday',
        'BirthCountryId',
        'NationalityId',
        'ResidentialAddress',
        'City',
        'CountryId',
        'MailingAddress',
        'ContactTypesId',
        'contactCountryCode',
        'ContactNumber',
        'TelephonePassword',
        'MaritalStatusId',
        'NumberOfDependents',
        'TypeOfIdentificationId',
        'IdentificationNumber',

        'NameOfBank',
        'BankAddress',
        'BSB',
        'BankAccountNumber',
        'BankCurrencyId',
        'BankAccountHolderName',
        'SwiftCode',

        'EmploymentStatusesId',
        'CompanyName',
        'Occupation',
        'BusinessTypesId',
        'EmployerCountry',
        'EmployerCity',
        'EmployerProvince',
        'EmployerPostalCode',
        'EmployerStreet1',
        'EmployerStreet2',
        'CitizenOrTaxResidentOfUSAId',
        'BornInUSAAndSurrenderedCitizenshipId',
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
// const validate = values => {
    
// }

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
        target.name === 'ServiceProviderNumber' && target.value
            ? this.setState({show_ShareTransWithAgent: true})
            : this.setState({show_ShareTransWithAgent: false})
       
        if (target.name === 'EmploymentStatuses' ){
            target.value !== '4' // Unemployed 无业
            ? this.setState({show_EmploymentStatus: true})
            : this.setState({show_EmploymentStatus: false})
        }
      //  console.log(target.name, target.value, this.state)
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
    handleNextPage(e){
        this.props.handleRenderPage(this.props.nextPage);
    }
    
    render() {
        
        //console.log(this.state)
        const {pristine, reset, source, style, submitting,handleSubmit} = this.props
        const {selfCertificationKey} = this.state
        const steps = [
            {cn:"个人申请", en:"Individual Applicant"},
            {cn:"银行帐户资料", en:"Settlement details"},
            {cn:"就业资料", en:"Employment Information"},
            {html:"<font className='hidden-lg-down'>Common Reporting Standard</font>普通报告标准</font> <br/> <font className='hidden-lg-down'>Individual Self-Certification</font>个人认证"},
        ]
        const SelfCertificationArr = [];
        for (var i = 0; i < this.state.selfCertificationKey; i += 1) {
            SelfCertificationArr.push(<SelfCertification id={i+1}  source={source} key={i} removeSelfCertification={this.removeSelfCertification}/>);
        };
        return (
            <div style={style}>
                <form onSubmit={handleSubmit(this.handleNextPage)}>
                <FormHeader steps={steps}/>
                <div className="form-page col-md-10 col-center" >
                        <div className="steps" id="0" >
                            <h3>Individual Applicant 个人申请</h3>
                            <p className="blue-title">Please complete all required details below. Those marked with an * are mandatory.<br/>请完成所有需要的栏位。标明 * 的为必须填写。</p>

                            <div className="form-group">
                                <label>Gender 性别*</label>
                                <div className="form-check-inline">
                                    <Field type="radio" component="input" name="GendersId" value="1"/>
                                    Male 男
                                    <Field type="radio" component="input" name="GendersId" value="2"/>
                                    Female 女
                                </div>
                            </div>

                            <Field
                                name="TitleTypesId"
                                component={SelectField}
                                onChange={this.handleChange}
                                label="Title 称谓*">
                                {source && CreateOptions(source.Title)}
                            </Field>

                            <Field
                                name="FirstName"
                                component={InputField}
                                label="First Name (as shown on your proof of identity) 名称（与身份证明一致）*"/>

                            <Field
                                name="MiddleName"
                                component={InputField}
                                label="Middle Name (if applicable) 中间名（如适用）"/>

                            <Field
                                name="Surname"
                                component={InputField}
                                label="Surname (as shown on your proof of identity) 姓氏（与身份证明一致）*"/>

                            <Field
                                name="Email"
                                component={InputField}
                                label="Email Address 电子邮件 *"
                                labelInfo="It is important that you provide a valid email address for future correspondence. <br/> 请确保提供一个有效的电子邮件地址以方便之后的通讯联系"/>

                            <Field
                                name="Birthday"
                                component={DateField}
                                label="Date of Birth 出生日期 *"
                                labelInfo="You must be over 18 years old to trade with KVB. <br/> 您必须年满18岁才可以在KVB昆仑国际开立账户"/>
                            
                            <LocationOption component={SelectField} label="Country of Birth 出生国家 *" name="BirthCountryId">
                                <option value="">-- Country --</option>
                            </LocationOption>

                            <LocationOption component={SelectField} label="Nationality 国籍 *" name="NationalityId">
                                <option value="">-- Nationality --</option>
                            </LocationOption>

                            <Field
                                name="ResidentialAddress"
                                component={InputField}
                                label="Residential Address (P.O. Box Addresses are not acceptable) 通讯地址 (邮政信箱将不予接受) *"/>

                            <Field name="City" component={InputField} label="Town/City 城镇/城市 *"/>

                            <Field name="Postcode" component={InputField} label="Postcode 邮政编号"/>

                            <LocationOption component={SelectField} label="Country or Region 国家或地区 *" name="CountryId">
                                <option value="">-- Country --</option>
                            </LocationOption>

                            <div className="form-group">
                                <label>Mailing address 邮寄地址 *</label>
                                <small>Is your mailing address different from the address provided above? 您的邮寄地址是否与居住地址不同?</small>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="SameAddress" value="yes"/>
                                    Yes 是
                                    <Field type="text" className="ml-4" component="input" name="MailingAddress"/>
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="SameAddress" value="no"/>
                                    No 否
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="d-block">Primary Contact Number 主要联络号码 *</label>
                                <div className="form-inline col-inputs">
                                    <Field name="ContactTypesId" component="select" className="custom-select">
                                        <option value="1">Work 办公室</option>
                                        <option value="2">Home 住宅</option>
                                        <option value="3">Mobile 手机</option>
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
                                        name="ContactNumber"
                                        className="form-control"
                                        placeholder="Number 电话号码"
                                        component={InputField}/>
                                </div>
                            </div>

                            <Field
                                name="TelephonePassword"
                                component={InputField}
                                label="Telephone Password 电话密码 *"
                                labelInfo="It is important that you remember your telephone password for future identification when contacting KVB. <br/> 请确保记住您的电话密码以方便之后与我们联络时的身份识别"/>

                            <Field
                                name="MaritalStatusId"
                                component={SelectField}
                                onChange={this.handleChange}
                                label="Marital Status 婚姻状况 *">
                                {source && CreateOptions(source.MaritalStatus)
                                }
                            </Field>

                            <Field
                                name="NumberOfDependents"
                                className="form-control"
                                label="Number of dependents 家属人数 *"
                                component={InputField}/>

                            <Field
                                name="TypeOfIdentificationId"
                                component={SelectField}
                                onChange={this.handleChange}
                                label="Type of identification 身份证明文件类别 *">
                                {source && CreateOptions(source.TypeOfIdentification)
                                }
                            </Field>

                            <Field
                                name="IdentificationNumber"
                                className="form-control"
                                label="Identification Number 身份证明文件号码 *"
                                component={InputField}/>

                            <Field
                                name="ServiceProviderNumber"
                                component={InputField}
                                onChange={this.handleChange}
                                label="If you are referred by a service provider, please specify the service provider number 如您由代理介绍开户, 烦请填写代理号码"/> {this.state.show_ShareTransWithAgent
                                ? <ShareTransWithAgent/>
                                : null}
                            
                        </div>
                        <hr/> {/* ======================= Form Two ======================= */}
                        <div className="steps" id="1">
                            <h3>Settlement details 银行帐户资料</h3>

                            <Field name="NameOfBank" component={InputField} label="Name of bank 银行名称 *"/>
                
                            <Field name="BankAddress" component={InputField} label="Bank address 银行地址 *"/>

                            <Field name="BSB" component={InputField} label="BSB 区域代码 *"/>

                            <Field name="BankAccountNumber" component={InputField} label="Account number 银行帐号"/>
                          
                            <Field name="BankCurrencyId" component={InputField} label="Currency 货币 "/>

                            <Field name="BankAccountHolderName" component={InputField} label="Account holder’s name 银行帐户名"/>

                            <Field name="SwiftCode" component={InputField} label="SWIFT code国际汇款代码"/>
                
                        </div>
                        <hr/> {/* ======================= Section Five ======================= */}
                        <div className="steps" id="2">
                            <h3>Employment Information 就业资料</h3>
                        
                            <Field
                                name="EmploymentStatusesId"
                                component={SelectField}
                                onChange={this.handleChange}
                                label="Employment Status 就业情况 *">
                                {source && CreateOptions(source.EmploymentStatuses)
                                }
                            </Field>
                           
                            {this.state.show_EmploymentStatus
                                ? <EmploymentStatus source={source}/>
                                : null}

                            <hr/> {/* ======================= Form Four ======================= */}

                            <label className="d-block">Are you a citizen or a tax resident of the United States of America? *
                                <br/>
                                您是否是美国公民或纳税居民？ *
                            </label>
                            <div className="form-check-inline">
                                <Field
                                    type="radio"
                                    component="input"
                                    onChange={this.handleChange}
                                    name="CitizenOrTaxResidentOfUSAId"
                                    value="0"/>
                                Yes 是
                                <Field
                                    type="radio"
                                    component="input"
                                    onChange={this.handleChange}
                                    name="CitizenOrTaxResidentOfUSAId"
                                    value="1"/>
                                No 否
                            </div>

                            <label className="d-block">Are you born in the U.S. (or a U.S. territory) but am
                                no longer a U.S. citizen as you have voluntarily surrendered your citizenship? *
                                <br/>
                                您是否出生於美国 (或美国领土)，但本人以自愿放弃美国国籍，不在是美国公民？ *
                            </label>
                            <div className="form-check-inline">
                                <Field
                                    type="radio"
                                    component="input"
                                    onChange={this.handleChange}
                                    name="BornInUSAAndSurrenderedCitizenshipId"
                                    value="0"/>
                                Yes 是
                                <Field
                                    type="radio"
                                    component="input"
                                    onChange={this.handleChange}
                                    name="BornInUSAAndSurrenderedCitizenshipId"
                                    value="1"/>
                                No 否
                            </div>
                        </div>
                        <hr/> {/* ======================= Section Five ======================= */}
                       
                        <div className="steps last-step" id="3">
                            <h3>Common Reporting Standard 普通报告标准
                                <br/>Individual Self-Certification 个人认证</h3>
                            <SelfCertification id="0" source={source}/>
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
                       
                        <div className="text-center">
                            <button type="submit" disabled={submitting} className="btn btn-primary">下一步 ></button> 
                        </div>
                </div>
                </form>
            </div>
               
        )
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
                            name="AgreeDisclosureInfoToServiceProviderId"
                            checked
                            value="1"/>
                        Yes I agree please proceed 是的，我同意，请继续
                        <br/>
                        <Field type="radio" component="input" name="AgreeDisclosureInfoToServiceProviderId" value="2"/>
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
                        name="CommissionPerStandardLot"
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
                        name="CommissionPerStandardLot"
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
                        name="NameOfDirector"
                        className="form-control"
                        component={InputField}/>
                    <small>Name of entity listed on Recognized Securities Exchange/Employer/Political Position Held <br/> 上市公司名称/相关公司或企业名称/现任职位"
                    </small>
                    <Field
                        name="NameOfEntity"
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
            fillReason: false,
            expendStyle: props.id % 2 === 0
        }
    }
    handleChange(e) {
        const target = e.target
        target.name.indexOf('haveTIN') != -1 && target.value === 'Yes'
            ? this.setState({haveTIN: true})
            : this.setState({haveTIN: false})
         target.name.indexOf('TinUnavailableTypesId') != -1 && target.value === '2'
            ? this.setState({fillReason: true})
            : this.setState({fillReason: false})
         
    }
    render() {
        const {removeSelfCertification,id,source} = this.props
        const {haveTIN,expendStyle,fillReason} = this.state
        return (
            <div className={!expendStyle?"expend":null}>
                {id != 0?
                    <a href="javascript:void(0);" className="pull-right" onClick={removeSelfCertification}>
                        <span className="glyphicon red glyphicon-remove" aria-hidden="true"></span>
                    </a>
                :null}

               
                <LocationOption name={`Tax[${id}].CountryCodesId`} 
                    label="Which country or countries are you a tax resident? 您是哪个或哪些国家的税务居民？*"
                    labelInfo="(Please notify KVB if there is any material change in circumstances. 如果有任何情况发生改变，请通知KVB)"
                    component={SelectField}>
                    <option value="">-- Tax Resident Country --</option>
                </LocationOption>

                <label className="mt-4">Please provide your Taxpayer Identification Number (TIN). 请提供您的纳税人识别号码 (TIN) </label>
                <small className="d-block">(For account holder who is tax resident of China, the TIN is the China National Identity Card Number. 对于中国税务居民的账户持有人，TIN号码就是中国的居民身份证号码)</small>
                <Field name={`haveTIN${id}`} type="radio" component="input" value="Yes" onChange={this.handleChange} checked={haveTIN}/>
                <label>I do have TIN</label>
                <Field name={`Tax[${id}].TaxpayerIdentificationNumber`}component={InputField} disabled={!haveTIN}/>
                <Field name={`haveTIN${id}`} type="radio" component="input" value="No" onChange={this.handleChange}/>
                <label>I do not have TIN</label>
                <p>If a TIN is unavailable, provide the appropriate reason: 如果您没有TIN号码，请提供适当的理由</p>
                <Field 
                name={`Tax[${id}].TinUnavailableTypesId`} component="select" className="mt-0 custom-select" onChange={this.handleChange} disabled={haveTIN} >
                    <option value="">-- Reason --</option>
                    {source && CreateOptions(source.TinUnavailableTypes)}
                </Field>
                {fillReason ? <Field
                                name={`Tax[${id}].TinUnavailableReason`} 
                                component={InputField}
                                label="The account holder is unable to obtain a TIN. Please explain the reason: 账户持有人无法获得TIN，请说明原因"/>:null}
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
        const {source} = this.props
        return (
            <div>
                <Field name="CompanyName" component={InputField} label="Company Name 公司名称 *"/>
               
                <Field name="Occupation" component={InputField} label="Occupation 职业 *"/>

                <Field
                    name="BusinessTypesId"
                    component={SelectField}
                    onChange={this.handleChange}
                    label="Nature of Business 业务性质 *">
                    <option value="">-- Nature of Business --</option>
                    {source && CreateOptions(source.BusinessTypes)}
                </Field>

                <LocationOption component={SelectField} label="Employer Country or Region 就业国家或地区 *" name="EmployerCountry">
                    <option value="">-- Country --</option>
                </LocationOption>

                <Field name="EmployerCity" component={InputField} label="Employer Town/City 就业城镇/城市 *"/>
                
                <Field name="EmployerProvince" component={InputField} label="Employer Province 就业省份 *"/>

                <Field name="EmployerPostalCode" component={InputField} label="Employer Postcode 就业地区邮政编号 *"/>

                <Field name="EmployerStreet1" component={InputField} label="Employer Street#1 公司地址#1"/>

                <Field name="EmployerStreet2" component={InputField} label="Employer Street#2 公司地址#2"/>
                
                <hr/>
                <label>Source Of Income 收入来源</label>
                <SourceOfIncome source={source}/>
                <hr/>
                
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
class SourceOfIncome extends Component {
    render (){
        const {source} = this.props
        const DataRow = [];

        source && source.SourceOfIncome.map((data,index)=>{
            DataRow.push( 
                <tr key={index}>
                    <td width="20"> 
                        <Field name={`SourceOfIncome[${index}].SourceOfIncomeId`} component="input" className="checkbox" type="checkbox"/> 
                    </td> 
                    <td width="150"> 
                        {data.TitleCn}  {data.TitleEn}
                    </td>
                    <td width="50"> 
                        <Field name={`SourceOfIncome[${index}].SourceOfIncomePercent`} component="input"/> % 
                    </td> 
                    <td width="59%"> 
                        <Field name={`SourceOfIncome[${index}].SourceOfIncomeDescription`} component="input"/> 
                    </td> 
                </tr>
            )
        })
        
        return(
            <table width="100%">
                <thead>
                    <tr>
                        <td> - </td>
                        <td>Source of Income</td>
                        <td>Percent of <br/>annual income</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody id="dspSourceOfIncomeList">
                   {DataRow}
                </tbody>
            </table>
        )
    }
}




PersonalDetail = reduxForm({
    form: 'PersonalDetail',
    validate
    // , asyncValidate
})(PersonalDetail)

  
export default PersonalDetail;