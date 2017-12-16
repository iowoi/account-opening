import React, {Component} from 'react';
import {TextField} from 'material-ui';
import $ from 'jquery';

class inputField extends Component {
    constructor(props){
        super(props)
        
    }
    componentDidMount(){
       // console.log(this)
        // this.nameInput.focus();
    }


    componentWillMount(){
        console.log(this)
        
    }
    
    render() {    
        const {label, labelInfo, meta, placeholder, input, disabled} = this.props
        // if(meta.submitFailed && meta.error){
        //     console.log(input.name)
        //     $(`input[name=${input.name}]`).focus();
        // }
        return (
            <div
                className={meta.touched && meta.error
                ? "has-danger form-group"
                : "form-group"}>

                {label
                    ? <label>{label}</label>
                    : null}

                {labelInfo
                    ? <small
                            dangerouslySetInnerHTML={{
                            __html: labelInfo
                        }}></small>
                    : null}

                <input className="form-control" 
                    {...input} 
                    disabled={disabled} 
                    value={disabled? "" : input.value}
                    placeholder={placeholder}
                    
                    /> 
                
                {meta.touched && meta.error
                    ? <div className="error-text">{meta.touched && meta.error}</div>
                    : null}
            </div>
        );
    }
}

export default inputField;