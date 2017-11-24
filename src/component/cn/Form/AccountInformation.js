import React, {Component} from 'react';
import {MenuItem, SelectField} from 'material-ui';
import Navbar from './Navbar';
class CnAccountInformation extends Component {
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
        console.log(this.props)
        return (
            <div className="col-md-8 col-center">
                <Navbar/>
            </div>
        );
    }
}


export default CnAccountInformation;
