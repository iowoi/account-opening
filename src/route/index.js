import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';

export class RouteWithSubRoutes extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Switch>
                {this.props.routes
                    .map((route, i) => (
                        <SubRoutes key={i} {...route}/>
                    ))}
            </Switch>
        );
    }
}

const SubRoutes = (route) => (
    <Route
        path={route.path}
        render={props => (<route.component {...props} routes={route.routes}/>)}/>
)