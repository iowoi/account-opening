import React, {Component} from 'react';
import FormHeader from './common/Header';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {InputField} from '../../Common';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateRadios, SelectField, CreateOptions} from '../../Common';
import $ from 'jquery';

const validate = values => {
    const errors = {}
    console.log(values)

    // requiredFields.forEach(field => {     if (!values[field]) {
    // errors[field] = 'Required'     } })
    return errors
}

class SecurityQuestions extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            currentId: 0,
            error_Answer0: {
                touched: false,
                error: null
            },
            error_Answer1: {
                touched: false,
                error: null
            },
            error_Answer2: {
                touched: false,
                error: null
            }
        }
    }

    handleChange(e) {
        const target = e.target
        const $target = $($(target)[0])
        const id = $target.attr('data-id');

        const {currentId} = this.state
        if (target.value) {
            this.setState({
                currentId: id,
                ['error_Answer' + id]: {
                    touched: true,
                    error: 'Required 必填栏位'
                }
            })
        }
        if (target.name === `SecurityQuestions[${currentId}].SecurityQuestionsAnswer` && target.value) {
            this.setState({
                ['error_Answer' + id]: {
                    error: null
                }
            })
        }
    }

    handlePrevPage(e) {
        e.preventDefault();
        this.props.handleRenderPage(this.props.prevPage);
    }

    handleNextPage(e) {
        e.preventDefault();
        for(let i=0; i<3; i++){
            if(this.state['error_Answer'+i].error){
                return false;
            }
        }
        this.props.handleRenderPage(this.props.nextPage);
    }

    render() {
        const {pristine, className, submitting, source, style} = this.props
        const {error_Answer0, error_Answer1, error_Answer2} = this.state
        //  console.log(this.props)
        return (
            <div className={className}>
                <div className="form-page col-md-10 col-center">
                    <div id="step1" className="steps">
                        <h3>Security Questions 安全问题</h3>
                        <Field
                            name="SecurityQuestions[0].SecurityQuestionsId"
                            dataId="0"
                            component={SelectField}
                            onChange={this.handleChange}
                            label="Security Question 1 安全问题 1*">
                            <option>-- select --</option>
                            {source && CreateOptions(source.SecurityQuestions)}
                        </Field>
                        <Field
                            name="SecurityQuestions[0].SecurityQuestionsAnswer"
                            onChange={this.handleChange}
                            dataId="0"
                            meta={error_Answer0}
                            component={InputField}/>

                        <Field
                            name="SecurityQuestions[1].SecurityQuestionsId"
                            dataId="1"
                            component={SelectField}
                            onChange={this.handleChange}
                            label="Security Question 2 安全问题 2*">
                            <option>-- select --</option>
                            {source && CreateOptions(source.SecurityQuestions)}
                        </Field>
                        <Field
                            name="SecurityQuestions[1].SecurityQuestionsAnswer"
                            onChange={this.handleChange}
                            dataId="1"
                            meta={error_Answer1}
                            component={InputField}/>

                        <Field
                            name="SecurityQuestions[2].SecurityQuestionsId"
                            dataId="2"
                            component={SelectField}
                            onChange={this.handleChange}
                            label="Security Question 3 安全问题 3*">
                            <option>-- select --</option>
                            {source && CreateOptions(source.SecurityQuestions)}
                        </Field>
                        <Field
                            name="SecurityQuestions[2].SecurityQuestionsAnswer"
                            onChange={this.handleChange}
                            meta={error_Answer2}
                            component={InputField}/>
                    </div>
                    <div className="text-center">
                        <button onClick={this.handlePrevPage} className="btn btn-primary">返回
                        </button>
                        <button
                            disabled={pristine}
                            onClick={this.handleNextPage}
                            className="btn btn-primary">下一步</button>
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
    const dataForm = state.form

    return {source, initialValues, dataForm};
})(SecurityQuestions)

export default CnSecurityQuestions;