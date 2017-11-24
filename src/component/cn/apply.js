import React, {Component} from 'react';
import { Link } from 'react-router-dom';
class CnApply extends Component {
    render() {
        return (
            <section className="row">
                <div className="col-md-6 col-center">
                    <h3>保证金帐户优势</h3>
                    <ul className="list-style">
                        <li>Low commissions 低佣金</li>
                        <li>24-hour service 24小时服务</li>
                        <li>Trade the New Zealand, Australian, US and other overseas stock markets
                            可在新西兰，澳大利亚，美国等海外股票市场进行交易</li>
                        <li>Professional and up to date in-depth analysis daily 每天进行专业和最实时的深入分析</li>
                    </ul>
                    <Link to="applyInfo" className="btn btn-primary">立即申请</Link>
                </div>
            </section>
        );
    }
}

export default CnApply;