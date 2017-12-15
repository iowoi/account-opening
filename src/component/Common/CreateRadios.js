import React, {Component} from 'react';
import {Field} from 'redux-form';
const CreateRadios = (source, name) => {
    return source.map((data, index) => {
        return (
            <div key={data.code}>
                <Field type="radio" component="input" name={name} value={data.code}/> {data.TitleCn}
            </div>
        )
    })
}

export default CreateRadios;
