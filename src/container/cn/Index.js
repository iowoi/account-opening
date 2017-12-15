import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Route, Redirect} from 'react-router-dom';
import {getSource} from '../../actions';
import {RouteWithSubRoutes} from '../../route';
import { Header } from '../../component/Common';
class CnIndex extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.getSource();
    }
    
    render() {        
        //console.log('Redirect:',ROOT_PATH)
       const {location, source, routes,renderPage} = this.props
       //console.log(">>>>>>>>>>",source)
       
        return (
            <div>
                {location.pathname.indexOf('form') != -1 ? null : <Header/>}
                <RouteWithSubRoutes routes={routes} source={source} />
                <Route exact path={ROOT_PATH} render={() => (<Redirect to={ROOT_PATH+'cn/term'}/>)}/>
                <Route exact path={ROOT_PATH+'cn'} render={() => (<Redirect to={ROOT_PATH+'cn/term'}/>)}/>
                <Route exact path={ROOT_PATH+'cn/'} render={() => (<Redirect to={ROOT_PATH+'cn/term'}/>)}/>
            </div>
        );
    }
}


const mapStateToPorps = (state) => ({
    source: state.info.source
})

const mapDispatchToProps = (dispatch) => ({
    getSource:() => {
        dispatch(getSource())
    }
})

export default withRouter(connect(
    mapStateToPorps,
    mapDispatchToProps
)(CnIndex))