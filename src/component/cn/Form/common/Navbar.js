import React, {Component} from 'react';
import ActiveLabel from '../../../../assets/img/icon-triangle.png';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isCN :WEB_LANG('cn')
        }
    }
    render() {
        const {isCN} = this.state
        let Navs = [
            {
                pathName: 'personal-detail',
                en: 'Personal Detail',
                cn: '个人资料'
            }, {
                pathName: 'account-information',
                en: 'Account Information',
                cn: '帐户资料'
            }, {
                pathName: 'investment-background',
                en: 'Investment Background',
                cn: '投资背景'
            }, {
                pathName: 'security-question',
                en: 'Security Question',
                cn: '安全问题'
            }, {
                pathName: 'declaration',
                en: 'Declaration',
                cn: '声明'
            }, {
                pathName: 'finish',
                en: 'Finish',
                cn: '完成'
            }
        ]
        if(!isCN){
            Navs = [
                {
                    pathName: 'personal-detail',
                    en: 'Personal Detail',
                    cn: ''
                }, {
                    pathName: 'account-information',
                    en: 'Account Information',
                    cn: ''
                }, {
                    pathName: 'investment-background',
                    en: 'Investment Background',
                    cn: ''
                }, {
                    pathName: 'security-question',
                    en: 'Security Question',
                    cn: ''
                }, {
                    pathName: 'declaration',
                    en: 'Declaration',
                    cn: ''
                }, {
                    pathName: 'finish',
                    en: 'Finish',
                    cn: ''
                }
            ]
        }
        
        const {currentPage} = this.props
        return (
            <div className={!isCN?"en-navbar":null}>
                <div className="navbar hidden-md-down">
                    <nav className="navbar-nav col-lg-10 col-sm-12 col-center">
                        {Navs.map((nabs,index) =>
                                <Panel
                                    key={index}
                                    pathName={nabs.pathName}
                                    active={currentPage === nabs.pathName ? "active" : null}
                                    title={'<span>' + nabs.en + '</span><br/>' + nabs.cn}/>
                            )}
                    </nav>
                </div>
                
                <div className="mb-navbar hidden-lg-up">
                    {Navs.map( (nabs,index) => {
                        if(currentPage && currentPage
                            .indexOf(nabs.pathName) > -1){
                                return (
                                    <div key={index} style={{position:"relative",top: "2px"}}>
                                        {nabs.en} {nabs.cn}
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
                                            active={currentPage === nabs.pathName ? "active" : null}
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
    }
    render() {
        const {active} = this.props
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
    }
    render() {
        const {active} = this.props
        return (
            <div className={`${active} nav-dash`}></div>
        )
    }
}

export default Navbar;