import React, {Component} from 'react';

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar">
                <Panel pathName="/personal-detail" title="Personal Detail<br/>个人资料"/>
                <Panel pathName="/investment-background" title="Account Information<br/>帐户资料"/>
                <Panel pathName="/investment-background" title="Investment Background<br/>投资背景"/>
                <Panel pathName="/investment-background" title="Security Question<br/>投资背景"/>
                <Panel pathName="/declaration" title="Declaration<br/>声明"/>
                <Panel pathName="/finish" title="Finish<br/>完成"/> 
            </nav>
        );
    }
}

class Panel extends Component {
    render(){
        return(
            <div className={this.props.pathName === window.location.pathname ? "active panel-list" : " panel-list"}
            dangerouslySetInnerHTML={{
                __html: this.props.title
            }}>
            </div>
        )
    }
}


export default Navbar;