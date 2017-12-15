import React, {Component} from 'react';
import FormHeader from './common/Header';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {InputField} from '../../Common';
import autoBind from 'auto-bind';
import {connect} from 'react-redux';
import {CreateRadios, SelectField, CreateOptions} from '../../Common';

const validate = values => {
    const errors = {}  
     console.log(values)

    const requiredFields = ['SecurityQuestionsAnswer']
    if (!values.SecurityQuestionsAnswer || !values.SecurityQuestionsAnswer.length) {
        errors.SecurityQuestionsAnswer = { _error: 'At least one member must be entered' }
      }

      
    // requiredFields.forEach(field => {
    //     if (!values[field]) {
    //         errors[field] = 'Required'
    //     }
    // })
    return errors
}

class SecurityQuestions extends Component {
    constructor(props) {
        super(props);
        autoBind(this);

    }
    handleNextPage(e) {
        e.preventDefault();
        this.props.handleRenderPage(this.props.nextPage);
    }
    handlePrevPage(e) {
        e.preventDefault();
        this
            .props
            .handleRenderPage(this.props.prevPage);
    }

    render() {
        const steps = [
            {
                cn: "安全问题",
                en: "Security Questions"
            }
        ]
        const {pristine, submitting, source, style} = this.props
        console.log(this.props)
        return (
            <div style={style}>
                <FormHeader steps={steps} key={0}/>
                <div className="form-page col-md-10 col-center" key={1}>
                    <div id="step1" className="steps">
                        <h3>Security Questions 安全问题</h3>
                        <Field
                            name="SecurityQuestionsId[0]"
                            component={SelectField}
                            label="Security Question 1 安全问题 1*">
                            {source && CreateOptions(source.SecurityQuestions)}
                        </Field>
                        <Field name="SecurityQuestionsAnswer" component={InputField}/>

                        <Field
                            name="SecurityQuestionsId[1]"
                            component={SelectField}
                            label="Security Question 2 安全问题 2*">
                            {source && CreateOptions(source.SecurityQuestions)}
                        </Field>
                        <Field name="SecurityQuestionsAnswer[1]" component={InputField}/>

                        <Field
                            name="SecurityQuestionsId[2]"
                            component={SelectField}
                            label="Security Question 3 安全问题 3*">
                            {source && CreateOptions(source.SecurityQuestions)}
                        </Field>
                        <Field name="SecurityQuestionsAnswer[2]" component={InputField}/>
                    </div>
                   <div className="text-center">
                        <button onClick={this.handlePrevPage} className="btn btn-primary">返回
                        </button>
                        <button disabled={pristine || submitting}  onClick={this.handleNextPage} className="btn btn-primary">下一步</button>
                    </div>
                </div>
            </div>
        );
    }
}

SecurityQuestions = reduxForm({
    form: 'SecurityQuestions', validate
    // , asyncValidate
})(SecurityQuestions)

const CnSecurityQuestions = connect(state => {
    const source = state.info.source
    const initialValues = {
        SecurityQuestionsId: {
            0: '1'
        }
    }
    return {source, initialValues};
})(SecurityQuestions)

export default CnSecurityQuestions;