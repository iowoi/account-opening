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
            disabled,
            customInputCss,
            customCss,
            defaultValue,
            type,
            min,
            max,
            dataId
        } = this.props
        return ( <div
                style={customCss}
                className={meta.touched && meta.error
                ? "has-danger form-group "
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
                    type="text"
                    min={min}
                    max={max}
                    disabled={disabled}
                    data-id={dataId}
                    value={disabled
                    ? ""
                    : defaultValue
                        ? defaultValue
                        : input.value}
                    style={customInputCss}
                    placeholder={placeholder}/> {meta.touched && meta.error
                    ? <div className="error-text">{meta.touched && meta.error}</div>
                    : <div className="error-text"></div>}
            </div>);
    }
}

export default inputField;