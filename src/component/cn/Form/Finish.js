import React, {Component} from 'react';
import FormHeader from './common/Header';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {InputField} from '../../Common';

const validate = values => {
    const errors = {}
    const requiredFields = ['gender']
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    return errors
}

class Finish extends Component {
    constructor(props) {
        super(props);

    }


    render() {
       
        return (
            <div>
                <FormHeader key={0}/>

                <div className="form-page normal-height col-md-10 col-center text-center" key={1}>
                    <h3 className="mt-0">Thank you! 谢谢您！</h3>
                    <p>KVB昆仑国际的代表已收到您的申请。 </p>
                    <p>申请参考号码: 11065989 </p>
                </div>

                <div className="text-center">
                    <a href="#" className="btn btn-primary mb-5">打印您的申请</a>
                </div>

                <div className="form-page normal-height col-md-10 col-center" key={1}>
                    <h3 className="mt-0">下一步是什么？</h3>
                    <p>1. 请您将所需的证明文件制成扫描图像（JPG,GIF,DOC,PDF的文件格式——请不要设置密码保护）<br/>点击提交文件 </p>
                    <Link to="../upload" className="btn btn-primary mb-5">提交文件</Link>
                    <p>或者邮寄到以下地址：<br/>
                        New Accounts Department <br/>
                        KVB Kunlun New Zealand Limited <br/>
                        PO Box 105438, Auckland City <br/>
                        Auckland <br/>
                        New Zealand</p>
                    <p className="mt-5">2. 当您的账户开立后，您将通过电子邮件接收到ForexStar的账户及登录信息。
之后，您就可以存入资金并开始交易。
                        </p>
                </div>
            </div>
        );
    }
}

Finish = reduxForm({
    form: 'Declaration', validate
    // , asyncValidate
})(Finish)

export default Finish;
