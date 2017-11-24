import React, {Component} from 'react';
import {MenuItem, SelectField} from 'material-ui';

class CnDeclaration extends Component {
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
                    <h4>请先选取你的居住地</h4>~~~~~~~~~~~
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


export default CnDeclaration;
