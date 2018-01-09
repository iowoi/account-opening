
import React, {Component} from 'react';
import {Field} from 'redux-form';
class CreateRadios extends Component {
    constructor(props){
        super(props)
        this.state = {
            isCN :WEB_LANG('cn')
        }
    }
    render() {

        const {source, name, style} = this.props
        const {isCN} = this.state
        return style === 'inline'
        ? <div className="form-check-inline radio-field">
                {source.map((data, index) => {
                    conso
                    return [
                        <Field
                                type="radio"
                                component="input"
                                name={name}
                                value={data
                                .code
                                .toString()} key={0}/>,<span key={1}>{data.TitleEn} {isCN&&data.TitleCn}</span>
                            ]

                })}</div>
        : <div>
            {source.map((data, index) => {
                return (
                    <div key={data.code} className="radio-field">
                        <Field
                            type="radio"
                            component="input"
                            name={name}
                            value={data
                            .code
                            .toString()}/>{data.TitleEn} {isCN&&data.TitleCn}
                    </div>
                )
            })}
        </div>
    }
}

export default CreateRadios;