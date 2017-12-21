import React, {Component} from 'react';
import {TextField} from 'material-ui';

class SelectField extends Component {
    render() {
        const {label, labelInfo, meta, placeholder, input, disabled, children,id, dataId} = this.props
        return (
            <div
                className={meta.touched && meta.error
                ? "has-danger form-group"
                : "form-group"}>

                {label
                    ? <label className="d-block">{label}</label>
                    : null}

                {labelInfo
                    ? <small
                            dangerouslySetInnerHTML={{
                            __html: labelInfo
                        }}></small>
                    : null}

                <select className="custom-select"
                    id={id} 
                    data-id={dataId}
                    {...input}  >
                    {children}
                </select> 
                
                {meta.touched && meta.error
                    ? <div className="error-text">{meta.touched && meta.error}</div>
                    : null}
            </div>
        );
    }
}

export default SelectField;