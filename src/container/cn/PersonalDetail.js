import {connect} from 'react-redux';
import PersonalDetail from '../../component/cn/Form/PersonalDetail';

const mapStateToPorps = (state) => ({
    user: state,
    initialValues: {
        gender: "male",
        contactType: "Work 办公室",
        standadLotRadio: "0",
        employmentStatus: "Employed 受雇",
        isSenior: "No",
        isUSA: "No",
        bornInUSA: "No",
        nationality: state.info.data ? state.info.data.loc : null,
        country: state.info.data ? state.info.data.loc : null,        
        taxResidentCountries: state.info.data ? state.info.data.loc : null
    }
})

const CnPersonalDetail = connect(
    mapStateToPorps
)(PersonalDetail)

export default CnPersonalDetail;