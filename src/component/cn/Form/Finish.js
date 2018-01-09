import React, {Component} from 'react';
import FormHeader from './common/Header';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {InputField} from '../../Common';
import {getCookie} from '../../../actions';

class Finish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCN: WEB_LANG('cn')
        }
    }
    render() {
        //console.log("getCookie",getCookie('No'))
       
        const {className} = this.props
        const {isCN} = this.state
        return (
            <div className={className}>
                <div className="form-page normal-height col-md-10 col-center text-center" >
                    <h3 className="mt-0">Thank you! {isCN && "谢谢您！"}</h3>
                    <p>{isCN ? "KVB昆仑国际的代表已收到您的申请。":"Your application has now been received by a KVB representative"} </p>
                    <p>{isCN ? "申请参考号码":"Application Reference Number"}: {getCookie('No')} </p>
                </div>

                <div className="text-center">
                    <a href={`http://testaccountopen.kvbkunlun.com/api/SecurityAccount/DetailsCn/?Guid=${getCookie('Guid')}`} target="_blank"  className="btn btn-primary mb-5">{isCN ? "打印您的申请":"Print Your Application"}</a>
                </div>

                <div className="form-page normal-height col-md-10 col-center">
                    <h3 className="mt-0">{isCN ? "下一步是什么？":"What’s Next?"}</h3>

                    {isCN ? <p>1. 请您将所需的证明文件制成扫描图像（JPG,GIF,DOC,PDF的文件格式——请不要设置密码保护</p>
                    :<p>1. Please submit your required Identification Documents as scanned images_en (JPG, GIF, DOC, PDF — no password protection please)</p>}
                    <a onClick={OPEN_UPLOAD} href="javascript:void(0);" target="_blank" className="btn btn-primary mb-5">
                        {isCN ? "提交文件":"Click Here to Upload"}
                    </a>
                    <p>{isCN ? "或者邮寄到以下地址：":"Or post to:"}<br/>
                        New Accounts Department <br/>
                        KVB Kunlun New Zealand Limited <br/>
                        PO Box 105438, Auckland City <br/>
                        Auckland <br/>
                        New Zealand</p>
                   
                    <p className="mt-5">{isCN ? "2. 当您的账户开立后，您将通过电子邮件接收到TradingStar的账户及登录信息。之后，您就可以存入资金并开始交易。" :"2.When your account is opened you will receive, via email, account and login details for the TradingStar so that you can fund the account and start trading."}
                    </p>
                </div>
            </div>
        );
    }
}

export default Finish;
