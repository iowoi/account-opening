import React, {Component} from 'react';
import FormHeader from './common/Header';
import {Field, reduxForm} from 'redux-form';
import autoBind from 'auto-bind';
import {connect} from 'react-redux'; 

import {InputField, DateField, SelectField, CreateRadios} from '../../Common';
import {Link} from 'react-router-dom';
const AreaArr = [];

class AccountInformation extends Component { 
    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleNextPage(e){
        e.preventDefault();
        this.props.handleRenderPage(this.props.nextPage);
    }
    handlePrevPage(e){
        e.preventDefault();
        this.props.handleRenderPage(this.props.prevPage);
    }


    render() {
        const {handleSubmit, className, pristine, reset, submitting, source} = this.props
        
        return (
            <div className={className}>
                <div className="form-page col-md-10 col-center" key={1}>
                    <form onSubmit={this.handleSubmit}>
                        <div id="0" className="steps">
                            <h3>Nature and Purpose 投资性质与目的</h3>
                            <div className="form-group">
                                <label>What is the nature and purpose of your relationship KVB? 您与KVB 昆仑国际建立关系的目的是什么？ *</label>
                                {source && CreateRadios(source.InvestmentTypes, 'InvestmentTypesId')}
                            </div>
                            <hr/>
                        </div>
                        <div id="1" className="steps">
                            <h3>Currency Type 开户币种 *</h3>
                            <div className="form-group">
                                <label>Currency Type 开户币种*</label>
                                {source && CreateRadios(source.CurrencyTypes, 'CurrencyTypesId')}
                            </div>
                            <hr/>
                        </div>
                        <div id="2" className="steps">
                            <h3>Account type 帐户类别
                            </h3>
                            <div className="form-group">
                                <label>Account type 帐户类别 *</label>
                                {source && CreateRadios(source.AccountType, 'AccountTypeId')}
                            </div>
                            <hr/>
                        </div>
                        <div id="3" className="steps">
                            <h3>Market access 交易市場</h3>
                            <div className="form-group">
                                <label>Market access 交易市場 *</label>
                                <div className="form-check-inline">
                                    <Field component="select" name="MarketAccessId">
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
                                    </Field>
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
                        </div>

                        <div className="text-center">
                            <button onClick={this.handlePrevPage} className="btn btn-primary">返回 </button>
                            <button onClick={this.handleNextPage} className="btn btn-primary">下一步 ></button>
                            </div>
                    </form>
                </div>
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
