import React, {Component} from 'react';
import {TextField} from 'material-ui';

class inputField extends Component {

    render() {
        const {
            label,
            labelInfo,
            meta,
            placeholder,
            input,
            disabled
        } = this.props

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

                <input
                    className="form-control"
                    id={input.name}
                    {...input}
                    disabled={disabled}
                    value={disabled
                    ? ""
                    : input.value}
                    placeholder={placeholder}/> {meta.touched && meta.error
                    ? <div className="error-text">{meta.touched && meta.error}</div>
                    : null}
            </div>
        );
    }
}

export default inputField;