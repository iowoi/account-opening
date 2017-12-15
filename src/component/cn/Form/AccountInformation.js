import React, {Component} from 'react';
import FormHeader from './common/Header';
import {Field, reduxForm} from 'redux-form';
import autoBind from 'auto-bind';

import {InputField, DateField, SelectField, CreateRadios} from '../../Common';
import {Link} from 'react-router-dom';
const AreaArr = [];

const validate = values => {
    const errors = {}
    const requiredFields = ['gender']
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

class CnAccountInformation extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        
    }

    handleChange(event, index, value) {
        //console.log(event, index, value)
        // this.setState({loc:value})
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
        const steps = [
            {
                cn: "投资性质与目的",
                en: "Nature and Purpose"
            }, {
                cn: "开户币种",
                en: "Currency Type"
            }, {
                cn: "帐户类别",
                en: "Account type"
            }, {
                cn: "交易市場",
                en: "Market access"
            }
        ]
        const {source} = this.props;

        return (
            <div style={this.props.style}>
                <FormHeader steps={steps} key={0}/>
                <div className="form-page col-md-10 col-center" key={1}>
                    <form onSubmit={this.handleSubmit}>
                        <div id="0" className="steps">
                            <h3>Nature and Purpose 投资性质与目的</h3>

                            <div className="form-group">
                                <label>What is the nature and purpose of your relationship KVB? 您与KVB 昆仑国际建立关系的目的是什么？</label>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    Medium term investment 中期投资
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="female"/>
                                    Long term capital growth 长期资本增值
                                </div>
                                <div className="d-block">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    Dividend yield / 股息收益/固定收益
                                </div>
                            </div>
                            <hr/>
                        </div>
                        <div id="1" className="steps">
                            <h3>Currency Type 开户币种</h3>
                            <div className="form-group">
                                <label>Currency Type 开户币种*</label>
                                <div className="form-check-inline">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    USD 美元
                                    <Field type="radio" component="input" name="gender" value="female"/>
                                    NZD 纽元
                                    <Field type="radio" component="input" name="gender" value="female"/>
                                    AUD 澳元
                                    <Field type="radio" component="input" name="gender" value="female"/>
                                    JPY 日元
                                </div>
                            </div>
                            <hr/>
                        </div>
                        <div id="2" className="steps">
                            <h3>Account type 帐户类别
                            </h3>
                            <div className="form-group">
                                <label>Account type 帐户类别*</label>
                                {source && CreateRadios(source.AccountType, 'AccountType')}
                            </div>
                            <hr/>
                        </div>
                        <div id="3" className="steps">
                            <h3>Market access 交易市場</h3>
                            <div className="form-group">
                                <label>Market access 交易市場*</label>
                                <div className="form-check-inline">
                                    <Field component="select" name="MarketAccess">
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
                            <button onClick={this.handleNextPage} className="btn btn-primary">下一步 </button>
                           
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

CnAccountInformation = reduxForm({
    form: 'AccountInformation', validate
    // , asyncValidate
})(CnAccountInformation)

export default CnAccountInformation;
