import React, {Component} from 'react';
import FormHeader from './common/Header';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {InputField} from '../../Common';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateRadios, SelectField, CreateOptions} from '../../Common';

const validate = values => {
    const errors = {}  
    // console.log(values)

    // const requiredFields = ['SecurityQuestions']
    // if (!values.SecurityQuestionsAnswer || !values.SecurityQuestionsAnswer.length) {
    //     errors.SecurityQuestionsAnswer = { _error: 'At least one member must be entered' }
     
    
    // }

      
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
        const {pristine, className, submitting, source, style} = this.props
      //  console.log(this.props)
        return (
            <div className={className}>
                <div className="form-page col-md-10 col-center">
                    <div id="step1" className="steps">
                        <h3>Security Questions 安全问题</h3>
                        <Field
                            name="SecurityQuestions[0].SecurityQuestionsId"
                            component={SelectField}
                            label="Security Question 1 安全问题 1*">
                            <option>-- select --</option>
                            {source && CreateOptions(source.SecurityQuestions)}
                        </Field>
                        <Field name="SecurityQuestions[0].SecurityQuestionsAnswer" component={InputField}/>

                        <Field
                            name="SecurityQuestions[1].SecurityQuestionsId"
                            component={SelectField}
                            label="Security Question 2 安全问题 2*">
                            <option>-- select --</option>
                            {source && CreateOptions(source.SecurityQuestions)}
                        </Field>
                        <Field name="SecurityQuestions[1].SecurityQuestionsAnswer" component={InputField}/>

                        <Field
                            name="SecurityQuestions[2].SecurityQuestionsId"
                            component={SelectField}
                            label="Security Question 3 安全问题 3*">
                            <option>-- select --</option>
                            {source && CreateOptions(source.SecurityQuestions)}
                        </Field>
                        <Field name="SecurityQuestions[2].SecurityQuestionsAnswer" component={InputField}/>
                    </div>
                   <div className="text-center">
                        <button onClick={this.handlePrevPage} className="btn btn-primary">返回
                        </button>
                        <button disabled={pristine}  onClick={this.handleNextPage} className="btn btn-primary">下一步</button>
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