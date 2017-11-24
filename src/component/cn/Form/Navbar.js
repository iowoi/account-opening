import React, {Component} from 'react';

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar">
                <Panel pathName="/cn/personal-detail" title={<div>Personal Detail<br/>个人资料</div>}/>
                <Panel pathName="/cn/account-information" title={<div>Account Information<br/>帐户资料</div>}/>
                <Panel pathName="/cn/investment-background" title={<div>Investment Background<br/>投资背景</div>}/>
                <Panel pathName="/cn/declaration" title={<div>Declaration<br/>声明</div>}/>
                <Panel pathName="/cn/finish" title={<div>Finish<br/>完成</div>}/> 
            </nav>
        );
    }
}

class Panel extends Component {
    render(){
        return(
            <div className={this.props.pathName === window.location.pathname ? "active" : null}>
                {this.props.title}
            </div>
        )
    }
}


export default Navbar;