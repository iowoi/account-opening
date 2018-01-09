import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import IconStep1 from '../../assets/svg/apply/icon-step1.svg';
import IconStep2 from '../../assets/svg/apply/icon-step2.svg';
import IconStep3 from '../../assets/svg/apply/icon-step3.svg';
import IconArrowLeft from '../../assets/svg/apply/icon-arrow-left.svg';
import IconArrowDown from '../../assets/svg/apply/icon-arrow-down.svg';

class ApplyInfo extends Component {
    render() {
        return (
            <div className="apply-info-wrap">
                <section className="col-lg-8 col-md-10 col-center icon-btns">
                    <h3>
                        {WEB_LANG('cn')?"帐户开立流程":"Account Opening Process"}
                    </h3>
                    <div className="row">
                        <div className="col-md-3">
                            <p className="step-title">STEP 1</p>
                            <div className="step-card">
                                <img src={IconStep1} className="ml-md-2"/>
                                <p>{WEB_LANG('cn')?"填写线上申请表格":"Fill out an Online Application Form in minutes"}</p>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <img src={IconArrowLeft} className="hidden-sm-down"/>
                            <img src={IconArrowDown} className="hidden-md-up"/>
                        </div>
                        <div className="col-md-3">
                            <p className="step-title">STEP 2</p>
                            <div className="step-card">
                                <img src={IconStep2}/>
                                <p>{WEB_LANG('cn')?"提交证明文件及W-8BEN表格":"Submit your Identification Documents And W-8BEN Form"}<br/>
                                    <a onClick={OPEN_UPLOAD} href="javascript:void(0);" target="_blank">
                                        {WEB_LANG('cn')?"点击上传":"click here to upload files"}
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <img src={IconArrowLeft} className="hidden-sm-down"/>
                            <img src={IconArrowDown} className="hidden-md-up"/>
                        </div>
                        <div className="col-md-3">
                            <p className="step-title">STEP 3</p>
                            <div className="step-card">
                                <img src={IconStep3}/>
                                {WEB_LANG('cn')?
                                    <p>通过电子邮件接收<br/>TradingStar帐户与登录信息</p>
                                    :<p>Receive (via email) account and login details for TradingStar software</p>}
                                
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {WEB_LANG('cn')?
                        <p className="mb-lg-5 ">
                            您若希望开立KVB昆仑国际的个人账户，必须符合以下的资格及证明文件要求。<br className="hidden-md-down"/>
                            关于其他的账户类型，请发电子邮件至<a href="mailto:onlineaccount@kvbkunlun.com">onlineaccount@kvbkunlun.com</a>查询。
                        </p>:
                        <p className="mb-lg-5 col-md-10 col-center">
                            To open an Individual Account with KVB you must be able to meet our Eligibility and Identification Document Requirements detailed below. For other account types, please email your inquiry to <a href="mailto:onlineaccount@kvbkunlun.com">onlineaccount@kvbkunlun.com</a>.
                        </p>
                    }
                </section>
                <section className="col-lg-8 col-md-10 col-center apply-text">
                    <div className="row mb-lg-5 ">
                        <div className="col-md-2 vcenter"> {WEB_LANG('cn')?"W-8BEN表格":" W-8BEN Form"}</div>
                        <div className="col-md-10 vcenter">
                            <a href="../w8ben.pdf" target="_blank" className="btn btn-primary">
                                {WEB_LANG('cn')?"下载W-8BEN表格":"Download W-8BEN Form"}
                            </a>
                        </div>
                    </div>

                    <div className="row mb-lg-5 ">
                        <div className="col-md-2">{WEB_LANG('cn')?"资格要求":"Eligibility Requirements"}</div>
                        <div className="col-md-10">
                            {WEB_LANG('cn')?"于KVB昆仑国际开立账户，您必须年满18岁。":"You must be aged 18 years and over to open an account with KVB."}
                        </div>
                    </div>

                    <div className="row mb-lg-5 ">
                        <div className="col-md-2">
                            {WEB_LANG('cn')?"证明文件要求":"Identification Document Requirements"}
                         </div>
                        {WEB_LANG('cn')?<CnInfoList/>:<EnInfoList/>}
                        
                    </div>
                    <div className="text-center">
                        <Link to="form/personal-detail" className="btn btn-primary col-center">
                            {WEB_LANG('cn')?"立即申请":"Apply Now"}
                        </Link>
                    </div>
                </section>
            </div>
        )
    }
}
const EnInfoList = () => (
    <div className="col-md-10">
        To aid in the fight against money laundering and the financing of terrorism activities, regulation requires all financial services institutions to obtain, verify and record information that identifies persons opening accounts. We are therefore required to obtain acceptable documentary information as detailed: 
        <h6>Documents required are in three categories:</h6>
        <ol>
            <li>Proof of identity (name) and date of birth (DOB)</li>
            <li>Proof of address</li>
            <li>Proof of Bank Account</li>
        </ol>
        <h6>Acceptable documents (only one document per category is needed and chosen) are:</h6>
        <p>
            <b>Proof of Identity</b >(the document must include your name, date of birth and a photograph and be current. For customers in mainland China, if you have submitted a copy of identity card on both sides, you do not need to submit proof of address. )
        </p>
        <ol>
            <li>Passport</li>
            <li>National Identity Card</li>
            <li>New Zealand or Australia Driver Licence and one of the following:</li>
            <ul>
                <li>A credit card, debit card or eftpos card issued by a registered bank which contains the person's name and signature</li>
                <li>A bank statement issued by a registered bank to the person issued within the last 12 months</li>
                <li>A SuperGold Card issued by a government agency that contains the person's name and signature</li>
                <li>IRD statement issued within the last 12 months</li>
                <li>Full birth certificate</li>
            </ul>
        </ol>

        <p>
            <b>Proof of Address</b> (the document must clearly list the client’s name and address. PO Box is NOT acceptable)
        </p>

        <ol>
            <li>Mortgage Statement, Deed or other evidence of property;</li>
            <li>Current Lease (Rental / Security Bond etc.);</li>
            <li>Current Homeowner’s or Renter’s Insurance Policy Document stating the name of client and residential address being insured;</li>
            <li>Document issued by a Government or State Owned body (less than six (6) months old);
Utility Bill, internet or phone bill (less than six (6) months old);</li>
            <li>Brokerage Statement from a Registered Broker / Dealer in the country of the client’s residence;</li>
            <li>Bank Statement, Bank issued Credit Card Statement or Bank issued Debit Card Statement or a signed letter from a Bank on Bank Letter Head confirming the client’s address. Statement and / or Letter to be no more than six (6) months old;</li>
            <li>Government issued Letters or Statements establishing current address (less than six (6) months old). E.g:</li>
            <ul>
                <li>Taxation Letters and / or Notice;</li>
                <li>Jury duty notices;</li>
                <li>Voter Registration notice;</li>
                <li>Any other official Government letter or notice showing the client’s name and address.</li>
            </ul>

        </ol>

        <p>Additional Proof of Address Documents that can be used for Mainland China Accounts ONLY</p>
        <ol>
            <li>Mobile phone bill (less than six (6) months old)</li>
            <li>Hukou showing current address.</li>
        </ol>

        <p>
            <b>Proof of Bank Account</b> (The document must be issued within the preceding 12 months and clearly list the client's name, bank account number and bank name.)</p>

        <ol>
            <li>Bank Statement showing the bank account number, bank name and bank account holder name.</li>
            <li>Bank Encoded Deposit Slip</li>
            <li>Bank Card (for applicants from mainland China) </li>
        </ol>

    </div>
)

const CnInfoList = () => (
    <div className="col-md-10">
        为了帮助反洗钱和打击资助恐怖主义活动，条例规定所有金融服务机构需要获取、核实和记录可以证明账户开立人身份的相关信息。因此，我们需要获取以下相关的文件：
        <h6>您需要提供以下三类文件：</h6>
        <ol>
            <li>身份（姓名）和出生日期证明</li>
            <li>地址证明</li>
            <li>银行账户证明</li>
        </ol>
        <h6>可接受的证明文件（每个种类只需提供一种文件）</h6>
        <p>
            <b>身份证明</b>（该文件必须包括您的姓名，出生日期和照片，并且当前有效。中国大陆的客戶如果提交了身分证的正反面就不需要再提交地址证明。）
        </p>
        <ol>
            <li>护照</li>
            <li>居民身份证</li>
            <li>新西兰或澳大利亚有效驾照及以下任何一份文件：</li>
            <ul>
                <li>由本地注册银行发行的，载有持卡人姓名及签署样本的信用卡、借记卡或储蓄账户卡片(EFTPOS)</li>
                <li>由本地注册银行出示的，最近12个月内的个人银行账单</li>
                <li>由政府机构发行的且载有个人姓名及签署样本的新西兰老年卡</li>
                <li>由新西兰税务局(IRD)出示的，最近12个月内的税务记录</li>
                <li>完整的出生证明</li>
            </ul>
        </ol>

        <p>
            <b>地址证明</b>
            （该文件必须清楚地列出客户姓名和地址。不接受邮政信箱）</p>

        <ol>
            <li>按揭单，房产契约或其他房产证明；</li>
            <li>当前租约 (租赁单 / 抵押金单等)；</li>
            <li>当前的房主或承租人的保险单文件，需注明受保的客户姓名和住址；</li>
            <li>由政府或国家机构出示的文件（有效期在近6个月内）；</li>
            <li>公用事业单，网络费用单或电话单（有效期在近6个月内）；</li>
            <li>由在该客户居住国注册的经纪 / 交易商发出的交易结单；</li>
            <li>银行账户账单、银行信用卡账单、银行借记卡账单或由银行开立的地址证明（需由银行抬头纸开立）账单签发日或地址证明签发日。必须在近六个月之内。</li>
            <li>载有地址信息的政府信函或声明（签发日必须在近六个月之内）。例如：</li>

            <ul>
                <li>课税信函 / 通知；</li>
                <li>履行陪审团职责通知；</li>
                <li>选民登记通知；</li>
                <li>任何其他显示该客户姓名和住址的正式的政府信函或通知。</li>
            </ul>

        </ol>

        <p>另外可使用的地址证明文件——只适用于中国大陆开户客户</p>
        <ol>
            <li>手机账单（六个月内出具的）</li>
            <li>载有现居住地址的户口证明文件。</li>
        </ol>

        <p>
            <b>银行账户证明</b>（文件签发日必须在12个月之内，且清晰载有客户姓名、银行账号和银行名称）</p>

        <ol>
            <li>载有银行账号、银行名称和银行账户持有人姓名的银行账单</li>
            <li>银行出示的有效存款单证明</li>
            <li>有效银行卡（适用于中国大陆申请人）</li>
        </ol>

    </div>
)
export default ApplyInfo;