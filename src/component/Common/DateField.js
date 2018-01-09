import React, {Component} from 'react';
import Datetime from 'react-datetime';
import autoBind from 'react-autobind';

import moment from 'moment';
class DateField extends Component {
    constructor(props) {
		super(props);
		autoBind(this);
	}

    handleChange(e){
        this.props.change(this.props.input.name,e.endOf('days'))
    }
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
                    inputProps={{
                        placeholder:"dd/mm/YYYY",
                        name: input.name,
                        id: input.id
                    }}
                    closeOnSelect={true}
                    strictParsing={true}
                    value={input.value?moment(input.value).format("DD/MM/YYYY"):""}
                    onChange={this.handleChange}
                    />                    
                {meta.touched && meta.error || meta.dirty && meta.error
                    ? <div className="error-text">{meta.touched && meta.error || meta.dirty && meta.error}</div>
                    : null}
            </div>
        );
    }
}

export default DateField;