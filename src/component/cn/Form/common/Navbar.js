import React, {Component} from 'react';
import ActiveLabel from '../../../../assets/svg/icon-triangle.svg';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar hidden-md-down">
                <nav className="navbar-nav col-lg-10 col-sm-12 col-center">
                    <Panel
                        pathName="/personal-detail"
                        title="<span>Personal Detail</span><br/>个人资料"/>
                    <Panel
                        pathName="/account-information"
                        title="<span>Account Information</span><br/>帐户资料"/>
                    <Panel
                        pathName="/investment-background"
                        title="<span>Investment Background</span><br/>投资背景"/>
                    <Panel
                        pathName="/security-question"
                        title="<span>Security Question</span><br/>投资背景"/>
                    <Panel pathName="/declaration" title="<span>Declaration</span><br/>声明"/>
                    <Panel pathName="/finish" title="<span>Finish</span><br/>完成"/>
                </nav>
            </div>
        );
    }
}



class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: window
                .location
                .pathname
                .indexOf(props.pathName) !== -1
                ? "active"
                : ""
        }
    }
    render() {
        const {active} = this.state
        return (
            <div className={`${active} panel-list`}>
                <div
                    className="panel-title"
                    dangerouslySetInnerHTML={{
                    __html: this.props.title
                }}></div>
                <div className="active-label">
                    {active
                        ? <img src={ActiveLabel}/>
                        : null}
                </div>
            </div>
        )
    }
}

export default Navbar;