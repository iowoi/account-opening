import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
class DateField extends Component {
    render() {
        const {label, labelInfo, meta, placeholder, input, disabled, children} = this.props
        moment(input.value)
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

                <DatePicker
                    className="form-control"
                    onChange={input.onChange}
                    
                    selected={input.value
                        ? input.value
                        : null}
                  
                    placeholderText="dd/mm/YYYY"/> 
                    
                {meta.touched && meta.error
                    ? <div className="error-text">{meta.touched && meta.error}</div>
                    : null}
            </div>
        );
    }
}

export default DateField;