import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class CnApply extends Component {
    render() {
        return (
            <div className="col-lg-9 col-md-10 col-center term-wrap">
                <div className="row">
                    <div className="col-lg-4 col-md-5 left-wrap">
                        <h4>保证金帐户优势</h4>
                        <Link to="applyInfo" className="btn btn-primary">下一步</Link>
                    </div>
                    <div className="col-lg-8 col-md-7 right-wrap">
                        <ul className="list-style">
                            <li>Low commissions 低佣金</li>
                            <li>24-hour service 24小时服务</li>
                            <li>Trade the New Zealand, Australian, US and other overseas stock markets
                                可在新西兰，澳大利亚，美国等海外股票市场进行交易</li>
                            <li>Professional and up to date in-depth analysis daily 每天进行专业和最实时的深入分析</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default CnApply;