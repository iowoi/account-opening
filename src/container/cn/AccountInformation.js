import {connect} from 'react-redux';
import AccountInformation from '../../component/cn/Form/AccountInformation';


const CnAccountInformation = connect(
    state => {
        const initialValues = {
            InvestmentTypesId: "1",
            CurrencyTypesId: "1",
            AccountTypeId: "1",
            MarketAccessId:"1"
            
        }
        const source =  state.info.source
        return {source,initialValues};
    }
)(AccountInformation)
  

export default CnAccountInformation;