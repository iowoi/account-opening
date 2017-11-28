import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Icon24 from '../../assets/svg/apply/icon-24h.svg';
import IconBrokerage from '../../assets/svg/apply/icon-brokerage.svg';
import IconChart from '../../assets/svg/apply/icon-chart.svg';
import IconStock from '../../assets/svg/apply/icon-stock.svg';
class CnApply extends Component {
    render() {
        return (
            <div className="col-lg-9 col-md-10 col-center column-wrap apply-wrap">
                <div className="row">
                    <div className="col-lg-4 col-md-5 left-wrap">
                        <h5>帐户拥有4大优势</h5>
                        <Link to='/applyInfo' className="btn btn-primary">下一步</Link>
                    </div>
                    <div className="col-lg-8 col-md-7 right-wrap">
                        <ul className="icon-list">
                            <li><img src={IconBrokerage}/><div>低佣金</div></li>
                            <li><img src={IconStock}/><div>可在新西兰，澳大利亚，<br/>美国等海外股票市场进行交易</div></li>
                            <li><img src={Icon24}/><div>24小时服务</div></li>
                            <li><img src={IconChart}/><div>每天进行专业和最实时的深入分析</div></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default CnApply;