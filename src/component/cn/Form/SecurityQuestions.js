import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputField } from '../../Common';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { SelectField, CreateOptions } from '../../Common';
import $ from 'jquery';

class SecurityQuestions extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			isCN: WEB_LANG('cn'),
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
		const id = target.getAttribute('data-id'); 
		let inputAns = $(`input[name="SecurityQuestions[${id}].SecurityQuestionsAnswer"]`).val();
		const {currentId} = this.state
		const regNumEn = new RegExp("^[\\da-zA-Z ]+$"); 
		const {isCN} = this.state
		if (target.value && !inputAns) {
			this.setState({
				currentId: id,
				['error_Answer' + id]: {
					touched: true,
					error: isCN ? "Required 必填栏位" : "Required"
				}
			})
		}
		if(target.value && !regNumEn.test(target.value)){
			this.setState({
				currentId: id,
				['error_Answer' + id]: {
					touched: true,
					error: isCN ? "只能输入英文或数字" : "Only enter English or numbers" 
				}
			})
		}
		if (target.name === `SecurityQuestions[${id}].SecurityQuestionsAnswer` && target.value && regNumEn.test(target.value)) { 
			this.setState({
				['error_Answer' + id]: {
					error: null
				}
			})
		}
		if(target.name === `SecurityQuestions[${id}].SecurityQuestionsId`){
			this.props.change(`SecurityQuestions[${id}].SecurityQuestionsAnswer`,"")
		}
	}

	handlePrevPage(e) {
		e.preventDefault();
		this.props.handleRenderPage(this.props.prevPage);
	}

	handleNextPage(e) {
		e.preventDefault();
		let selectedArr = []
		let validError = false
		const $select =  $('.security-card select')
		const $input =  $('.security-card input')
		const {isCN} = this.state
        
		for(let i=0; i<$select.length; i++ ){
			const selectVal = $($select[i]).val()
			const inputVal = $($input[i]).val()
			if(!inputVal){
				this.setState({
					currentId: i,
					['error_Answer' + i]: {
						touched: true,
						error: isCN ? "Required 必填栏位" : "Required"
					}
				})
				validError = true
			}
			if(selectVal){
				selectedArr.push(selectVal)
			}else if(!selectVal) {
				this.setState({
					currentId: i,
					['error_Answer' + i]: {
						touched: true,
						error: isCN ? "Please choose a question 请选择问题" : "Please choose a question"
					}
				})
				validError = true
			} 
		}

		const valueArr = selectedArr.map(item => item);        
		const isDuplicate = valueArr.some((item, idx) => { 
			if(valueArr.indexOf(item) != idx){
				alert(isCN ? "问题不得重复" : "Questions can not be repeated.")
				validError = true
			}
		});
		for(let i=0; i<3; i++){
			if(this.state['error_Answer'+i].error){
				validError = true
			}
		}
		if(validError){
			return false;
		}
		this.props.handleRenderPage(this.props.nextPage);
	}

	render() {
		const {pristine, className, submitting, source, style} = this.props
		const {error_Answer0, error_Answer1, error_Answer2, isCN} = this.state
		return (
			<div className={className}>
				<div className="form-page col-md-10 col-center security-card">
					<div id="step1" className="steps">
						<h3>Security Questions {isCN&&"安全问题"}</h3>
						<Field
							name="SecurityQuestions[0].SecurityQuestionsId"
							dataId="0"
							component={SelectField}
							onChange={this.handleChange}
							label={`Security Question 1 ${isCN ? "安全问题 1" : ""}*`}>
							<option value="">-- select --</option>
							{source && <CreateOptions source={source.SecurityQuestions}/>}
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
							label={`Security Question 2 ${isCN ? "安全问题 2" : ""}*`}>
							<option value="">-- select --</option>
							{source && <CreateOptions source={source.SecurityQuestions}/>}
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
							label={`Security Question 3 ${isCN ? "安全问题 3" : ""}*`}>
							<option value="">-- select --</option>
							{source && <CreateOptions source={source.SecurityQuestions}/>}
						</Field>
						<Field
							name="SecurityQuestions[2].SecurityQuestionsAnswer"
							onChange={this.handleChange}
							dataId="2" 
							meta={error_Answer2}
							component={InputField}/>
					</div>
					<div className="text-center">
						<button onClick={this.handlePrevPage} className="btn btn-primary">{isCN?"返回":"Back"} 
						</button>
						<button
							onClick={this.handleNextPage}
							className="btn btn-primary">{isCN?"下一步":"Next"}</button>
					</div>
				</div>
			</div>
		);
	}
}


SecurityQuestions = reduxForm({
	form: 'SecurityQuestions'
	// , asyncValidate
})(SecurityQuestions)

const CnSecurityQuestions = connect(state => { 
	const source = state.info.source 
	const dataForm = state.form 

	return {source, dataForm}; 
})(SecurityQuestions) 

export default CnSecurityQuestions;