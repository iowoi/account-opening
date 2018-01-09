import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'
import {Link} from 'react-router-dom';
import autoBind from 'react-autobind';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {LocationOption,SelectField} from '../Common';
import {Term} from './Card/term';


class CnTerm extends Component {
    constructor(props) {
        super(props);
        autoBind(this)
        this.state = {
            lang:WEB_LANG()
        }
    }

    handleSubmit(e) {
        const location = {
            
            pathname: ROOT_PATH + this.state.lang+'/apply'
        }
        //("location",location)
        this.props.sendLocation(e)
        this.props.history.push(location)
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <div className="col-lg-9 col-md-10 col-center column-wrap">
                <div className="row">
                    <form onSubmit={handleSubmit(this.handleSubmit)}>
                        <div className="col-lg-4 col-md-5 left-wrap">
                            <h4>{WEB_LANG('cn')?
                            "请先选取你的居住地":"To Get Started, Please Choose Your Country Or Region Of Residence"}</h4>
                            <LocationOption component={SelectField} name="loc"/>
                            <p>
                            {WEB_LANG('cn')? "*若您的居住地没有在表上，请您电邮到":
                                "* For countries or regions not listed, please email your inquiry to"}
                                <a href="mailto:onlineaccount@kvbkunlun.com">
                                    onlineaccount@kvbkunlun.com</a>。</p>
                            <button className="btn btn-primary hidden-md-down" type="submit">
                            {WEB_LANG('cn')?"下一步":"Next"}</button>
                        </div>
                        <div className="col-lg-8 col-md-7 right-wrap">
                            <Term/>
                            <button className="btn btn-primary hidden-lg-up" type="submit">{WEB_LANG('cn')?"下一步":"Next"}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}



CnTerm = reduxForm({form: 'location'})(CnTerm);


export default CnTerm;