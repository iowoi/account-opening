import React, {Component} from 'react';
import {MenuItem, SelectField} from 'material-ui';

class EnForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loc: "China"
        };
    }

    handleChange(event, index, value) {
        console.log(event, index, value)
        // this.setState({loc:value})
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-center">
                    <h4>~~~~~~~</h4>~~~~~~~~~~~
                    <form className="form-inline">
                        <SelectField
                            name="loc"
                            value={this.state.loc}>

                            <MenuItem value="Argentina" primaryText="Argentina 阿根廷"/>
                            <MenuItem value="Austria" primaryText="Austria 奥地利"/>
                            <MenuItem value="Belgium" primaryText="Belgium 比利时"/>
                            <MenuItem value="Brazil" primaryText="Brazil 巴西"/>
                            <MenuItem value="Canada" primaryText="Canada 加拿大"/>
                            <MenuItem value="China" primaryText="China 中国"/>
                            <MenuItem value="Denmark" primaryText="Denmark 丹麦"/>
                            <MenuItem value="Finland" primaryText="Finland 芬兰"/>
                            <MenuItem value="France" primaryText="France 法国"/>
                            <MenuItem value="Germany" primaryText="Germany 德国"/>
                            <MenuItem value="Greece" primaryText="Greece 希腊"/>
                            <MenuItem value="HK" primaryText="Hong Kong, China 中国香港"/>
                            <MenuItem value="Iceland" primaryText="Iceland 冰岛"/>
                            <MenuItem value="India" primaryText="India 印度"/>
                            <MenuItem value="Ireland" primaryText="Ireland 爱尔兰"/>
                            <MenuItem value="Italy" primaryText="Italy 意大利"/>
                            <MenuItem value="Japan" primaryText="Japan 日本"/>
                            <MenuItem value="Netherlands" primaryText="Kingdom of the Netherlands 荷兰"/>
                            <MenuItem value="Luxembourg" primaryText="Luxembourg 卢森堡"/>
                            <MenuItem value="Macau" primaryText="Macau, China 中国澳门"/>
                            <MenuItem value="Mexico" primaryText="Mexico 墨西哥"/>
                            <MenuItem value="NewZealand" primaryText="New Zealand 新西兰"/>
                            <MenuItem value="Norway" primaryText="Norway 挪威"/>
                            <MenuItem value="Portugal" primaryText="Portugal 葡萄牙"/>
                            <MenuItem value="Korea" primaryText="Republic of Korea 韩国"/>
                            <MenuItem value="RussianFederation" primaryText="Russian Federation 俄罗斯联邦"/>
                            <MenuItem value="Singapore" primaryText="Singapore 新加坡"/>
                            <MenuItem value="SouthAfrica" primaryText="South Africa 南非"/>
                            <MenuItem value="Spain" primaryText="Spain 西班牙"/>
                            <MenuItem value="Sweden" primaryText="Sweden 瑞典"/>
                            <MenuItem value="Switzerland" primaryText="Switzerland 瑞士"/>
                            <MenuItem value="Taiwan" primaryText="Taiwan 台灣"/>
                            <MenuItem value="Turkey" primaryText="Turkey 土耳其"/>
                            <MenuItem value="UnitedKingdom" primaryText="United Kingdom 联合王国"/>
                        </SelectField>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

const Term = () => (
    <section>
        <p>外汇保证金交易、差价合约交易,
            股票交易以及其他衍生工具交易涉及高风险，亏损风险可以相当巨大。投资者应谨慎考虑，并根据自身的财务状况和投资目标來评估是否合适订立任何交易。在作出该评估时，投资者也应考虑向专业顾问寻求意见。投资者在进行任何投资决定前，应仔细阅读KVB最新版本的
            <a
                href="https://www.kvbkunlun.com/download/KVB_margin/creat/KVB_Kunlun_PDS.pdf"
                target="_blank">
                产品信息披露声明
            </a>。<a
                href="https://www.kvbkunlun.com/download/KVB_margin/creat/KVB_Kunlun_PDS.pdf"
                target="_blank">
                产品信息披露声明
            </a>及<a href="https://www.kvbkunlun.com/cn/legal-documents/" target="_blank">
                投资顾问披露声明
            </a>可向KVB昆仑国际免费索取。此产品披露声明亦备案于新西兰商务部官方网站
            <a href="www.business.govt.nz/disclose" target="_blank">www.business.govt.nz/disclose</a>
        </p>
        <p>
            本网页内容提供之市场信息仅供参考，并不构成投资建议。所有数据、价格及意见均随时变更而不作另行通知。文中某些投资产品，信息和推广计划并不适于KVB昆仑国际所有公司，请与所在国家或地区的KVB昆仑国际代表作出查询。
        </p>
        <p>
            外汇保证金、差价合约, 股票交易及衍生工具是由 KVB 昆仑国际纽西兰公司提供，而您同意接受<a
                href="https://www.kvbkunlun.com/download/KVB_margin/creat/Client-Services-Agreement-individual.pdf"
                target="_blank">纽西兰客户服务协议</a>与纽西兰法律的制约。
        </p>
    </section>
);

export default EnForm;
