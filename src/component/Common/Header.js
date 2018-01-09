import React, {Component} from 'react';
import logo from '../../assets/svg/icn-logo.svg';
import {Link} from 'react-router-dom';

class Header extends Component {
    constructor(props){
        super(props)
        this.state={
            lang: WEB_LANG()
        }
    }
    render() {
        return (
            <div className="app-header">
                {location.pathname.indexOf('type') != -1 ?
                    <img src={logo} className="logo"/>
                : <a href={ROOT_PATH + WEB_LANG()}><img src={logo} className="logo"/></a>}
                <span className="short-line">|</span>
                <span className="title">
                <font>Open an Account</font>{WEB_LANG('cn') ?"开立帐户":null}</span>
            </div>
        );
    }
}

export default Header;