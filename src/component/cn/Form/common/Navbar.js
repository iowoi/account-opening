import React, {Component} from 'react';
import ActiveLabel from '../../../../assets/svg/icon-triangle.svg';

class Navbar extends Component {
    
    render() {
        console.log("THIS",this)
        const Navs = [
            {
                pathName: '/personal-detail',
                en: 'Personal Detail',
                cn: '个人资料'
            }, {
                pathName: '/account-information',
                en: 'Account Information',
                cn: '帐户资料'
            }, {
                pathName: '/investment-background',
                en: 'Investment Background',
                cn: '投资背景'
            }, {
                pathName: '/security-question',
                en: 'Security Question',
                cn: '投资背景'
            }, {
                pathName: '/declaration',
                en: 'Declaration',
                cn: '声明'
            }, {
                pathName: '/finish',
                en: 'Finish',
                cn: '完成'
            }
        ]
        console.log(window
            .location
            .pathname)
        return (
            <div>
                <div className="navbar hidden-md-down">
                    <nav className="navbar-nav col-lg-10 col-sm-12 col-center">
                        {Navs.map((nabs,index) =>
                                <Panel
                                    key={index}
                                    pathName={nabs.pathName}
                                    title={'<span>' + nabs.en + '</span><br/>' + nabs.cn}/>
                            )}
                    </nav>
                </div>
                
                <div className="mb-navbar hidden-lg-up">
                    {Navs.map( (nabs,index) => {
                        if(window.location.pathname
                            .indexOf(nabs.pathName) > -1){
                                return (
                                    <div key={index}>
                                        Personal Details 个人资料
                                        <span>Step {index+1} of 5</span>
                                    </div>
                                )
                            }
                        })
                    }

                    <div className="nav-step">
                        {Navs.map((nabs,index) => {
                                if(index<5){
                                    return (
                                        <MbPanel
                                            key={index}
                                            id={index}
                                            pathName={nabs.pathName}
                                            title={'<span>' + nabs.en + '</span><br/>' + nabs.cn}/>
                                    )
                                }
                            })}
                    </div>
                </div>
            </div>

        )
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

class MbPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: window
                .location
                .pathname
                .indexOf(props.pathName) !== -1
                ? "active "
                : ""
        }
    }
    render() {
        const {active} = this.state
        return (
            <div className={`${active}nav-dash`}></div>

        )
    }
}

export default Navbar;