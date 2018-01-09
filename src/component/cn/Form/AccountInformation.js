import React, {Component} from 'react';
import FormHeader from './common/Header';
import {Field, reduxForm} from 'redux-form';
import autoBind from 'react-autobind';
import {connect} from 'react-redux'; 
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import $ from 'jquery';
import {InputField, DateField, SelectField, CreateRadios} from '../../Common';
import {Link} from 'react-router-dom';
const AreaArr = [];

class AccountInformation extends Component { 
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            isCN : WEB_LANG('cn')
        }
    }

    handleNextPage(e){
        e.preventDefault();
        let validError = false;
        
        const MarketIdArr = []
        const MarketIdInputs = $('input[name="MarketAccessId"]')
        const $MarketOthwerInput = $('#MarketAccessOthers')
        
        if(MarketIdInputs.length == 0){
            $('.multi-select').addClass('error-text')
            validError = true;
        }else{
            for(let i=0; i< MarketIdInputs.length; i++){
                MarketIdArr.push($(MarketIdInputs[i]).val())
            }
            $('.multi-select').removeClass('error-text')
            this.props.change('MarketAccessId', MarketIdArr.join());
        }
        if(MarketIdArr.indexOf('8') != -1  && !$MarketOthwerInput.val() ) {
            $MarketOthwerInput.parent().addClass('error-text')
            $MarketOthwerInput.focus();
            validError = true;
        }else{
            $MarketOthwerInput.parent().removeClass('error-text')
        }
        if(validError){
            return false;
        }
        this.props.handleRenderPage(this.props.nextPage);
    }
    handlePrevPage(e){
        e.preventDefault();
        this.props.handleRenderPage(this.props.prevPage);
    }
    //Select Select--multi is-clearable is-searchable
    class="Select Select--multi is-clearable is-searchable has-value"
    render() {
        const {handleSubmit, className, pristine, reset, submitting, source} = this.props
        const {isCN} = this.state
        //console.log(this.props)
        return (
            <div className={className}>
                <div className="form-page col-md-10 col-center" key={1}>
                    <form onSubmit={this.handleSubmit}>
                        <div id="0" className="steps">
                            <h3>Nature and Purpose {isCN&&"投资性质与目的"}</h3>
                            <div className="form-group">
                                <label>What is the nature and purpose of your relationship KVB? {isCN&&"您与KVB 昆仑国际建立关系的目的是什么？"}*</label>
                                {source && 
                                    <CreateRadios source={source.InvestmentTypes} name="InvestmentTypesId"/>}
                            </div>
                            <hr/>
                        </div>
                        <div id="1" className="steps">
                            <h3>Currency Type {isCN&&"开户币种"}*</h3>
                            <div className="form-group">
                                <label>Currency Type {isCN&&"开户币种"}*</label>
                                <div className="radio-field">
                                    <Field
                                        type="radio"
                                        component="input"
                                        name="CurrencyTypesId"
                                        value="1"/>USD {isCN?"美元":""}
                                </div>
                                <div className="radio-field">
                                    <Field
                                        type="radio"
                                        component="input"
                                        name="CurrencyTypesId"
                                        value="2"/>NZD {isCN?"纽元":""}
                                </div>
                                <div className="radio-field">
                                    <Field
                                        type="radio"
                                        component="input"
                                        name="CurrencyTypesId"
                                        value="3"/>AUD {isCN?"澳元":""}
                                </div>
                                <div className="radio-field">
                                    <Field
                                        type="radio"
                                        component="input"
                                        name="CurrencyTypesId"
                                        value="4"/>JPY {isCN?"日元":""}
                                </div>
                            </div>
                            <hr/>
                        </div>
                        <div id="2" className="steps">
                            <h3>Account type {isCN&&"帐户类别"}</h3>
                            <div className="form-group">
                                <label>Account type {isCN&&"帐户类别"} *</label>
                                {source && 
                                    <CreateRadios source={source.AccountType} name="AccountTypeId"/>}
                            </div>
                            <hr/>
                        </div>
                        <div id="3" className="steps">
                            <h3>Market access {isCN&&"交易市場"}</h3>
                                <label>Market access {isCN&&"交易市場"} *</label>
                                <div className="form-check-inline multi-select">
                                    {/* <Field component="select" name="MarketAccessId">
                                        <optgroup label="North America 北美洲">
                                            <option value="1">United States 美国</option>
                                            <option value="2">Canada 加拿大</option>
                                        </optgroup>
                                        <optgroup label="Europe 欧洲">
                                            <option value="3">France 法国</option>
                                            <option value="4">Germany 德国</option>
                                            <option value="5">United Kingdom 英国</option>
                                        </optgroup>
                                        <optgroup label="Asia Pacific 亚太地区">
                                            <option value="6">Hong Kong 香港</option>
                                            <option value="7">Japan 日本</option>
                                        </optgroup>
                                        <optgroup label="Others">
                                            <option value="8">Others (please specify) 其他(请列明)</option>
                                        </optgroup>
                                    </Field> */}
                                    <Field component={mutipleSelector} name="MarketAccessId" isCN={isCN} source={source}></Field>
                                    {/* {source && source
                                            .MarketAccess
                                            .map((data, index) => {
                                                AreaArr.push(data.AreaEn);
                                                const filterArea = new Set(AreaArr).values();
                                                const AreaResult = Array.from(filterArea);
                                                console.log(AreaResult, data.AreaEn)
                                                AreaResult.map((areaData) => {

                                                    console.log(areaData)
                                                    return (<div>{areaData}</div>)

                                                })

                                            })} */}
                                </div>
                            </div>

                        <div className="text-center">
                            <button onClick={this.handlePrevPage} className="btn btn-primary"> {isCN?"返回":"Back"} </button>
                            <button onClick={this.handleNextPage} className="btn btn-primary">{isCN?"下一步":"Next"}</button>
                            </div>
                    </form>
                </div>
            </div>
        );
    }
}



class mutipleSelector extends Component {
    constructor(props){
        super(props)
        this.state = {
            removeSelected: true,
			disabled: false,
			stayOpen: false,
			value: [],
            rtl: false,
            show_other: false
        }
        autoBind(this)
    }
	handleSelectChange (value) {
		//console.log('You\'ve selected:~~~', value);
        this.setState({ value });
        if(value.indexOf('8') != -1) {
            this.setState({
                show_other: true
            })
        }else{
            this.setState({
                show_other: false
            })
        }
	}
	toggleCheckbox (e) {
		this.setState({
			[e.target.name]: e.target.checked,
		});
	}
	toggleRtl (e) {
		let rtl = e.target.checked;
		this.setState({ rtl });
	}

    render() {
        const { crazy, disabled, stayOpen, value, show_other } = this.state;
        const { source,isCN } = this.props
        const CITY = [];
        //console.log(value)
        if(source){
            source.MarketAccess.map((data)=>{
                CITY.push({
                    label: isCN? data.TitleEn +' '+ data.TitleCn:data.TitleEn,
                    value: data.code
                })
            })
        }
        const options = CITY;
        
        return (
            <div>
                <Select
                    closeOnSelect={!stayOpen}
                    disabled={disabled}
                    multi
                    name="MarketAccessId"
                    onChange={this.handleSelectChange}
                    options={options}
                    removeSelected={this.state.removeSelected}
                    rtl={this.state.rtl}
                    simpleValue
                    value={value}
                />
                {show_other?<Field component={InputField} name="MarketAccessOthers" ></Field>:null}
            </div>
        );
    }
}

AccountInformation = reduxForm({ 
    form: 'PersonalDetail' 
})(AccountInformation) 

const CnAccountInformation = connect( 
   state => { 
       const source =  state.info.source 
       return {source}; 
   } 
)(AccountInformation) 

export default CnAccountInformation; 
