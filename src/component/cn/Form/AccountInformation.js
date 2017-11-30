import React, {Component} from 'react';
import {MenuItem, SelectField} from 'material-ui';
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
import Navbar from './Navbar';
            
            </div>
        );
    }
}


export default CnAccountInformation;
