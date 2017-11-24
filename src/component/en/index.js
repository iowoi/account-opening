import React, {Component} from 'react';
import {RouteWithSubRoutes} from '../../route/';
import {Route, Redirect} from 'react-router-dom';

class EnIndex extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <RouteWithSubRoutes routes={this.props.routes}/>
                <Route exact path='/en' render={() => (<Redirect to='en/term'/>)}/>
            </div>
        );
    }
}

export default EnIndex;
