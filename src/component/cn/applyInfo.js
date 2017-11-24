import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ApplyInfo extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="apply-info">
                <section className="col-md-8 col-center icon-btns">
                    <div className="row">
                        <div className="col-md-4">填写线上申请表</div>
                        <div className="col-md-4">提交证明文件及W-8BEN Form</div>
                        <div className="col-md-4">通过电子邮件接收Tranding Star帐户及登陆信息</div>
                    </div>
                    <p>
                        您若希望开立KVB昆仑国际的个人账户，必须符合以下的资格及证明文件要求。<br/>
                        关于其他的账户类型，请发电子邮件至<a href="mailto:onlineaccount@kvbkunlun.com">onlineaccount@kvbkunlun.com</a>查询。

                    </p>
                </section>
                <hr/>
                <section className="col-md-8 col-center">
                    <div className="row mb-5">
                        <div className="col-md-2">资格要求</div>
                        <div className="col-md-10">
                            于KVB昆仑国际开立账户，您必须年满18岁。
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-md-2">证明文件要求</div>
                        <div className="col-md-10">
                            为了帮助反洗钱和打击资助恐怖主义活动，条例规定所有金融服务机构需要获取、核实和记录可以证明账户开立人身份的相关信息。因此，我们需要获取以下相关的文件：
                            <h6>您需要提供以下三类文件：</h6>
                            <ul>
                                <li>1. 身份（姓名）和出生日期证明;</li>
                                <li>2. 地址证明;</li>
                                <li>3. 银行账户证明。</li>
                            </ul>
                            <h6>可接受的证明文件（每个种类只需提供一种文件）</h6>
                            <p>> 身份证明（该文件必须包括您的姓名，出生日期和照片，并且当前有效。中国大陆的客戶如果提交了身分证的正反面就不需要再提交地址证明。）</p>
                            <ul className="list-style">
                                <li>护照</li>
                                <li>居民身份证</li>
                                <li>新西兰或澳大利亚有效驾照及以下任何一份文件：</li>
                                <ol>
                                    <li>由本地注册银行发行的，载有持卡人姓名及签署样本的信用卡、借记卡或储蓄账户卡片(EFTPOS)</li>
                                    <li>由本地注册银行出示的，最近12个月内的个人银行账单</li>
                                    <li>由政府机构发行的且载有个人姓名及签署样本的新西兰老年卡</li>
                                    <li>由新西兰税务局(IRD)出示的，最近12个月内的税务记录</li>
                                    <li>完整的出生证明</li>
                                </ol>
                            </ul>

                            <p>> 地址证明 （该文件必须清楚地列出客户姓名和地址。不接受邮政信箱）</p>

                            <ul className="list-style">
                                <li>按揭单，房产契约或其他房产证明；</li>
                                <li>当前租约 (租赁单 / 抵押金单等)；</li>
                                <li>当前的房主或承租人的保险单文件，需注明受保的客户姓名和住址；</li>
                                <li>由政府或国家机构出示的文件（有效期在近6个月内）；</li>
                                <li>公用事业单，网络费用单或电话单（有效期在近6个月内）；</li>
                                <li>由在该客户居住国注册的经纪 / 交易商发出的交易结单；</li>
                                <li>银行账户账单、银行信用卡账单、银行借记卡账单或由银行开立的地址证明（需由银行抬头纸开立）账单签发日或地址证明签发日。必须在近六个月之内。</li>
                                <li>载有地址信息的政府信函或声明（签发日必须在近六个月之内）。例如：</li>

                                <ol>
                                    <li>课税信函 / 通知；</li>
                                    <li>履行陪审团职责通知；</li>
                                    <li>选民登记通知；</li>
                                    <li>任何其他显示该客户姓名和住址的正式的政府信函或通知。</li>
                                </ol>
                                
                                <p>另外可使用的地址证明文件——只适用于中国大陆开户客户</p>
                                <li>手机账单（六个月内出具的）</li>
                                <li>载有现居住地址的户口证明文件。</li>
                            </ul>
                            <p>银行账户证明（文件签发日必须在12个月之内，且清晰载有客户姓名、银行账号和银行名称）</p>
                            
                            <ul className="list-style">
                                <li>载有银行账号、银行名称和银行账户持有人姓名的银行账单</li>
                                <li>银行出示的有效存款单证明</li>
                                <li>有效银行卡（适用于中国大陆申请人）</li>
                            </ul>

                        </div>
                    </div>
                    <div className="text-center"> 
                        <Link to="personal-detail" className="btn btn-primary col-center">填寫表格 ></Link>
                    </div>
                </section>
            </div>
            )
        }
    }


    export default ApplyInfo;