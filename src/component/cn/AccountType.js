import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Icon24 from '../../assets/svg/apply/icon-24h.svg';
import IconBrokerage from '../../assets/svg/apply/icon-brokerage.svg';
import IconChart from '../../assets/svg/apply/icon-chart.svg';
import IconStock from '../../assets/svg/apply/icon-stock.svg';
class CnAccountType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCN: WEB_LANG('cn')
        }
    }
    render() {
        const {isCN} = this.state
        return (
            <div
                className="col-lg-7 col-md-9 text-center col-center column-wrap account-type ">
                <div className="row">
                    <h4 className="blue-title ">{isCN
                            ? <span>请选择您的开户类别<br/></span>
                            : null}Please select an account type</h4>
                    <div className="col-md-6 left-wrap">
                        <div className="panel">
                            <a href="//accountopening.kvbkunlun.com/cn/index_1.html">
                                {isCN
                                    ? <span>保证金帐号<br/></span>
                                    : null}Margin Account
                            </a>
                        </div>

                    </div>
                    <div className="col-md-6 right-wrap">

                        <div className="panel">
                            <a href="term">{isCN
                                    ? <span>国际证券帐号<br/></span>
                                    : null}Security Account
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default CnAccountType;