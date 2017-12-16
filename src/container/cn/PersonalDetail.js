import {connect} from 'react-redux';
import PersonalDetail from '../../component/cn/Form/PersonalDetail';


const CnPersonalDetail = connect(
    state => {
        const initialValues = {
            GendersId: "1",
            ContactTypesId: "3",
            standadLotRadio: "0",
            employmentStatus: "Employed 受雇",
            isSenior: "No",
            CitizenOrTaxResidentOfUSAId: "1",
            BornInUSAAndSurrenderedCitizenshipId: "1",
            SameAddress: "No",
            CountryId: state.info.data ? state.info.data.loc : null,
            NationalityId: state.info.data ? state.info.data.loc : null,
            BirthCountryId: state.info.data ? state.info.data.loc : null,        
            taxResidentCountries: state.info.data ? state.info.data.loc : null,
            InvestmentTypesId: "1",
            CurrencyTypesId: "1",
            AccountTypeId: "1",
            MarketAccessId:"1"
        }
        const source =  state.info.source
        const PersonalDetail = state.form.PersonalDetail
        
        return {source,PersonalDetail,initialValues};
    }
)(PersonalDetail)
  

export default CnPersonalDetail;