import React, {Component} from 'react';
import FormHeader from './common/Header';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {InputField} from '../../Common';

const validate = values => {
    const errors = {}
    const requiredFields = ['gender']
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    return errors
}

class SecurityQuestions extends Component {
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
                cn: "安全问题",
                en: "Security Questions"
            }
        ]
        return (
            <div>
                <FormHeader steps={steps} key={0}/>
                <div className="form-page col-md-10 col-center" key={1}>
                    <form onSubmit={this.handleSubmit}>
                        <div id="step1" className="steps">
                            <h3>Security Questions 安全问题</h3>

                            <div className="form-group">
                                <label className="d-block">Security Question 1 安全问题 1</label>
                                <Field
                                    name="taxResidentCountries"
                                    component="select"
                                    className="mt-0 custom-select">
                                    <option value="">-- please select the question --</option>
                                </Field>
                                <Field name="contactNumber" className="form-control" component={InputField}/>
                            </div>
                            <div className="form-group">
                                <label className="d-block">Security Question 2 安全问题 2</label>
                                <div className=" mt-2">
                                <Field
                                    name="taxResidentCountries"
                                    component="select"
                                    className="mt-0 custom-select">
                                    <option value="">-- please select the question --</option>
                                </Field>
                                </div>
                                <Field name="contactNumber" className="form-control" component={InputField}/>
                            </div>
                            <div className="form-group">
                                <label className="d-block">Security Question 3 安全问题 3</label>
                                <Field
                                    name="taxResidentCountries"
                                    component="select"
                                    className="mt-0 custom-select">
                                    <option value="">-- please select the question --</option>
                                </Field>
                                <Field name="contactNumber" className="form-control" component={InputField}/>
                            </div>
                        </div>
                        <div className="text-center">
                            <Link to="investment-background" className="btn btn-primary">返回
                            </Link>
                            <Link to="declaration" className="btn btn-primary">下一步
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

SecurityQuestions = reduxForm({
    form: 'SecurityQuestions', validate
    // , asyncValidate
})(SecurityQuestions)

export default SecurityQuestions;
