import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Inputinput} from '../Common';
import {getCookie} from '../../actions';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import $ from 'jquery';

function ValidateSingleInput(oInput) {
    //console.log(oInput)
    if (oInput.type == "file") {
        var filename = oInput.value;
         if (filename.length > 0) {
            var blnValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
                var sCurExtension = _validFileExtensions[j];
                if (filename.substr(filename.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }
             
            if (!blnValid) {
                alert("Sorry, " + filename + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                oInput.value = "";
                return false;
            }
        }
    }
    return true;
}
class Upload extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            isCN:WEB_LANG('cn'),
            IdsUpload: false,
            ProofOfIdentity: '1',
            ProofOfAddress: '1',
            ProofOfBankAccount: '1',
            No: getCookie('No')
                ? getCookie('No')
                : "",
            Email: getCookie('Email')
                ? getCookie('Email')
                : "",
            file1: "",
            file2: "",
            file3: "",
            file4: "",
            file5: "",
            error_file1: '请下载W-8BEN表格填写后再上传',
            error_file2: '请提供身份（姓名）和出生日期证明',
            error_file3: null,
            error_file4: '请提供地址证明',
            error_file5: '请提供银行账户证明',
            error_No: null,
            error_Email: null
        }
    }

    handleChange(e) {
        const target = e.target
        const value = target.value;
        const inputName = target.name;
        this.setState({
            [inputName]: value,
            ['error_' + inputName]: null
        });
        if (inputName==='Email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(target.value)) {
            this.setState({error_Email:'Invalid email address'})
        }

        if (inputName === 'DataInfo_ProofOfIdentity_ProofTypesId') {
            if (value == "2") {
                this.setState({IdsUpload: true});
            }else{
                this.setState({IdsUpload: false});
            }
            this.setState({ProofOfIdentity: value})
        } 
    }

    handleUploadFile(e) {
        const filename = $(e.target)
            .val()
            .replace(/^.*[\\\/]/, '')
        const inputName = e.target.name
        const fileSize = (e.target.files[0].size / (1024 * 1024)).toFixed(2);
        let fileValid = false;
        
        var _validFileExtensions = [".jpg", ".jpeg", ".doc", ".pdf",".docx", ".gif", ".png"];    
        if(fileSize > 3){
            alert("上传文件需小于4MB");
            e.target.value = "";
            return false;
        }
        if (filename.length > 0) {
            for (var j = 0; j < _validFileExtensions.length; j++) {
                var sCurExtension = _validFileExtensions[j];
                if (filename.substr(filename.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    fileValid = true;
                    this.setState({[inputName]: filename})
                    break;
                }
            }
             
            if (!fileValid) {
                alert("抱歉,文件「" + filename + "」的类型不被允许，请上传以下格式类型的文件" + _validFileExtensions.join(", "));
                //alert("Sorry, " + filename + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                e.target.value = "";
                return false;
            }
        }
        
       
    }

    submitUploadFileForms(e) {
        // input valid
        const Inputs = document.getElementsByClassName('required')
        for (let i = 0; i < Inputs.length; i++) {
            // Inputs[i]
            if (!Inputs[i].value) {
                this.setState({
                    ['error_' + Inputs[i].name]: "required"
                })
                Inputs[i].focus();
                return;
            }
        }
        // file valid
        for (let i = 1; i <= 5; i++) {
            if (i != 3 && !this.state["file" + i]) {
                alert(this.state['error_file' + i])
                $('html, body').animate({
                    scrollTop: $("#DocumentUpload_"+i).offset().top
                });
                return;
            }
        }
        const forms = document.getElementsByTagName('form')

        for (let i = 0; i < forms.length; i++) {
            forms[i].submit();
        }
        setTimeout(function () {
            if (confirm("上传成功")) {
                window.close();
            }
        }, 5000);
    }

    render() {
        const {
            Email,
            No,
            file1,
            file2,
            file3,
            file4,
            file5,
            Uploaded,
            error_No,
            error_Email,
            error_file1,
            error_file2,
            error_file3,
            error_file4,
            error_file5,
            isCN
        } = this.state
        return (

            <div className="apply-info-wrap uploadFile-wrap">
                <iframe id="UploadiFrame" name="UploadiFrame_W8BEN"></iframe>
                <iframe id="UploadiFrame" name="UploadiFrame_ProofOfIdentityFront"></iframe>
                <iframe id="UploadiFrame" name="UploadiFrame_ProofOfIdentityBack"></iframe>
                <iframe id="UploadiFrame" name="UploadiFrame_ProofOfAddress"></iframe>
                <iframe id="UploadiFrame" name="UploadiFrame_ProofOfBankAccount"></iframe>
                <section className="col-lg-8 left-border col-center">
                    <h3>{isCN?"提交证明文件":"Submit Your Identification Document"}</h3>
                    <div
                        className={error_Email
                        ? "has-danger form-group "
                        : "form-group"}>
                        <label>
                            {isCN?"电子邮件":"Email Address"}
                        </label>
                        <input
                            name="Email"
                            value={Email}
                            onChange={this.handleChange}
                            className="form-control required"/> {error_Email
                            ? <div
                                    className="error-text"
                                    style={{
                                    position: "relative",
                                    bottom: "-5px"
                                }}>{error_Email}</div>
                            : null}
                    </div>

                    <div
                        className={error_No
                        ? "has-danger form-group "
                        : "form-group"}>
                        <label>
                            {isCN?"申请参考号码":"Application Reference Number"}
                        </label>
                        <input
                            name="No"
                            value={No}
                            onChange={this.handleChange}
                            className="form-control required"/> {error_No
                            ? <div
                                    className="error-text"
                                    style={{
                                    position: "relative",
                                    bottom: "-5px"
                                }}>{error_No}</div>
                            : null}
                    </div>
                    <hr/>
                </section>
                <section className="col-lg-8 left-border col-center apply-text">
                    <div className="col-lg-10 col-center">
                        <div className="text-center">
                            {isCN?"为了帮助反洗钱和打击资助恐怖主义活动，条例规定所有金融服务机构需要获取、核实和记录可以证明账户开立人身份的相关信息。因此，我们需要获取以下相关的文件：":"To aid in the fight against money laundering and the financing of terrorism activities, regulation requires all financial services institutions to obtain, verify and record information that identifies persons opening accounts. We are therefore required to obtain acceptable documentary information as detailed:"}
                        </div>

                        <form
                            id="DocumentUpload_1"
                            action="/api/Upload/"
                            documenttypesid="1"
                            method="post"
                            encType="multipart/form-data"
                            target="UploadiFrame_W8BEN">
                            <div className="row">
                                <h4>{isCN?"1. 您需要下载W-8BEN表格填写后再上传":"1. You need to fill in the W-8BEN form and  then upload the form online"}</h4>
                                <div className="left-border ">
                                    <a href="../w8ben.pdf" target="_blank" className="btn btn-primary">{isCN?"下载W-8BEN表格":"Download W-8BEN Form"}</a>
                                </div>
                                <div className="col-sm-12 ml-2">
                                    <small className="ml-2 mt-1 d-block">{isCN?"上传文件需小于4MB；JPG,JPEG,GIF,PNG,DOC,DOCX,PDF的文件格式，请不要设置密码保护":"The attachment should be smaller than 4MB; file format should be JPG,JPEG,GIF,PNG,DOC,DOCX,PDF—no password protection please"}</small>
                                    <label className="btn btn-primary">
                                        {isCN?"上传附件":"Upload File"}
                                        <input type="file" name="file1" hidden onChange={this.handleUploadFile}/>
                                    </label>
                                    <small className="ml-3 mt-1">{file1}</small>
                                </div>
                            </div>
                            <HiddenFields Email={Email} No={No} DocumentTypesId="1" ProofTypesId=""/>
                        </form>

                        <div className="row">
                            <h4>{isCN?"2. 您需要提供以下三类文件":"2. Documents required are in three categories"}</h4>
                            <div className="left-border ">
                                {isCN?"1. 身份（姓名）和出生日期证明":"1. Proof of identity (name) and date of birth (DOB)"}<br/>
                                {isCN?"2. 地址证明":"2. Proof of address"}<br/>
                                {isCN?"3. 银行账户证明":"3. Proof of Bank Account"}
                            </div>
                        </div>

                        <div className="row">
                            <h4>{isCN?"可接受的证明文件（每个种类只需提供并勾选一种文件）":"Acceptable documents (only one document per category is needed and chosen) are:"}
                            </h4>

                            <div className="left-border ">
                                <div className="form-group">
                                    <label>{isCN?"A.身份证明（该文件必须包括您的姓名，出生日期和照片，并且当前有效。中国大陆的客户如果提交了身分证的正反面就不需要提交地址证明。）":"A. Proof of Identity (the document must include your name, date of birth and a photograph and be current. For customers in mainland China, if you have submitted a copy of identity card on both sides, you do not need to submit proof of address. )"}</label>

                                    <div className="d-block">
                                        <input
                                            type="radio"
                                            onChange={this.handleChange}
                                            name="DataInfo_ProofOfIdentity_ProofTypesId"
                                            defaultChecked
                                            value="1"/>{isCN?"护照":"Passport"}
                                    </div>
                                    <div className="d-block">
                                        <input
                                            type="radio"
                                            onChange={this.handleChange}
                                            name="DataInfo_ProofOfIdentity_ProofTypesId"
                                            value="2"/>{isCN?"居民身份证":"National Identity Card"}
                                    </div>
                                    <div className="d-block">
                                        <input
                                            type="radio"
                                            onChange={this.handleChange}
                                            name="DataInfo_ProofOfIdentity_ProofTypesId"
                                            value="3"/>{isCN?"新西兰或澳大利亚有效驾照及以下任何一份文件":"New Zealand or Australia Driver Licence and one of the following:"}
                                        {isCN?
                                            <ol>
                                                <li>由本地注册银行发行的，载有持卡人姓名及签署样本的信用卡、借记卡或储蓄账户卡片(EFTPOS)</li>
                                                <li>由本地注册银行出示的，最近12个月内的个人银行账单</li>
                                                <li>由政府机构发行的且载有个人姓名及签署样本的新西兰老年卡</li>
                                                <li>由新西兰税务局(IRD)出示的，最近12个月内的税务记录
                                                </li>
                                                <li>完整的出生证明
                                                </li>
                                            </ol>
                                        :<ol>
                                            <li>A credit card, debit card or eftpos card issued by a registered bank which contains the person's name and signature</li>
                                            <li>A bank statement issued by a registered bank to the person issued within the last 12 months</li>
                                            <li>A SuperGold Card issued by a government agency that contains the person's name and signature</li>
                                            <li>IRD statement issued within the last 12 months
                                            </li>
                                            <li>Full birth certificate
                                            </li>
                                        </ol>}
                                        
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <small className="ml-2 mt-1 d-block">{isCN?"上传文件需小于4MB；JPG,JPEG,GIF,PNG,DOC,DOCX,PDF的文件格式，请不要设置密码保护":"The attachment should be smaller than 4MB; file format should be JPG,JPEG,GIF,PNG,DOC,DOCX,PDF—no password protection please"}</small>
                                <form
                                    id="DocumentUpload_2"
                                    action="/api/Upload/"
                                    documenttypesid="2"
                                    method="post"
                                    encType="multipart/form-data"
                                    target="UploadiFrame_ProofOfIdentityFront">
                                    <label className="btn btn-primary">
                                        {isCN?"上传身份证明-正面":"Front Side"}
                                        <input type="file" name="file2" hidden onChange={this.handleUploadFile}/>
                                    </label>
                                    <small className="ml-3 mt-1">{file2}</small>

                                    <HiddenFields
                                        Email={Email}
                                        No={No}
                                        DocumentTypesId="2"
                                        ProofTypesId={this.state.ProofOfIdentity}/> 
                                </form>
                            </div>

                            {this.state.IdsUpload
                                ? <form
                                        id="DocumentUpload_3"
                                        action="/api/Upload/"
                                        documenttypesid="3"
                                        method="post"
                                        encType="multipart/form-data"
                                        target="UploadiFrame_ProofOfIdentityBack">
                                        <input
                                            name="DataInfo_ProofOfIdentityBack_ProofTypesId"
                                            hidden
                                            readOnly
                                            value={this.state.ProofOfIdentity}/>

                                        <label
                                            className="btn btn-primary"
                                            style={{
                                            margin: '-15px 0 20px 15px'
                                        }}>
                                            {isCN?"上传身份证明-反面":"Back Side"}
                                            <input type="file" name="file3" hidden onChange={this.handleUploadFile}/>
                                        </label>
                                        <small
                                            className="ml-3"
                                            style={{
                                            position: "relative",
                                            top: "-15px"
                                        }}>{file3}</small>

                                        <HiddenFields
                                            Email={Email}
                                            No={No}
                                            DocumentTypesId="3"
                                            ProofTypesId={this.state.ProofOfIdentity}/> 
                                    </form>
                                : null
}
                            <form
                                id="DocumentUpload_4"
                                action="/api/Upload/"
                                documenttypesid="4"
                                method="post"
                                encType="multipart/form-data"
                                target="UploadiFrame_ProofOfAddress">
                                <div className="left-border ">
                                    <div className="form-group">
                                        <label>{isCN?"B. 地址证明 （该文件必须清楚地列出客户姓名和地址。不接受邮政信箱":"B. Proof of Address (the document must clearly list the client’s name and address. PO Box is NOT acceptable)"}</label>

                                        <div className="d-block">
                                            <input type="radio" name="ProofOfAddress" defaultChecked value="1"/>
                                            {isCN?"按揭单，房产契约或其他房产证明":"Mortgage Statement, Deed or other evidence of property"}
                                        </div>
                                        <div className="d-block">
                                            <input type="radio" name="ProofOfAddress" value="2"/>
                                            {isCN?"当前租约 (租赁单 / 抵押金单等)":"Current Lease (Rental / Security Bond etc.)"}
                                        </div>
                                        <div className="d-block">
                                            <input type="radio" name="ProofOfAddress" value="3"/>
                                            {isCN?"当前的房主或承租人的保险单文件，需注明受保的客户姓名和住址]":"Current Homeowner’s or Renter’s Insurance Policy Document stating the name of client and residential address being insured"}
                                        </div>
                                        <div className="d-block">
                                            <input type="radio" name="ProofOfAddress" value="4"/>{isCN?"由政府或国家机构出示的文件（有效期在近6个月内）":"Document issued by a Government or State Owned body (less than six (6) months old)"}
                                        </div>
                                        <div className="d-block">
                                            <input type="radio" name="ProofOfAddress" value="5"/>
                                            {isCN?"公用事业单，网络费用单或电话单（有效期在近6个月内）":"Utility Bill, internet or phone bill (less than six (6) months old)"}
                                        </div>
                                        <div className="d-block">
                                            <input type="radio" name="ProofOfAddress" value="6"/>
                                            {isCN?"由在该客户居住国注册的经纪 / 交易商发出的交易结单":"Brokerage Statement from a Registered Broker / Dealer in the country of the client’s residence."}
                                        </div>
                                        <div className="d-block">
                                            <input type="radio" name="ProofOfAddress" value="7"/>
                                            {isCN?"银行账户账单、银行信用卡账单、银行借记卡账单或由银行开立的地址证明（需由银行抬头纸开立）账单签发日或地址证明签发日。必须在近六个月之内":"Bank Statement, Bank issued Credit Card Statement or Bank issued Debit Card Statement or a signed letter from a Bank on Bank Letter Head confirming the client’s address. Statement and / or Letter to be no more than six (6) months old;"}
                                        </div>
                                        <div className="d-block">
                                            <input type="radio" name="ProofOfAddress" value="8"/>{isCN?"载有地址信息的政府信函或声明（签发日必须在近六个月之内）":"Government issued Letters or Statements establishing current address (less than six (6) months old). E.g:"}
                                            <br/>{isCN?"例如:":""}
                                            {isCN?
                                                <ol>
                                                <li>课税信函 / 通知</li>
                                                <li>履行陪审团职责通知</li>
                                                <li>选民登记通知</li>
                                                <li>任何其他显示该客户姓名和住址的正式的政府信函或通知
                                                </li>
                                            </ol>
                                            :
                                            <ol>
                                            <li>Taxation Letters and / or Notice;</li>
                                            <li>Jury duty notices;</li>
                                            <li>Voter Registration notice;</li>
                                            <li>Any other official Government letter or notice showing the client’s name and address.
                                            </li>
                                        </ol>}
                                            
                                        </div>
                                        <label>{isCN?"另外可使用的地址证明文件——只适用于中国大陆开户客户":"Additional Proof of Address Documents that can be used for Mainland China Accounts ONLY"}</label>

                                        <div className="d-block">
                                            <input type="radio" name="ProofOfAddress" value="9"/>
                                            {isCN?"手机账单（六个月内出具的）":"Mobile phone bill (less than six (6) months old)"}
                                        </div>
                                        <div className="d-block">
                                            <input type="radio" name="ProofOfAddress" value="10"/>
                                            {isCN?"载有现居住地址的户口证明文件":"Hukou showing current address"}</div>
                                    </div>
                                </div>

                                <div className="col-sm-12">
                                    <small className="ml-2 mt-1 d-block">{isCN?"上传文件需小于4MB；JPG,JPEG,GIF,PNG,DOC,DOCX,PDF的文件格式，请不要设置密码保护":"The attachment should be smaller than 4MB; file format should be JPG,JPEG,GIF,PNG,DOC,DOCX,PDF—no password protection please"}</small>
                                    <label className="btn btn-primary">
                                        {isCN?"上传附件":"Upload File"}
                                        <input type="file" name="file4" hidden onChange={this.handleUploadFile}/>
                                    </label>
                                    <small className="ml-3 mt-1">{file4}</small>

                                </div>
                                <HiddenFields
                                    Email={Email}
                                    No={No}
                                    DocumentTypesId="4"
                                    ProofTypesId={this.state.ProofOfAddress}/> 

                            </form>
                            <form
                                id="DocumentUpload_5"
                                action="/api/Upload/"
                                documenttypesid="5"
                                method="post"
                                encType="multipart/form-data"
                                target="UploadiFrame_ProofOfBankAccount">

                                <div className="left-border ">
                                    <div className="form-group">
                                        <label>{isCN?"C. 银行账户证明（文件签发日必须在12个月之内，且清晰载有客户姓名、银行账号和银行名称）":"C. Proof of Bank Account (The document must be issued within the preceding 12 months and clearly list the client's name, bank account number and bank name.)"}</label>

                                        <div className="d-block">
                                            <input type="radio" name="ProofOfBankAccount" defaultChecked value="1"/>
                                            {isCN?"载有银行账号、银行名称和银行账户持有人姓名的银行账单":"Bank Statement showing the bank account number, bank name and bank account holder name"}
                                        </div>
                                        <div className="d-block">
                                            <input type="radio" name="ProofOfBankAccount" value="2"/>
                                            {isCN?"银行出示的有效存款单证明":"Bank Encoded Deposit Slip"}
                                            
                                        </div>
                                        <div className="d-block">
                                            <input type="radio" name="ProofOfBankAccount" value="3"/>
                                            {isCN?"有效银行卡（适用于中国大陆申请人）":"Bank Card (for applicants from mainland China)"}
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <small className="ml-2 mt-1 d-block">{isCN?"上传文件需小于4MB；JPG,JPEG,GIF,PNG,DOC,DOCX,PDF的文件格式，请不要设置密码保护":"The attachment should be smaller than 4MB; file format should be JPG,JPEG,GIF,PNG,DOC,DOCX,PDF—no password protection please"}</small>
                                    <label className="btn btn-primary">
                                        {isCN?"上传附件":"Upload File"}
                                        <input type="file" name="file5" hidden onChange={this.handleUploadFile}/>
                                    </label>
                                    <small className="ml-3 mt-1">{file5}</small>

                                </div>
                                <HiddenFields
                                    Email={Email}
                                    No={No}
                                    DocumentTypesId="5"
                                    ProofTypesId={this.state.ProofOfBankAccount}/> 
                               
                            </form>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            onClick={this.submitUploadFileForms}
                            className="btn btn-primary col-center">{isCN?"递交":"Submit"}</button>
                    </div>
                </section>
            </div>
        )
    }
}
class HiddenFields extends Component {
    render() {
        const {Email, No, DocumentTypesId, ProofTypesId} = this.props
        return (<input
            name="ApiUrl"
            readOnly
            hidden
            value={`${API_URL}/DocumentUpload?Email=${Email}&No=${No}&DocumentTypesId=${DocumentTypesId}&ProofTypesId=${ProofTypesId}`}/>);
    }
}

const mapStateToProps = (state) => {
    const source = state.info.source
    return {source};
}

const mapDispatchToProps = (dispatch) => ({
    sendForm: (data) => {
        dispatch(sendForm(data))
    }
})

const CnUpload = connect(mapStateToProps, mapDispatchToProps)(Upload)

export default CnUpload;