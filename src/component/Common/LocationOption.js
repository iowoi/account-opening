import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';


class LocationOption extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {source,name, children, component, label} = this.props
        return (
            <Field component={component} name={name} label={label}className="custom-select">
                {children}
                {source && source
                    .CountryCode
                    .map((data, index) => {
                        return <option key={data.code} value={data.code}>{data.TitleEn} {data.TitleCn}</option>
                    })}
            </Field>

        );
    }
}

const mapStateToPorps = (state) => ({source: state.info.source})

LocationOption = connect(mapStateToPorps)(LocationOption)

export default LocationOption;