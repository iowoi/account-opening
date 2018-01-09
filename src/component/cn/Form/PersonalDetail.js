import React, {Component} from 'react';
import {InputField, DateField, SelectField, LocationOption, CreateOptions} from '../../Common';
import autoBind from 'react-autobind';
import {Field, reduxForm} from 'redux-form';
import $ from 'jquery';
import moment from 'moment';
import DialogBox from '../../Common/Dialog';
import {ServiceInfoCN, ServiceInfoEN} from '../../Common/AlertText';

let requiredFields = [
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
	'MaritalStatusId',
	'NumberOfDependents',
	'TypeOfIdentificationId',
	'IdentificationNumber',
	'NameOfBank',
	'BankAddress',
	'BankAccountNumber',
	'BankCurrencyId',
	'BankAccountHolderName',
	'EmploymentStatusesId',
	'CompanyName',
	'Occupation',
	'BusinessTypesId',
	'EmployerCountry',
	'EmployerCity',
	'EmployerProvince',
	'EmployerStreet1',
	'CitizenOrTaxResidentOfUSAId',
	'BornInUSAAndSurrenderedCitizenshipId'
];
const EmployRequiredFields = [
	'CompanyName',
	'Occupation',
	'BusinessTypesId',
	'EmployerCountry',
	'EmployerCity',
	'EmployerProvince',
	'EmployerStreet1'
];
const PrescribedRequiredFields = ['NameOfDirector', 'NameOfEntity'];
function validate(values) {
	const errors = {};
	const isCN = WEB_LANG('cn');

	const regCn = new RegExp('^[\\u4e00-\\u9fa5]+$');

	const regen = new RegExp('^[a-zA-Z ]+$');
	const regNumEnHype = new RegExp('^[\\da-zA-Z -]+$');
	const regEnCn = new RegExp('^[ a-zA-Z\\u4e00-\\u9fa5]+$');
	const regEnNum = new RegExp('^[\\da-zA-Z]+$');
	const regNum = new RegExp('^[\\d]+$');
	const birthdayValid = moment(values.Birthday, ['dd/MM/YYYY'], true).isValid();
	const regSymbol = new RegExp('^[ a-zA-Z\\u4e00-\\u9fa5\\d]+$');

	const errorType = {
		requiredField: isCN
			? 'Required 必填栏位'
			: 'Required',
		containsSymbol: isCN
			? '不可輸入符號'
			: 'Can not enter symbol'
	};

	requiredFields.map((field) => {
		if (!values[field]) {
			errors[field] = errorType.requiredField;
		}
	});

	const allowEnAndCn = [
		'FirstName',
		'MiddleName',
		'Surname',
		'NameOfDirector',
		'NameOfEntity',
		'BankAccountHolderName'
	];
	const allowEn = [
		'FirstName',
		'MiddleName',
		'Surname',
		'NameOfDirector',
		'NameOfEntity',
		'BankAccountHolderName',
		'EmployerCity',
		'Occupation',
		'BusinessTypesOthers',
		'EmployerProvince'
	];
	const allowEnDigitsSpace = ['CompanyName', 'NameOfBank', 'BSB'];
	const allowEnAndSymbol = ['BankAddress', 'EmployerStreet1', 'EmployerStreet2'];
	const allowDigits = ['contactCountryCode', 'contactAreaCode', 'ContactNumber', 'NumberOfDependents'];
	const allowEnAndDigits = ['ServiceProviderNumber', 'SwiftCode', 'BankAccountNumber', 'IdentificationNumber'];

	if (isCN) {
		allowEnAndCn.map((field) => {
			if (values[field] && !regEnCn.test(values[field])) {
				errors[field] = isCN
					? '只能输入英文或中文'
					: 'Only enter English and Chinese';
			}
		});
	} else {
		allowEn.map((field) => {
			if (values[field] && !regen.test(values[field])) {
				errors[field] = 'Only enter English';
			}
		});
		allowEnDigitsSpace.map((field) => {
			if (values[field] && !regNumEnHype.test(values[field])) {
				errors[field] = 'Only allow English, numbers and Space';
			}
		});
		allowEnAndSymbol.map((field) => {
			if (values[field] && regCn.test(values[field])) {
				errors[field] = 'Only allow English, number, punctuation marks and space';
			}
		});
	}
	allowDigits.map((field) => {
		if (values[field] && !regNum.test(values[field])) {
			errors[field] = isCN
				? '只能输入数字'
				: 'Only enter numbers';
		}
	});
	allowEnAndDigits.map((field) => {
		if (values[field] && !regNumEnHype.test(values[field])) {
			errors[field] = isCN
				? '只能输入英文或数字'
				: 'Only enter English or numbers';
		}
	});

	if (values.BankCurrencyOthers && !regSymbol.test(values.BankCurrencyOthers)) {
		errors.BankCurrencyOthers = errorType.containsSymbol;
	}

	if (values.Email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
		errors.Email = isCN
			? '邮箱格式错误'
			: 'Invalid email address';
	}

	if (values.Birthday) {
		const age = moment().diff(values.Birthday, 'years');
		if (age < 18) {
			errors.Birthday = isCN
				? '必须大于18岁'
				: 'Must > 18 years old';
		}
		if (!birthdayValid) {
			errors.Birthday = isCN
				? '生日格式错误'
				: 'Invalid Birthday ';
		}
	}

	if (values.Tax) {
		errors.Tax = [{}, {}, {}, {}];
		values
			.Tax
			.map((data, index) => {
				//console.log(index,'>>>>',data,values.Tax)

				if (!data.CountryCodesId) {
					errors.Tax[index].CountryCodesId = errorType.requiredField;
				} else if (data.TaxpayerIdentificationNumber && !regSymbol.test(data.TaxpayerIdentificationNumber)) {
					// 不可輸入符號
					errors.Tax[index].TaxpayerIdentificationNumber = errorType.containsSymbol;
				} else if (data.TinUnavailableReason && !regSymbol.test(data.TinUnavailableReason)) {
					// 不可輸入符號
					errors.Tax[index].TinUnavailableReason = errorType.containsSymbol;
				} else if (data.haveTIN === 'Yes' && !data.TaxpayerIdentificationNumber) {
					// 沒有TIN，也沒有選擇原因
					errors.Tax[index].TaxpayerIdentificationNumber = errorType.requiredField;
				} else if (data.haveTIN === 'No' && !data.TinUnavailableTypesId) {
					// 沒有TIN，也沒有選擇原因
					errors.Tax[index].TinUnavailableTypesId = errorType.requiredField;
				} else if (data.haveTIN === 'No' && data.TinUnavailableTypesId === '2' && !data.TinUnavailableReason) {
					// 沒有TIN，選擇自行填選原因，但沒有填寫
					errors.Tax[index].TinUnavailableReason = errorType.requiredField;
				} else if (data.CountryCodesId === '24' && data.haveIRD === 'Yes' && !data.TaxpayerIdentificationNumber) {
					// 紐西蘭# 有IRD，沒有填寫IRD號碼
					errors.Tax[index].TaxpayerIdentificationNumber = errorType.requiredField;
				} else if (data.haveIRD === 'No' && !data.TinUnavailableReason) {
					// 紐西蘭# 沒IRD，沒有填寫原因
					errors.Tax[index].TinUnavailableReason = errorType.requiredField;
				} else if (!data.TaxpayerIdentificationNumber && !data.TinUnavailableTypesId) {
					// 兩者都沒有，沒IRD，沒有選擇原因
					errors.Tax[index].TaxpayerIdentificationNumber = errorType.requiredField;
					errors.Tax[index].TinUnavailableTypesId = errorType.requiredField;
				} else {
					//console.log(index,'正確',data,values.Tax)
					delete errors.Tax[index].TinUnavailableTypesId;
					delete errors.Tax[index].TaxpayerIdentificationNumber;
				}
				// 改變選項時將原有資料、errors清除
				if (data.haveTIN == 'No' && data.TaxpayerIdentificationNumber) {
					delete data.TaxpayerIdentificationNumber;
					if (!data.TinUnavailableTypesId) {
						errors.Tax[index].TinUnavailableTypesId = errorType.requiredField;
					}
				}
				if (data.haveTIN == 'Yes' && data.TinUnavailableTypesId) {
					delete data.TinUnavailableTypesId;
					if (data.TinUnavailableReason) {
						delete data.TinUnavailableReason;
					}
				}
				// 紐西蘭# 改變選項時將原有資料、errors清除
				if (data.CountryCodesId == '24') {
					if (data.haveTIN) {
						delete data.haveTIN;
					}
					if (data.haveIRD == 'No') {
						delete errors.Tax[index].TaxpayerIdentificationNumber;
						if (data.TaxpayerIdentificationNumber) {
							delete data.TaxpayerIdentificationNumber;
						}
					}
					if (data.haveIRD == 'Yes' && data.TinUnavailableReason) {
						delete data.TinUnavailableReason;
					}
				}
			});
	}
	return errors;
}

class PersonalDetail extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			show_ShareTransWithAgent: false,
			show_EmploymentStatus: true,
			selfCertificationKey: 0,
			show_anotherMailAdd: false,
			show_AlertDialog: false,
			show_OtherCurrency: false,
			show_MaleOption: true,
			ResidentialAddress: '',
			isCN: WEB_LANG('cn')
		};
	}

	AutoFillInput(e) {
		e.preventDefault();
		this
			.props
			.change('MailingAddress', 'MailingAddress');

		for (let i = 0; i < $('form').length; i++) {
			$($('form')[i])
				.find('input[type="text"]')
				.map((index) => {
					const input = $($('form')[i]).find('input[type="text"]')[index]
					if (input.name == "Email") {
						this
							.props
							.change("Email", 'martina@banclogix.com')
					} else if (input.name == "Birthday") {
						this
							.props
							.change("Birthday", moment('01/01/1985', 'DD/MM/YYYY'));
					} else if (input.name == "contactCountryCode" || input.name == "contactAreaCode" || input.name == "ContactNumber" || input.name == "NumberOfDependents") {
						this
							.props
							.change(input.name, '12345');
					} else if (input.name == 'ServiceProviderNumber') {} else {
						this
							.props
							.change(input.name, input.name);
					}
				});
		}
	}

	handleChange(e) {
		const target = e.target;
		target.name === 'ServiceProviderNumber' && target.value
			? this.setState({show_ShareTransWithAgent: true})
			: this.setState({show_ShareTransWithAgent: false});

		if (target.name === 'EmploymentStatusesId') {
			if (target.value == '1' || target.value == '2') {
				this.setState({show_EmploymentStatus: true});
				PushArrayToArray(EmployRequiredFields);
			} else {
				this.setState({show_EmploymentStatus: false});
				FilterArrayByArray(EmployRequiredFields);
				this
					.props
					.change('BusinessTypesId', 1);
				FilterArray('BusinessTypesOthers');
			}
		}
		if (target.name === 'ResidentialAddress') {
			const DiffrentAddress = $('input[name="DiffrentAddress"]:checked').val();
			if (DiffrentAddress === 'No') {
				this
					.props
					.change('MailingAddress', target.value);
			}
		}
		if (target.name === 'DiffrentAddress') {
			if (target.value === 'Yes') {
				this.setState({show_anotherMailAdd: true});
				this
					.props
					.change('MailingAddress', null);
			} else {
				this.setState({show_anotherMailAdd: false});
				this
					.props
					.change('MailingAddress', $('input[name="ResidentialAddress"]').val());
			}
		}
		if (target.name === 'CitizenOrTaxResidentOfUSAId' && target.value === '1') {
			this.togglePopUp();
		}
		if (target.name === 'BornInUSAAndSurrenderedCitizenshipId' && target.value === '1') {
			this.togglePopUp();
		}
		if (target.name === 'CountryId') {
			this
				.props
				.change('contactCountryCode', target.options[target.selectedIndex].getAttribute('datacode'));
		}
		if (target.name === 'BankCurrencyId') {
			if (target.value === '5') {
				this.setState({show_OtherCurrency: true});
				PushToArray('BankCurrencyOthers');
			} else {
				this.setState({show_OtherCurrency: false});
				FilterArray('BankCurrencyOthers');
			}
		}
		if (target.name === 'GendersId') {
			if (target.value === '1') {
				this.setState({show_MaleOption: true});
				this.props.change('TitleTypesId', '1');
			} else {
				this.setState({show_MaleOption: false});
				this.props.change('TitleTypesId', '2');
			}
		}
	}
	togglePopUp() {
		this.setState({
			show_AlertDialog: !this.state.show_AlertDialog
		});
	}

	addSelfCertification(e) {
		e.preventDefault();
		const {selfCertificationKey} = this.state;

		this.setState({
			selfCertificationKey: selfCertificationKey + 1
		});
	}

	removeSelfCertification() {
		const {selfCertificationKey} = this.state;

		this.setState({
			selfCertificationKey: selfCertificationKey - 1
		});
	}
	handleNextPage(values) {
		const {isCN} = this.state;
		let validError = false;
		if (values.BornInUSAAndSurrenderedCitizenshipId == '1') {
			this.togglePopUp();
			validError = true;
		} else if (values.CitizenOrTaxResidentOfUSAId == '1') {
			this.togglePopUp();
			validError = true;
		}

		if (validError) {
			return false;
		}
		this
			.props
			.handleRenderPage(this.props.nextPage);
	}

	render() {
		const {
			pristine,
			reset,
			source,
			className,
			submitting,
			handleSubmit,
			change,
			PersonalDetail
		} = this.props;
		const {
			selfCertificationKey,
			show_anotherMailAdd,
			ResidentialAddress,
			show_AlertDialog,
			isCN,
			show_OtherCurrency,
			show_MaleOption
		} = this.state;
		console.log("PersonalDetail",PersonalDetail)
		const SelfCertificationArr = [];
		for (let i = 0; i < this.state.selfCertificationKey; i += 1) {
			SelfCertificationArr.push(<SelfCertification
				isCN={isCN}
				id={i + 1}
				change={this.props.change}
				source={source}
				key={i}
				PersonalDetail={PersonalDetail}
				removeSelfCertification={this.removeSelfCertification}/>);
		}
		return (
			<div className={className}>
				<form onSubmit={handleSubmit(this.handleNextPage)}>

					<div className="form-page col-md-10 col-center">
						<div className="steps" id="0">
							<h3>Individual Applicant {isCN
									? '个人申请'
									: null}
								<button onClick={this.AutoFillInput} style={{
									opacity: 0
								}}></button>
							</h3>
							<p className="blue-title">Please complete all required details below. Those
								marked with an * are mandatory.<br/>{isCN
									? '请完成所有需要的栏位。标明 * 的为必须填写。'
									: null}
							</p>

							<div className="form-group">
								<label>Gender {isCN
										? '性别'
										: null}*
								</label>
								<div className="form-check-inline">
									<Field
										type="radio"
										component="input"
										name="GendersId"
										onChange={this.handleChange}
										value="1"/>
									Male {isCN
										? '男'
										: null}
									<Field
										type="radio"
										component="input"
										name="GendersId"
										onChange={this.handleChange}
										value="2"/>
									Female {isCN
										? '女'
										: null}
								</div>
							</div>

							<Field
								name="TitleTypesId"
								component={SelectField}
								onChange={this.handleChange}
								label={`Title ${isCN
								? '称谓'
								: ''}*`}>
								{show_MaleOption
									? <option value="1">Mr {isCN
												? '先生'
												: ''}
										</option>
									: [ < option key = "1" value = "2" > Mrs {
											isCN
												? '太太'
												: ''
										} </option>,
                    <option key="2" value="3">Miss {isCN ? '小姐':''}</option >, < option key = "3" value = "4" > Ms {
											isCN
												? '女士'
												: ''
										} </option>]}

							</Field>

							<Field
								name="FirstName"
								component={InputField}
								label={`First Name (as shown on your proof of identity) ${isCN
								? '名称（与身份证明一致）'
								: ''}*`}/>

							<Field
								name="MiddleName"
								component={InputField}
								label={`Middle Name (if applicable) ${isCN
								? '中间名（如适用）'
								: ''}`}/>

							<Field
								name="Surname"
								component={InputField}
								label={`Surname (as shown on your proof of identity) ${isCN
								? '姓氏（与身份证明一致）'
								: ''}*`}/>

							<Field
								name="Email"
								component={InputField}
								label={`Email Address ${isCN
								? '电子邮件'
								: ''}*`}
								labelInfo={`It is important that you provide a valid email address for future correspondence. ${isCN
								? '<br/>请确保提供一个有效的电子邮件地址以方便之后的通讯联系'
								: ''}`}/>

							<Field
								name="Birthday"
								component={DateField}
								change={change}
								label={`Date of Birth ${isCN
								? '出生日期'
								: ''}*`}
								labelInfo={`You must be over 18 years old to trade with KVB. ${isCN
								? '<br/> 您必须年满18岁才可以在KVB昆仑国际开立账户'
								: ''}`}/>

							<LocationOption
								component={SelectField}
								label={`Country of Birth ${isCN
								? '出生国家'
								: ''}*`}
								name="BirthCountryId">
								<option value="">-- Country --</option>
							</LocationOption>

							<LocationOption
								component={SelectField}
								label={`Nationality ${isCN
								? '国籍'
								: ''}*`}
								name="NationalityId">
								<option value="">-- Nationality --</option>
							</LocationOption>

							<Field
								name="ResidentialAddress"
								component={InputField}
								onChange={this.handleChange}
								label={`Residential Address (P.O. Box Addresses are not acceptable) ${isCN
								? '通讯地址 (邮政信箱将不予接受)'
								: ''}*`}/>

							<Field
								name="City"
								component={InputField}
								label={`Town/City ${isCN
								? '城镇/城市'
								: ''}*`}/>

							<Field
								name="Postcode"
								component={InputField}
								label={`Postcode ${isCN
								? '邮政编号'
								: ''}`}/>

							<LocationOption
								component={SelectField}
								onChange={this.handleChange}
								label={`Country or Region ${isCN
								? '国家或地区'
								: ''}*`}
								name="CountryId">
								<option value="">-- Country --</option>
							</LocationOption>

							<div className="form-group">
								<label>Mailing address {isCN
										? '邮寄地址'
										: null}
									*
								</label>
								<small>Is your mailing address different from the address provided above? {isCN
										? '您的邮寄地址是否与居住地址不同?'
										: null}
								</small>
								<div
									className="form-inline col-inputs"
									style={{
									width: '100%'
								}}>
									<Field
										type="radio"
										component="input"
										onChange={this.handleChange}
										name="DiffrentAddress"
										value="Yes"/>
									Yes {isCN
										? '是'
										: null}
									{show_anotherMailAdd
										? <Field
												name="MailingAddress"
												component={InputField}
												customCss={{
												width: '80%'
											}}
												customInputCss={{
												width: '100%'
											}}/>
										: null}
								</div>
								<div className="form-inline col-inputs">
									<Field
										type="radio"
										component="input"
										onChange={this.handleChange}
										name="DiffrentAddress"
										value="No"/>
									No {isCN
										? '否'
										: null}
								</div>
							</div>

							<div className="form-group">
								<label className="d-block">Primary Contact Number {isCN
										? '否主要联络号码'
										: null}
									*
								</label>
								<div className="form-inline col-inputs">
									<Field name="ContactTypesId" component="select" className="custom-select">
										<option value="1">Work {isCN
												? '办公室'
												: null}
										</option>
										<option value="2">Home {isCN
												? '住宅'
												: null}
										</option>
										<option value="3">Mobile {isCN
												? '手机'
												: null}
										</option>
									</Field>
									<Field
										name="contactCountryCode"
										placeholder={`Country Code ${isCN
										? '国家码'
										: ''}`}
										component={InputField}/>
									<Field
										name="contactAreaCode"
										placeholder={`Area Code ${isCN
										? '区码'
										: ''}`}
										component={InputField}/>
									<Field
										onChange={this.handleChange}
										placeholder={`Number ${isCN
										? '电话号码'
										: ''}`}
										name="ContactNumber"
										component={InputField}/>
								</div>
							</div>

							{/* <Field
                                name="TelephonePassword"
                                component={InputField}
                                label="Telephone Password 电话密码 *"
                                labelInfo="It is important that you remember your telephone password for future identification when contacting KVB. <br/> 请确保记住您的电话密码以方便之后与我们联络时的身份识别"/> */}

							<Field
								name="MaritalStatusId"
								component={SelectField}
								onChange={this.handleChange}
								label={`Marital Status ${isCN
								? '婚姻状况'
								: ''}*`}>
								{source && <CreateOptions source={source.MaritalStatus}/>}
							</Field>

							<Field
								name="NumberOfDependents"
								className="form-control"
								label={`Number of dependents ${isCN
								? '家属人数'
								: ''}*`}
								component={InputField}/>

							<Field
								name="TypeOfIdentificationId"
								component={SelectField}
								onChange={this.handleChange}
								label={`Type of identification ${isCN
								? '身份证明文件类别'
								: ''}*`}>
								{source && <CreateOptions source={source.TypeOfIdentification}/>
}
							</Field>

							<Field
								name="IdentificationNumber"
								className="form-control"
								label={`Identification Number ${isCN
								? '身份证明文件号码'
								: ''}*`}
								component={InputField}/>

							<Field
								name="ServiceProviderNumber"
								component={InputField}
								onChange={this.handleChange}
								label={`If you are referred by a service provider, please specify the service provider number ${isCN
								? '如您由代理介绍开户, 烦请填写代理号码'
								: ''}`}/> {this.state.show_ShareTransWithAgent
								? <ShareTransWithAgent isCN={isCN}/>
								: null}

						</div>
						<hr/> {/* ======================= Form Two ======================= */}
						<div className="steps" id="1">
							<h3>Settlement details {isCN
									? '银行帐户资料'
									: ''}
							</h3>

							<Field
								name="NameOfBank"
								component={InputField}
								label={`Name of bank ${isCN
								? '银行名称'
								: ''}*`}/>

							<Field
								name="BankAddress"
								component={InputField}
								label={`Bank address ${isCN
								? '银行地址'
								: ''}*`}/>

							<Field
								name="BSB"
								component={InputField}
								label={`BSB ${isCN
								? '区域代码'
								: ''}`}/>

							<Field
								name="BankAccountNumber"
								component={InputField}
								label={`Account number ${isCN
								? '银行帐号'
								: ''}*`}/>

							<Field
								name="BankCurrencyId"
								component={SelectField}
								onChange={this.handleChange}
								label={`Currency ${isCN
								? '货币'
								: ''}*`}>
								<option value="1">USD {isCN
										? '美元'
										: ''}
								</option>
								<option value="2">NZD {isCN
										? '纽元'
										: ''}
								</option>
								<option value="3">AUD {isCN
										? '澳元'
										: ''}
								</option>
								<option value="4">JPY {isCN
										? '日元'
										: ''}
								</option>
								<option value="5">Other {isCN
										? '其他'
										: ''}
								</option>
							</Field>

							{show_OtherCurrency
								? <Field
										name="BankCurrencyOthers"
										customInputCss={{
										marginTop: 0
									}}
										component={InputField}/>
								: null}

							<Field
								name="BankAccountHolderName"
								component={InputField}
								label={`Account holder's name ${isCN
								? '银行帐户名'
								: ''}*`}/>

							<Field
								name="SwiftCode"
								component={InputField}
								label=""
								label={`SWIFT code ${isCN
								? '国际汇款代码'
								: ''}`}/>

						</div>
						<hr/> {/* ======================= Section Five ======================= */}
						<div className="steps" id="2">
							<h3>Employment Information {isCN
									? '就业资料'
									: ''}
							</h3>

							<Field
								name="EmploymentStatusesId"
								component={SelectField}
								onChange={this.handleChange}
								label={`Employment Status ${isCN
								? '就业情况'
								: ''}*`}>
								{source && <CreateOptions source={source.EmploymentStatuses}/>}
							</Field>

							{this.state.show_EmploymentStatus
								? <EmploymentStatus source={source} isCN={isCN} PersonalDetail={PersonalDetail}/>
								: null}

							<hr/> {/* ======================= Form Four ======================= */}

							<label className="d-block">Are you a citizen or a tax resident of the United States of America? *
								<br/> {isCN
									? '您是否是美国公民或纳税居民？ *'
									: null}

							</label>
							<div className="form-check-inline">
								<Field
									type="radio"
									component="input"
									onChange={this.handleChange}
									name="CitizenOrTaxResidentOfUSAId"
									value="1"/>
								Yes {isCN
									? '是'
									: null}
								<Field
									type="radio"
									component="input"
									onChange={this.handleChange}
									name="CitizenOrTaxResidentOfUSAId"
									value="2"/>
								No {isCN
									? '否'
									: null}

							</div>

							<label className="d-block">Are you born in the U.S. (or a U.S. territory) but am
								no longer a U.S. citizen as you have voluntarily surrendered your citizenship? *
								<br/> {isCN
									? '您是否出生於美国 (或美国领土)，但本人以自愿放弃美国国籍，不在是美国公民？*'
									: null}
							</label>
							<div className="form-check-inline">
								<Field
									type="radio"
									component="input"
									onChange={this.handleChange}
									name="BornInUSAAndSurrenderedCitizenshipId"
									value="1"/>
								Yes {isCN
									? '是'
									: null}
								<Field
									type="radio"
									component="input"
									onChange={this.handleChange}
									name="BornInUSAAndSurrenderedCitizenshipId"
									value="2"/>
								No {isCN
									? '否'
									: null}
							</div>
						</div>
						<hr/> {/* ======================= Section Five ======================= */}

						<div className="steps last-step" id="3">
							<h3>Common Reporting Standard {isCN
									? '普通报告标准'
									: null}
								<br/>Individual Self-Certification {isCN
									? '个人认证'
									: null}
							</h3>
							<SelfCertification
								isCN={isCN}
								id="0"
								source={source}
								change={this.props.change}
								PersonalDetail={PersonalDetail}/> {SelfCertificationArr}
							<p>You can be a tax resident of more than one country. If you are a tax resident
								of another jurisdiction/country<br/> {isCN
									? '    如果您是其他管辖区/国家的税务居民，请点击更多'
									: null}
							</p>
							{selfCertificationKey === 3
								? null
								: <button onClick={this.addSelfCertification} className="btn btn-white">
									More {isCN
										? '更多'
										: null}
								</button>}

						</div>

						<div className="text-center">
							<button type="submit" disabled={submitting} className="btn btn-primary">{isCN
									? '下一步'
									: 'Next'}
							</button>
						</div>

					</div>
				</form>
				<DialogBox display={show_AlertDialog} togglePopUp={this.togglePopUp}>
					{isCN
						? <ServiceInfoCN/>
						: <ServiceInfoEN/>}
				</DialogBox>
			</div>
		);
	}
}

class ShareTransWithAgent extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			disabled_standadLot: 0
		};
	}
	handleChange(e) {
		const target = e.target;
		if (target.name === 'standadLotRadio') {
			this.setState({disabled_standadLot: target.value});
		}
	}
	render() {
		const {disabled_standadLot} = this.state;
		const {isCN} = this.props;
		return (
			<div className="expend">
				<div className="form-group">
					<label>Do you agree to authorise the disclosure of account information
						(transaction records, funds in and funds out) to your Referring Party?
						<br/>{isCN
							? '你是否同意授权KVB披露您的帐户信息（交易记录，出入金）给您的代理人？'
							: null}
					</label>
					<div>
						<Field
							type="radio"
							component="input"
							name="AgreeDisclosureInfoToServiceProviderId"
							checked
							value="1"/>
						Yes I agree please proceed {isCN
							? '是的，我同意，请继续'
							: null}
						<br/>
						<Field
							type="radio"
							component="input"
							name="AgreeDisclosureInfoToServiceProviderId"
							value="2"/>
						No, I don't agree {isCN
							? '不，我不同意'
							: null}
					</div>
				</div>
				{/* <hr/>

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
                </div> */}
			</div>
		);
	}
}

class SeniorInfo extends Component {
	render() {
		const {isCN} = this.props;
		return (
			<div className="senior-expend">
				<div className="form-group">
					<label className="d-block">Please complete the details below. KVB cannot process
						an account application without these questions being answered.<br/> {isCN
							? '请填写以下信息，如以下信息不完整KVB将无法处理您的开户申请：'
							: null}
					</label>

					<small className="mt-2">Name of Director/Senior Management /Prescribed Person/PEP
						<br/> {isCN
							? '董事/高级管理人员/“特定人员”/政治公众人物姓名'
							: null}

					</small>
					<Field name="NameOfDirector" className="form-control" component={InputField}/>
					<small>Name of entity listed on Recognized Securities
						Exchange/Employer/Political Position Held
						<br/> {isCN
							? '上市公司名称/相关公司或企业名称/现任职位'
							: null}
					</small>
					<Field name="NameOfEntity" className="form-control" component={InputField}/>
				</div>
			</div>
		);
	}
}

class SelfCertification extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			haveTIN: true,
			haveIRD: true,
			fillReason: false,
			typeIRD: false,
			expendStyle: props.id % 2 === 0
		};
	}

	componentDidMount() {
		this
			.props
			.change(`Tax[${this.props.id}].haveTIN`, 'Yes');
		this
			.props
			.change(`Tax[${this.props.id}].haveIRD`, 'Yes');
		if ($(`[name="Tax[${this.props.id}].CountryCodesId"]`).val() == '24') {
			this.setState({typeIRD: true});
		}
	}
	componentWillUnmount() {
		this
			.props
			.change(`Tax[${this.props.id}].haveTIN`, null);
		this
			.props
			.change(`Tax[${this.props.id}].haveIRD`, null);
	}
	handleChange(e) {
		const target = e.target;
		const {change, id} = this.props;
		if (target.name.indexOf('haveTIN') != -1) {
			if(target.value === 'Yes'){
				this.setState({
					haveTIN: true,
					fillReason: false
				})
				change(`Tax[${id}].haveTIN`, "Yes");
				change(`Tax[${id}].haveIRD`, null);
			}else{
				this.setState({haveTIN: false});
				change(`Tax[${id}].haveTIN`, null);
			}
		}
		if (target.name.indexOf('haveIRD') != -1) {
			if(target.value === 'Yes'){
				this.setState({haveIRD: true})
				change(`Tax[${id}].haveTIN`, null);
				change(`Tax[${id}].haveIRD`, "Yes");
			}else{
				this.setState({haveIRD: false})
				change(`Tax[${id}].haveIRD`, null);
			}
		}

		if (target.name.indexOf('CountryCodesId') != -1) {
			change(`Tax[${id}].TaxpayerIdentificationNumber`, null);
			change(`Tax[${id}].TinUnavailableTypesId`, null);
			change(`Tax[${id}].TinUnavailableReason`, null);
			change(`Tax[${id}].haveTIN`, "Yes");
			change(`Tax[${id}].haveIRD`, null);
			this.setState({
				haveTIN: true,
				fillReason: false
			});
			if (target.value === '24') {
				change(`Tax[${id}].haveTIN`, null);
				change(`Tax[${id}].haveIRD`, "Yes");
				this.setState({
					typeIRD: true,
					haveIRD: true,
					haveTIN: false
				});
			} else {
				this.setState({typeIRD: false,haveIRD: false});
			}
		}
		if (target.name.indexOf('TinUnavailableTypesId') != -1 && this.state.haveTIN === false) {
			console.log(this.state)

			target.value === '2'
				? this.setState({fillReason: true})
				: this.setState({fillReason: false});
		}
	}
	render() {
		const {removeSelfCertification, id, source, isCN, PersonalDetail} = this.props;
		const {haveTIN, haveIRD, typeIRD, expendStyle, fillReason} = this.state;
		// console.log(PersonalDetail)

		return (
			<div className={!expendStyle
				? 'expend'
				: null}>
				{id != 0
					? <a
							href="javascript:void(0);"
							className="pull-right"
							onClick={removeSelfCertification}>
							<span className="glyphicon red glyphicon-remove" aria-hidden="true"/>
						</a>
					: null}

				<LocationOption
					name={`Tax[${id}].CountryCodesId`}
					label={`Which country or countries are you a tax resident? ${isCN
					? '您是哪个或哪些国家的税务居民？'
					: ''}*`}
					labelInfo={`(Please notify KVB if there is any material change in circumstances. ${isCN
					? '如果有任何情况发生改变，请通知KVB)'
					: ''}`}
					onChange={this.handleChange}
					component={SelectField}>
					<option value="">-- Tax Resident Country --</option>
				</LocationOption>

				{typeIRD
					? <div>
							<label className="mt-4 d-block">IRD Number {isCN
									? '税号'
									: ''}:
							</label>
							<Field
								name={`Tax[${id}].haveIRD`}
								type="radio"
								component="input"
								value="Yes"
								onChange={this.handleChange}
								checked={haveIRD}/>
							<label>I do have IRD</label>
							<Field
								name={`Tax[${id}].TaxpayerIdentificationNumber`}
								component={InputField}
								disabled={!haveIRD}/>
							<Field
								name={`Tax[${id}].haveIRD`}
								type="radio"
								component="input"
								value="No"
								onChange={this.handleChange}/>
							<label>I do not have IRD</label>
							<Field
								name={`Tax[${id}].TinUnavailableReason`}
								component={InputField}
								disabled={haveIRD}
								label={`If an IRD is unavailable, provide the appropriate reason: ${isCN
								? '如果您没有IRD号码，请提供适当的理由'
								: ''}`}/>
						</div>
					: <div>
						<label className="mt-4">Please provide your Taxpayer Identification Number (TIN). {isCN
								? '请提供您的纳税人识别号码 (TIN)'
								: null}
						</label>
						<small className="d-block">(For account holder who is tax resident of China, the
							TIN is the China National Identity Card Number. {isCN
								? '对于中国税务居民的账户持有人，TIN号码就是中国的居民身份证号码)'
								: null}
						</small>
						<Field
							name={`Tax[${id}].haveTIN`}
							type="radio"
							component="input"
							value="Yes"
							onChange={this.handleChange}
							checked={haveTIN}/>
						I do have TIN
						<Field
							component={InputField}
							name={`Tax[${id}].TaxpayerIdentificationNumber`}
							disabled={!haveTIN}/>
						<Field
							name={`Tax[${id}].haveTIN`}
							type="radio"
							component="input"
							value="No"
							onChange={this.handleChange}/>
						I do not have TIN
						<small className="d-block">If a TIN is unavailable, provide the appropriate reason: {isCN
								? '如果您没有TIN号码，请提供适当的理由'
								: null}
						</small>
						<Field
							name={`Tax[${id}].TinUnavailableTypesId`}
							component={SelectField}
							className="mt-0 custom-select"
							onChange={this.handleChange}
							disabled={haveTIN}>
							<option value="">-- Reason --</option>
							{source && <CreateOptions source={source.TinUnavailableTypes}/>}
						</Field>
						{fillReason
							? <Field
									name={`Tax[${id}].TinUnavailableReason`}
									component={InputField}
									label={`The account holder is unable to obtain a TIN. Please explain the reason:${isCN
									? '账户持有人无法获得TIN，请说明原因'
									: null} `}/>
							: null}
					</div>
}

				<hr/>
			</div>
		);
	}
}

class EmploymentStatus extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			show_SeniorInfo: false,
			show_otherField: false
		};
	}

	handleChange(e) {
		const target = e.target;
		if (target.name === 'PrescribedPersonId' && target.value === '1') {
			this.setState({show_SeniorInfo: true});
			PushArrayToArray(PrescribedRequiredFields);
		} else {
			this.setState({show_SeniorInfo: false});
			FilterArrayByArray(PrescribedRequiredFields);
		}

		if (target.name === 'BusinessTypesId') {
			if (target.value == '21' || target.value == '67') {
				this.setState({show_otherField: true});
				PushToArray('BusinessTypesOthers');
			} else {
				this.setState({show_otherField: false});
				FilterArray('BusinessTypesOthers');
			}
		}
	}

	render() {
		const {source, PersonalDetail, isCN} = this.props;
		const {show_otherField} = this.state;
		return (
			<div>
				<Field
					name="CompanyName"
					component={InputField}
					label={`Company Name ${isCN
					? '公司名称'
					: ''}*`}/>

				<Field
					name="Occupation"
					component={InputField}
					label={`Occupation ${isCN
					? '职业'
					: ''}*`}/>

				<Field
					name="BusinessTypesId"
					component={SelectField}
					onChange={this.handleChange}
					label={`Nature of Business ${isCN
					? '业务性质'
					: ''}*`}>
					{source && <CreateOptions source={source.NatureOfBusiness}/>}
				</Field>
				{show_otherField
					? <Field
							name="BusinessTypesOthers"
							component={InputField}
							customCss={{
							paddingTop: '0'
						}}/>
					: null}

				<Field
					name="EmployerStreet1"
					component={InputField}
					label={`Employer Street#1 ${isCN
					? '公司地址#1'
					: ''}*`}/>

				<Field
					name="EmployerStreet2"
					component={InputField}
					label={`Employer Street#2 ${isCN
					? '公司地址#2'
					: ''}`}/>

				<LocationOption
					component={SelectField}
					label={`Employer Country or Region ${isCN
					? '就业国家或地区'
					: ''}*`}
					name="EmployerCountry">
					<option value="">-- Country --</option>
				</LocationOption>

				<Field
					name="EmployerCity"
					component={InputField}
					label={`Employer Town/City ${isCN
					? '就业城镇/城市'
					: ''}*`}/>

				<Field
					name="EmployerProvince"
					component={InputField}
					label={`Employer Province ${isCN
					? '就业省份'
					: ''}*`}/>

				<Field
					name="EmployerPostalCode"
					component={InputField}
					label={`Employer Postcode ${isCN
					? '就业地区邮政编号'
					: ''}`}/>

				<hr/>

				<label>Are you a Director/Senior Management of a public listed company in any
					recognised security exchange, a
					<a href="../PEP" target="_blank">Prescribed Person</a>, or a
					<a href="../PEP" target="_blank">Politically Exposed
					</a>
					Person (PEP)
					<br/> {isCN
						? <div>您是否是交易所所在地上市公司的董事成员或高级管理人员，或
								<a href="../PEP" target="_blank">"特定人员"</a>
								或
								<a href="../PEP" target="_blank">政治公众人物</a>？
							</div>
						: ''}
				</label>
				<div className="form-check-inline">
					<Field
						type="radio"
						component="input"
						onChange={this.handleChange}
						name="PrescribedPersonId"
						value="1"/>
					Yes {isCN
						? '是'
						: ''}
					<Field
						type="radio"
						component="input"
						onChange={this.handleChange}
						name="PrescribedPersonId"
						value="2"/>
					No {isCN
						? '否'
						: ''}
				</div>
				{this.state.show_SeniorInfo
					? <SeniorInfo isCN={isCN}/>
					: null}
			</div>
		);
	}
}

const PushToArray = (obj) => {
	if (requiredFields.indexOf(obj) < 0) {
		requiredFields.push(obj);
	}
};

const PushArrayToArray = (arr) => {
	arr.map((data) => {
		PushToArray(data);
	});
};

const FilterArray = (obj) => {
	requiredFields = requiredFields.filter((el) => {
		return el !== obj;
	});
};

const FilterArrayByArray = (arr) => {
	arr.map((data) => {
		FilterArray(data);
	});
};

PersonalDetail = reduxForm({
	form: 'PersonalDetail',
	validate,
	onSubmitFail(errors) {
		const input = Object.keys(errors)[0]
		if (errors) {
			// $('html, body').animate({     scrollTop:
			// $($(`[name="${input}"]`)[0]).offset().top -$('header').height()-50 });
			$(`[name="${input}"]`).focus()
			return;
		}
	},
	// , asyncValidate
})(PersonalDetail);

export default PersonalDetail;
