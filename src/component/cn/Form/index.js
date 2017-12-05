import React, {Component} from 'react';
import {RouteWithSubRoutes} from '../../../route';
import {Route, Redirect} from 'react-router-dom';
import NavBar from './common/Navbar';
import {Switch} from 'react-router-dom';
class FormIndex extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log("PROPS",this.props)
        return (
            <RouteWithSubRoutes routes={this.props.routes}/>
        );
    }
}

export default FormIndex;
