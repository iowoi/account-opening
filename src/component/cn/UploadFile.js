import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {InputField} from '../Common';
import {getCookie} from '../../actions';
import {connect} from 'react-redux';

const validate = values => {
    const errors = {}
    const requiredFields = ['gender', 'firstName', 'taxResidentCountries']
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

class Upload extends Component {

    render() {
        return (

            <div className="apply-info-wrap uploadFile-wrap">
                <section className="col-lg-8 left-border col-center">
                    <h3>提交证明文件</h3>
                    <div className="form-group">
                        <label>
                            电子邮件
                        </label>
                        <input className="form-control"
                        name="DocumentUpload_Email"/>
                    </div>
                    <div className="form-group">
                        <label>
                        申请参考号码
                        </label>
                        <input className="form-control"
                        name="DocumentUpload_No"/>
                    </div>
                    <hr/>
                </section>
                <section className="col-lg-8 left-border col-center apply-text">
                    <div className="col-lg-10 col-center">
                        <div className="text-center">
                            为了帮助反洗钱和打击资助恐怖主义活动，条例规定所有金融服务机构需要获取、核实和记录可以证明账户开立人身份的相关信息。因此，我们需要获取以下相关的文件：
                        </div>

                        <div className="row">
                            <h4>1. 您需要下载W-8BEN表格填写后再上传</h4>
                            <div className="left-border ">
                                <a href="w8ben.pdf" target="_blank" className="btn btn-primary">下载W-8BEN表格</a>
                            </div>
                            <div className="col-sm-10">
                                <a href="#" target="_blank" className="btn btn-primary ">上传附件</a>
                                <small className="ml-3 mt-1">上传文件需小于4MB；JPG,JPEG,GIF,DOC,PDF的文件格式，请不要设置密码保护</small>
                            </div>
                        </div>

                        <div className="row">
                            <h4>2. 您需要提供以下三类文件</h4>
                            <div className="left-border ">
                                1. 身份（姓名）和出生日期证明<br/>
                                2. 地址证明<br/>
                                3. 银行账户证明
                            </div>
                        </div>

                        <div className="row">
                            <h4>可接受的证明文件（每个种类只需提供并勾选一种文件）
                            </h4>

                            <div className="left-border ">
                                <div className="form-group">
                                    <label>A.身份证明（该文件必须包括您的姓名，出生日期和照片，并且当前有效。中国大陆的客户如果提交了身分证的正反面就不需要提交地址证明。）</label>

                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="female"/>护照
                                    </div>
                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="male"/>居民身份证
                                    </div>
                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="male"/>
                                        新西兰或澳大利亚有效驾照及以下任何一份文件
                                        <ol>
                                            <li>由本地注册银行发行的，载有持卡人姓名及签署样本的信用卡、借记卡或储蓄账户卡片(EFTPOS)</li>
                                            <li>由本地注册银行出示的，最近12个月内的个人银行账单</li>
                                            <li>由政府机构发行的且载有个人姓名及签署样本的新西兰老年卡</li>
                                            <li>由新西兰税务局(IRD)出示的，最近12个月内的税务记录
                                            </li>
                                            <li>完整的出生证明
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-10">
                                <a href="#" target="_blank" className="btn btn-primary ">上传附件</a>
                                <small className="ml-3 mt-1">上传文件需小于4MB；JPG,JPEG,GIF,DOC,PDF的文件格式，请不要设置密码保护</small>
                            </div>

                            <div className="left-border ">
                                <div className="form-group">
                                    <label>B. 地址证明 （该文件必须清楚地列出客户姓名和地址。不接受邮政信箱</label>

                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="female"/>按揭单，房产契约或其他房产证明
                                    </div>
                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="male"/>当前租约 (租赁单 / 抵押金单等)
                                    </div>
                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="male"/>当前的房主或承租人的保险单文件，需注明受保的客户姓名和住址
                                    </div>
                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="male"/>由政府或国家机构出示的文件（有效期在近6个月内）
                                    </div>
                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="male"/>公用事业单，网络费用单或电话单（有效期在近6个月内）
                                    </div>
                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="male"/>由在该客户居住国注册的经纪 / 交易商发出的交易结单
                                    </div>
                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="male"/>银行账户账单、银行信用卡账单、银行借记卡账单或由银行开立的地址证明（需由银行抬头纸开立）账单签发日或地址证明签发日。必须在近六个月之内
                                    </div>
                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="male"/>载有地址信息的政府信函或声明（签发日必须在近六个月之内）
                                        <br/>例如:
                                        <ol>
                                            <li>课税信函 / 通知</li>
                                            <li>履行陪审团职责通知</li>
                                            <li>选民登记通知</li>
                                            <li>任何其他显示该客户姓名和住址的正式的政府信函或通知
                                            </li>
                                        </ol>
                                    </div>
                                    <label>另外可使用的地址证明文件——只适用于中国大陆开户客户</label>

                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="male"/>
                                        手机账单（六个月内出具的）
                                    </div>
                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="male"/>载有现居住地址的户口证明文件</div>
                                </div>
                            </div>

                            <div className="col-sm-10">
                                <a href="#" target="_blank" className="btn btn-primary ">上传附件</a>
                                <small className="ml-3 mt-1">上传文件需小于4MB；JPG,JPEG,GIF,DOC,PDF的文件格式，请不要设置密码保护</small>
                            </div>

                            <div className="left-border ">
                                <div className="form-group">
                                    <label>C. 银行账户证明（文件签发日必须在12个月之内，且清晰载有客户姓名、银行账号和银行名称）</label>

                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="female"/>载有银行账号、银行名称和银行账户持有人姓名的银行账单
                                    </div>
                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="male"/>银行出示的有效存款单证明
                                    </div>
                                    <div className="d-block">
                                        <Field type="radio" component="input" name="gender" value="male"/>
                                        有效银行卡（适用于中国大陆申请人）
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-10">
                                <a href="#" target="_blank" className="btn btn-primary ">上传附件</a>
                                <small className="ml-3 mt-1">上传文件需小于4MB；JPG,JPEG,GIF,DOC,PDF的文件格式，请不要设置密码保护</small>
                            </div>
                        </div>

                        
                    </div>

                  
                    <div className="text-center">
                        <Link to="form/personal-detail" className="btn btn-primary col-center">递交</Link>
                    </div>
                </section>
            </div>
        )
    }
}



Upload = reduxForm({
    form: 'Upload', validate
    // , asyncValidate
})(Upload)


const CnUpload = connect(
    state => {
        const initialValues = {
            DocumentUpload_Email: getCookie('Email'),
            DocumentUpload_No: getCookie('No')
        }
        const source =  state.info.source
        
        return {source,initialValues};
    }
)(Upload)

export default CnUpload;