import React, {Component} from 'react';
import {MenuItem, SelectField} from 'material-ui';

class EnTerm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loc: "China"
        };
        console.log(props)

    }

    handleChange(event, index, value) {
        console.log(event, index, value)
        // this.setState({loc:value})
    }

    render() {

        return (
            <div className="row">
                <div className="col-md-6 col-center">
                    <h4>TO GET STARTED, PLEASE CHOOSE YOUR COUNTRY OR REGION OF RESIDENCE</h4>
                    
                    <form className="form-inline">
                        <SelectField name="loc" value={this.state.loc}>
                            <MenuItem value="Argentina" primaryText="Argentina"/>
                            <MenuItem value="Austria" primaryText="Austria"/>
                            <MenuItem value="Belgium" primaryText="Belgium"/>
                            <MenuItem value="Brazil" primaryText="Brazil"/>
                            <MenuItem value="Canada" primaryText="Canada"/>
                            <MenuItem value="China" primaryText="China"/>
                            <MenuItem value="Denmark" primaryText="Denmark"/>
                            <MenuItem value="Finland" primaryText="Finland"/>
                            <MenuItem value="France" primaryText="France"/>
                            <MenuItem value="Germany" primaryText="Germany"/>
                            <MenuItem value="Greece" primaryText="Greece"/>
                            <MenuItem value="HK" primaryText="Hong Kong, China"/>
                            <MenuItem value="Iceland" primaryText="Iceland"/>
                            <MenuItem value="India" primaryText="India"/>
                            <MenuItem value="Ireland" primaryText="Ireland"/>
                            <MenuItem value="Italy" primaryText="Italy"/>
                            <MenuItem value="Japan" primaryText="Japan"/>
                            <MenuItem value="Netherlands" primaryText="Kingdom of the Netherlands"/>
                            <MenuItem value="Luxembourg" primaryText="Luxembourg"/>
                            <MenuItem value="Macau" primaryText="Macau, China"/>
                            <MenuItem value="Mexico" primaryText="Mexico 墨西哥"/>
                            <MenuItem value="NewZealand" primaryText="New Zealand"/>
                            <MenuItem value="Norway" primaryText="Norway"/>
                            <MenuItem value="Portugal" primaryText="Portugal"/>
                            <MenuItem value="Korea" primaryText="Republic of Korea"/>
                            <MenuItem value="RussianFederation" primaryText="Russian Federation"/>
                            <MenuItem value="Singapore" primaryText="Singapore"/>
                            <MenuItem value="SouthAfrica" primaryText="South Africa"/>
                            <MenuItem value="Spain" primaryText="Spain"/>
                            <MenuItem value="Sweden" primaryText="Sweden"/>
                            <MenuItem value="Switzerland" primaryText="Switzerland"/>
                            <MenuItem value="Taiwan" primaryText="Taiwan"/>
                            <MenuItem value="Turkey" primaryText="Turkey"/>
                            <MenuItem value="UnitedKingdom" primaryText="United Kingdom"/>
                        </SelectField>
                        <button type="submit" className="btn btn-primary">Next > </button>
                        {/* <Link to="en/apply" className="btn btn-primary">Next ></Link> */}
                    </form>
                    <p>* For countries or regions not listed, please email your inquiry to <a href="mailto:onlineaccount@kvbkunlun.com">onlineaccount@kvbkunlun.com</a>.</p>
                    <Term/>
                </div>
            </div>
        );
    }
}


const Term = () => (
    <section className="mt-4">
        <p>The risk of loss in CFDs, derivatives and securities trading can be
            substantial. Investors should therefore carefully consider whether such trading
            is suitable in light of their own financial position and investment objectives
            and if necessary seek appropriate advice. “Adviser’s Disclosure Statement” is
            available and free of charge from KVB Kunlun.

        </p>
        <p>
            The information contained in the documents does not constitute financial or
            investment advice. All information, prices and opinions are subject to change
            without prior notice. The product information may not apply to all KVB Kunlun
            companies; please contact our representatives in your country or region, if you
            have any enquiries.

        </p>
        <p>CFDs, derivatives and securities trading are offered by KVB Kunlun New
            Zealand Limited and you agree to be bound by the KVB Kunlun New Zealand Limited
            Client Services Agreement and by the Laws of New Zealand. )
        </p>
    </section>
);

export default EnTerm;
