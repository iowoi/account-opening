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
import DialogBox from '../../Common/Dialog';
import { ServiceInfoCN,ServiceInfoEN} from '../../Common/AlertText';
import {scrollToElm, formatFloat} from '../../../actions/';
class InvestmentBackground extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            isCN: WEB_LANG('cn'),
            show_AlertDialog:false
        }
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
        let validError = false;
        const values = this.props.dataForm.PersonalDetail.values
        const {isCN} = this.state
        
        // valid SourceOfIncome
        if($('.soip-error').length > 0){
            scrollToElm($("#SourceOfIncome"));
            validError = true;
        }else if(!values.SourceOfIncome) {
            alert(isCN?'请填入收入来源':'Please fill Source Of Income')
            scrollToElm($("#SourceOfIncome"));
            validError = true;
        }else if(values.SourceOfIncome){
            let sum = 0
            values.SourceOfIncome.map((data,index)=>{
                if(data){
                    if(data.SourceOfIncomePercent){
                        sum += Number( data.SourceOfIncomePercent )
                    }
                    if (index === 11 && data.SourceOfIncomePercent && !data.SourceOfIncomeDescription) {
                        const $input = $(`input[name="SourceOfIncome[11].SourceOfIncomeDescription"]`)
                        scrollToElm($input);
                        $input.focus();
                        validError = true;
                        return false;
                    }
                }
            })
            if(sum !== Math.abs(100)){
                alert(isCN?'所得百分比加总不得大于或低于100%':'Total cannot exceed or less than 100%')
                scrollToElm($("#SourceOfIncome"));
                validError = true;
                return false;
            }
        }
        // valid ClearUnderstandingId
        const $clearUnderstanding = $('input[name="ClearUnderstandingId"]:checked')
        if(
            ($clearUnderstanding.val() === '2')||
            ((values.EmploymentStatusesId == '3'|| values.EmploymentStatusesId == '4') && values.FundsAvailableLevelsId == '4')||
            (values.SharesOrBondsExperenceId == '4' && values.FundsAvailableLevelsId == '4')||
            (values.IncomeLevelsId == '4' && values.FundsAvailableLevelsId == '4')
        ){
            this.togglePopUp();
            validError = true;
        }
       
        if(validError){
            return false;
        }
        this.props.handleRenderPage(this.props.nextPage);
    }
    togglePopUp(){
        this.setState({show_AlertDialog: !this.state.show_AlertDialog})
    }
    handleFormatValue(name,int){
        this.props.change(name,int)
    }
    
    render() {
        const {pristine, submitting, source, className} = this.props
        const {isCN,show_AlertDialog} = this.state
        return (
            <div className={className}>
                <div className="form-page col-md-10 col-center">
                    <div id="0" className="steps">
                        <h3>Level of Experience Investing in Financial Markets {isCN&&"金融市场投资经验等级"}</h3>

                        <div className="form-group">
                            <label>Please detail your trading experience with Over-the-Counter or Exchange
                                Traded Derivatives?
                                <br/>{isCN&&"请问您是否经常进行场外衍生品交易或交易所衍生品交易？"}
                                </label>
                            <div className="form-group">
                                {source && 
                                    <CreateRadios source={source.ExperienceLevels} name="ExchangeExperenceId"/>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Please detail your trading experience with shares or bonds.{isCN&&"请问您是否有过股票或者债券交易经验？"} </label>
                            <div className="form-group">
                                {source && 
                                    <CreateRadios source={source.ExperienceLevels} name="SharesOrBondsExperenceId"/>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Annual Income (USD equivalent){isCN&&"年收入 (美元计算)"}</label>
                            <div className="form-group">
                                {source &&
                                    <CreateRadios source={source.IncomeLevels} name="IncomeLevelsId"/>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Funds Available for Investment {isCN&&"可用于投资的金额"}
                            </label>
                            <div className="form-group">
                                {source && 
                                    <CreateRadios source={source.FundsAvailableLevels}name="FundsAvailableLevelsId"/>}
                            </div>
                        </div>
                        <hr/>
                        <label id="SourceOfIncome">Source Of Income {isCN&&"收入来源"}</label>
                        <SourceOfIncomeCard isCN={isCN} source={source}/>
                        {/* <div className="form-group">
                            <label>Source of funds for security trading 交易资金来源</label>
                            <div className="form-group">
                                {source && CreateRadios(source.FundSourceTypes, 'FundSourceTypesId')}
                            </div>
                        </div>

                        <Field
                            name="FundSourceTypesRemark"
                            component={InputField}
                            label="Source of funds Remark 资金来源說明"/> */}
                        <hr/>
                    </div>
                    <div id="1" className="steps">
                        <h3>Products Features and Risks  {isCN&&"产品特点及风险"}</h3>
                        <div className="form-group">
                            <label>I have clear understanding and knowledge that trading or investing in
                                financial products such as CFDs, Derivatives and Securities carry a high degree
                                of risk.
                                <br/>{isCN&&"我清楚的理解并且知道进行交易或投资诸如差价合约，衍生工具和证券等金融产品具有较高的风险。"}</label>
                            <div className="form-check-inline">
                                <Field
                                    type="radio"
                                    component="input"
                                    onChange={this.handleChange}
                                    name="ClearUnderstandingId"
                                    value="1"/>
                                Yes {isCN&&"是"}
                                <Field
                                    type="radio"
                                    component="input"
                                    onChange={this.handleChange}
                                    name="ClearUnderstandingId"
                                    value="2"/>
                                No {isCN&&"否"}
                            </div>
                        </div>
                        <hr/>
                        <Term/>
                    </div>
                    <div className="text-center">
                    <button onClick={this.handlePrevPage} className="btn btn-primary"> {isCN?"返回":"Back"} </button>
                    <button onClick={this.handleNextPage} className="btn btn-primary">{isCN?"下一步":"Next"}</button>
                    </div>
                </div>
                <DialogBox display={show_AlertDialog} togglePopUp={this.togglePopUp}>
                    {isCN?<ServiceInfoCN/>:<ServiceInfoEN/>}
                </DialogBox>
            </div>
        );
    }
}


const SourceOfIncome =[];
class SourceOfIncomeCard extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            disabledInput : true
        };
    }
    handleClick(e){
        const $target = $(e.target);
        
        if($target.is(":checked")){
            $target.parents('tr').find('input[type!="checkbox"]').attr('disabled',false)
        }else{
            $target.parents('tr').find('input[type!="checkbox"]').attr('disabled',true)
        }
        
    }
    handleChange(e){
        const target  = e.target
        const {isCN} = this.props
        const hasOtherDescrition = $('[name="SourceOfIncome[11].SourceOfIncomeDescription"]').val()
        const regDigits = (string) => new RegExp("^[\\d]+$").test(string);
        const regContainsSymbol = (string) => !new RegExp("^[ a-zA-Z\\u4e00-\\u9fa5\\d]+$").test(string);
        
        const errorType = {
            requiredField : isCN ? "Required 必填栏位" : "Required",
            errorNumber : isCN ? "请输入介于1~100的整数" : "Please enter full number 1~100",
            containsSymbol : isCN ? "不可輸入符號" : "Can not enter symbol" 
        }
        const NumError = (int) => {
            return (int < 1 || int > 100 || !regDigits(target.value))
        }
        const SetErrorMassage = (id,type) => {
            return this.setState({
                ['error_text'+id]: errorType[type]
            })
        }
        if(target.name.indexOf('SourceOfIncomePercent') && target.value && NumError(target.value)){
            SetErrorMassage(target.id,"errorNumber")
        }else{
            SetErrorMassage(target.id,"")
        }
        if(target.id == 11 && target.value ){
            if (target.value < 1 || target.value > 100 || !regDigits(target.value)){
                SetErrorMassage(target.id,"errorNumber")
            }else if (!hasOtherDescrition){
                SetErrorMassage(target.id,"requiredField")
            }else {
                SetErrorMassage(target.id,"")
            }
        }
        if(target.name.indexOf('SourceOfIncomeDescription' )){
            const id = $($(target)[0]).attr('dataid')
            
            if(target.value && regContainsSymbol(target.value)){
                
                SetErrorMassage(id,"containsSymbol")
            }else {
                SetErrorMassage(id,"")
            }
            
            if(id == 11 && !target.value){
                SetErrorMassage(id,"requiredField")
            }else if(id == 11 && target.value){
                if(!NumError(target.value) && !regContainsSymbol(target.value)){
                    SetErrorMassage(id,"")
                }
            }
        }
    }
   
    render (){
        const {source,isCN} = this.props
        const DataRow = [];
        source && source.SourceOfIncome.map((data,index)=>{
            DataRow.push( 
                <tr key={index}>
                    {/* <td width="20"> 
                        <Field name={`SourceOfIncome[${index}].SourceOfIncomeId`} id={index} component="input" value={index+1} onClick={this.handleClick} className="checkbox" type="checkbox"/> 
                    </td>  */}
                    <td width="20%"> 
                        {isCN&&data.TitleCn}  {data.TitleEn}
                    </td>
                    <td width="20%"> 
                        <Field name={`SourceOfIncome[${index}].SourceOfIncomePercent`}  id={index} onChange={this.handleChange} type="number" step="0.01" min="1" max="100" component="input"/> % 
                    </td> 
                    <td width="60%"> 
                        <Field name={`SourceOfIncome[${index}].SourceOfIncomeDescription`} dataid={index} onChange={this.handleChange} component="input"/> 
                        {this.state['error_text'+index] ?  <small className="red ml-2 soip-error">{this.state['error_text'+index]}</small> :null}
                    </td> 
                </tr>
            )
        })
        
        return[
            <table width="100%" key={1} className="SourceOfIncome-table">
                <thead>
                    <tr>
                        <th>{isCN?"收入来源":"Source of Income"}</th>
                        <th>{isCN?"收入百分比":"Percent of annual income"}</th>
                        <th>{isCN?"说明":"Description"}</th>
                    </tr>
                </thead>
                <tbody>
                   {DataRow}
                </tbody>
            </table>,
            <div key={2} className="red d-none">请将勾选的项目填写完整</div>
        ]
    }
}



InvestmentBackground = reduxForm({form: 'PersonalDetail'})(InvestmentBackground)

const CnInvestmentBackground = connect(state => {
    const source = state.info.source
    const dataForm = state.form
    
    return {source,dataForm};
})(InvestmentBackground)

export default CnInvestmentBackground;