import React, {Component} from 'react';
import {Field} from 'redux-form';
export const CreateRadios = (source, name, style) => {
    return style === 'inline'
        ? <div className="form-check-inline radio-field">
                {source.map((data, index) => {
                    return [
                        <Field
                                type="radio"
                                component="input"
                                name={name}
                                value={data
                                .code
                                .toString()} key={0}/>,<span key={1}> {data.TitleCn}</span>
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
                            .toString()}/> {data.TitleCn}
                    </div>
                )
            })}
        </div>

}


export const CreateOptions = (source) => {
    return source.map((data, index) => {
        return <option key={data.code} value={data.code}>{data.TitleEn} {data.TitleCn}</option>
    })
}