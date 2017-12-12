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
        const {steps} = this.props
        return (
            <header className="fixed">
                <Header/>
                <Navbar/>
                {steps ? <Stepper titles={steps}/>:null}
                
            </header>
        );
    }
}


export default FormHeader;