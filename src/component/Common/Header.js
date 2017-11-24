import React, {Component} from 'react';
import logo from '../../assets/img/logo_kvb.png';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header className="app-header">
                <div className="logo"><img src={logo}/></div>
                <div className="title">Open an Account 开立帐户</div>

                {/* <div className="clearfix"></div>
                <div className="float-right">
                    <Link to="/cn" className="btn btn-light">中文</Link>
                    <Link to="/en" className="btn btn-light">English</Link>
                </div>  */}
            </header>
        );
    }
}

export default Header;