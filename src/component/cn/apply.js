import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Icon24 from '../../assets/svg/apply/icon-24h.svg';
import IconBrokerage from '../../assets/svg/apply/icon-brokerage.svg';
import IconChart from '../../assets/svg/apply/icon-chart.svg';
import IconStock from '../../assets/svg/apply/icon-stock.svg';
class CnApply extends Component {
    render() {
        return (
            <div className="col-lg-9 col-md-10  col-sm-5 col-center column-wrap apply-wrap">
                <div className="row">
                    <div className="col-md-4 left-wrap">
                        <h5>
                            {WEB_LANG('cn')?"帐户拥有4大优势":"Account has four major advantages"}
                        </h5>
                        <Link to='applyInfo' className="btn btn-primary hidden-md-down">
                            {WEB_LANG('cn')?"下一步":"Next"}
                        </Link>
                    </div>
                    <div className="col-md-8 right-wrap">
                        <ul className="icon-list">
                            <li><img src={IconBrokerage}/>
                                <div> {WEB_LANG('cn')?"低佣金":"Low commissions"}</div>
                            </li>
                            <li><img src={IconStock}/>
                                {WEB_LANG('cn')?<div>可在新西兰，澳大利亚，<br/>美国等海外股票市场进行交易</div>:<div>Trade the New Zealand, Australian, US and other overseas stock markets</div>}
                            </li>
                            <li><img src={Icon24}/>
                                <div>{WEB_LANG('cn')?"24小时服务":"24-hour service"}</div>
                            </li>
                            <li><img src={IconChart}/>
                                <div>{WEB_LANG('cn')?"每天进行专业和最实时的深入分析":"Professional and up to date in-depth analysis daily"}</div>
                            </li>
                        </ul>
                        <Link to='applyInfo' className="btn btn-primary hidden-lg-up"> {WEB_LANG('cn')?"下一步":"Next"}</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default CnApply;