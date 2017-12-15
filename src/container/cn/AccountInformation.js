import {connect} from 'react-redux';
import AccountInformation from '../../component/cn/Form/AccountInformation';

const mapStateToPorps = (state) => ({
    source: state.info.source,
    initialValues: {
        GendersId: "1",
        ContactTypesId: "1",
        standadLotRadio: "0",
        employmentStatus: "Employed 受雇",
        isSenior: "No",
        isUSA: "No",
        bornInUSA: "No",
        CountryId: state.info.data ? state.info.data.loc : null,
        NationalityId: state.info.data ? state.info.data.loc : null,
        BirthCountryId: state.info.data ? state.info.data.loc : null,        
        taxResidentCountries: state.info.data ? state.info.data.loc : null
    }
})

const CnAccountInformation = connect(
    mapStateToPorps
)(AccountInformation)

export default CnAccountInformation;