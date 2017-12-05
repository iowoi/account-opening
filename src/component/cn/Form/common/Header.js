import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Stepper from './Stepper';
import Navbar from './Navbar';
import $ from 'jquery';
import { Header } from '../../../Common/index';

class FormHeader extends Component {
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll(event) {
        const domElm = $('.navbar')
        const header = $('header')
        const stepper = $('.stepper')
        const scrollPos = window.scrollY
        // console.log("scrollPos:"+scrollPos,"domElm:"+domElm.offset().top)

        if (scrollPos >=  header.height()) {
            header.addClass('fixed')
        } 

    }

    render() {
        const steps = [
            {cn:"个人申请", en:"Individual Applicant"},
            {cn:"就业资料", en:"Employment Information"},
            {html:"<font class='hidden-lg-down'>Common Reporting Standard</font>普通报告标准</font> <br/> <font class='hidden-lg-down'>Individual Self-Certification</font>个人认证"},
        ]
        return (
            <header className="fixed">
                <Header/>
                <Navbar/>
                <Stepper titles={steps}/>
            </header>
        );
    }
}


export default FormHeader;