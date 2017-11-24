import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {sendLocation} from '../../actions';
import CnTerm from '../../component/cn/term';

const mapStateToPorps = (state) => ({
    initialValues: {
        loc: "China"
    }
})

const mapDispatchToProps = (dispatch) => ({
    sendLocation:(data) => {
        dispatch(sendLocation(data))
    }
})

export default withRouter(connect(
    mapStateToPorps,
    mapDispatchToProps
)(CnTerm))