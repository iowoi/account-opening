import React, {Component} from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
class DateField extends Component {
    render() {
        const {label, labelInfo, meta, placeholder, input, disabled, children} = this.props
        //("meta.dirty",meta.dirty && meta.error)
        
        return (
            <div
                className={meta.touched && meta.error || meta.dirty && meta.error
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
                <Datetime 
                    onChange={input.onChange}
                    inputProps={{
                        placeholder:"dd/mm/YYYY",
                        name: input.name,
                        id: input.id
                    }}
                    value={input.value
                        ? input.value
                        : null} 
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                    />                    
                {meta.touched && meta.error || meta.dirty && meta.error
                    ? <div className="error-text">{meta.touched && meta.error || meta.dirty && meta.error}</div>
                    : null}
            </div>
        );
    }
}

export default DateField;