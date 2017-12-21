import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import FormHeader from './common/Header';
import {connect} from 'react-redux';
import {CreateRadios} from '../../Common';
import {InputField} from '../../Common';
import {Term} from '../Card/term';
import $ from 'jquery';

function validate(values) {
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
        'FundSourceTypesRemark'
    ]
    requiredFields.map((field, index) => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    return errors
}

class InvestmentBackground extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleChange(e) {
        const $input = $('input[name="ClearUnderstandingId"]:checked')
        if ($input.val() === '1') {
            $input.parent().removeClass('error-check');
        }
    }

    handlePrevPage(e) {
        e.preventDefault();
        this.props.handleRenderPage(this.props.prevPage);
    }

    handleNextPage(e) {
        e.preventDefault();
        const $checkInput = $('input[name="ClearUnderstandingId"]:checked')
        if ($checkInput.val() === '2') {
            $checkInput.parent().addClass('error-check');
            return false;
        }
        this.props.handleRenderPage(this.props.nextPage);
    }

    render() {
        const {pristine, submitting, source, className} = this.props
        return (
            <div className={className}>
                <div className="form-page col-md-10 col-center">
                    <div id="0" className="steps">
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
                            <label>Funds Available for Investment 可用于投资的金额
                            </label>
                            <div className="form-group">
                                {source && CreateRadios(source.FundsAvailableLevels, 'FundsAvailableLevelsId')}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Source of funds for security trading 交易资金来源</label>
                            <div className="form-group">
                                {source && CreateRadios(source.FundSourceTypes, 'FundSourceTypesId')}
                            </div>
                        </div>

                        <Field
                            name="FundSourceTypesRemark"
                            component={InputField}
                            label="Source of funds Remark 资金来源說明"/>
                        <hr/>
                    </div>
                    <div id="1" className="steps">
                        <h3>Products Features and Risks 产品特点及风险</h3>
                        <div className="form-group">
                            <label>I have clear understanding and knowledge that trading or investing in
                                financial products such as CFDs, Derivatives and Securities carry a high degree
                                of risk.
                                <br/>我清楚的理解并且知道进行交易或投资诸如差价合约，衍生工具和证券等金融产品具有较高的风险。</label>
                            <div className="form-check-inline">
                                <Field
                                    type="radio"
                                    component="input"
                                    onChange={this.handleChange}
                                    name="ClearUnderstandingId"
                                    value="1"/>
                                Yes 是
                                <Field
                                    type="radio"
                                    component="input"
                                    onChange={this.handleChange}
                                    name="ClearUnderstandingId"
                                    value="2"/>
                                No 否
                            </div>
                        </div>
                        <hr/>
                        <Term/>
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

InvestmentBackground = reduxForm({form: 'PersonalDetail'})(InvestmentBackground)

const CnInvestmentBackground = connect(state => {
    const source = state.info.source
    return {source};
})(InvestmentBackground)

export default CnInvestmentBackground;