import React, {Component} from 'react';
import {Field} from 'redux-form';
class CreateOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            isCN :WEB_LANG('cn')
        }
    }
    render() {

        const {source} = this.props
        const {isCN} = this.state
        return source.map((data, index) => {
            return <option key={data.code} value={data.code}>{data.TitleEn} {isCN&&data.TitleCn}</option>
        })
    }
}

export default CreateOptions;