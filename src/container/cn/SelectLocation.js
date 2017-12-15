import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {sendLocation} from '../../actions';
import CnTerm from '../../component/cn/term';

const mapStateToProps = (state) => ({
    source: state.info.source,
    initialValues: {
        loc: "7"
    }
})

const mapDispatchToProps = (dispatch) => ({
    sendLocation:(data) => {
        dispatch(sendLocation(data))
    }
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CnTerm))