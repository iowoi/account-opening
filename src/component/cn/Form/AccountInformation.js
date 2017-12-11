import React, {Component} from 'react';
import FormHeader from './common/Header';
import {Field, reduxForm} from 'redux-form';
import {InputField, DateField, SelectField} from '../../Common';
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

class CnAccountInformation extends Component {
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
                cn: "投资性质与目的",
                en: "Nature and Purpose"
            }, {
                cn: "开户币种",
                en: "Currency Type"
            }
        ]
        return (
            <div>
                <FormHeader steps={steps} key={0}/>
                <div className="form-page col-md-10 col-center" key={1}>
                    <form onSubmit={this.handleSubmit}>
                        <div id="step1" className="steps">
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
                            <h3>Currency Type 开户币种</h3>
                            <div className="form-group">
                                <label>Gender 性别*</label>
                                <div className="form-check-inline">
                                    <Field type="radio" component="input" name="gender" value="male"/>
                                    USD  美元
                                    <Field type="radio" component="input" name="gender" value="female"/>
                                    NZD  纽元
                                    <Field type="radio" component="input" name="gender" value="female"/>
                                    AUD  澳元
                                    <Field type="radio" component="input" name="gender" value="female"/>
                                    JPY  日元
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <Link to="personal-detail" className="btn btn-primary">返回
                        </Link>
                            <Link to="investment-background" className="btn btn-primary">下一步
                        </Link>
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
