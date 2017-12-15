import React, {Component} from 'react';
import logo from '../../assets/svg/icn-logo.svg';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="app-header">
                <Link to={ROOT_PATH}><img src={logo} className="logo"/></Link>
                <span className="short-line">|</span>
                <span className="title">
                <font>Open an Account</font>开立帐户</span>
            </div>
        );
    }
}

export default Header;