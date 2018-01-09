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
   
    componentDidUpdate(){
        const {history,location} = this.props
        if(history.action === 'PUSH'  ||  history.action === 'POP'){
            window.scrollTo(0, 0)
        }
        // if(history.action === 'PUSH' && location.pathname.indexOf('personal-detail') != -1 ){
        //     window.scrollTo(0, 0)
        // }else if (history.action === 'POP' && location.pathname.indexOf('personal-detail') != -1){
        //     window.scrollTo(0, 0)
        // }
    }
    
    render() {        
        const {location, source, routes} = this.props
        
        return (
            <div>
                {location.pathname.indexOf('form') != -1 ? null : <Header/>}
                <RouteWithSubRoutes routes={routes} source={source} />
                <Route exact path={ROOT_PATH} render={() => (<Redirect to={ROOT_PATH+'cn/term'}/>)}/>
                <Route exact path={ROOT_PATH+'cn'} render={() => (<Redirect to={ROOT_PATH+'cn/term'}/>)}/>
                <Route exact path={ROOT_PATH+'cn/'} render={() => (<Redirect to={ROOT_PATH+'cn/term'}/>)}/>
                <Route exact path={ROOT_PATH+'en'} render={() => (<Redirect to={ROOT_PATH+'en/term'}/>)}/>
                <Route exact path={ROOT_PATH+'en/'} render={() => (<Redirect to={ROOT_PATH+'en/term'}/>)}/>
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