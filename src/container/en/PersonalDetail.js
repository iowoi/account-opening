import React, {Component} from 'react';
import PersonalDetail from '../../component/en/Form/PersonalDetail';
import {connect} from 'react-redux';



const EnPersonalDetail = connect(
    state => {
        const initialValues = {
            GendersId: "1",
            TitleTypesId: "1",
            ContactTypesId: "3",
            standadLotRadio: "0",
            isSenior: "No",
            CitizenOrTaxResidentOfUSAId: "1",
            BornInUSAAndSurrenderedCitizenshipId: "1",
            DiffrentAddress: "No",
            EmploymentStatusesId: "1" ,
            TypeOfIdentificationId: "1",
            CountryId: state.info.data ? state.info.data.loc : null,
            NationalityId: state.info.data ? state.info.data.loc : null,
            BirthCountryId: state.info.data ? state.info.data.loc : null,        
            taxResidentCountries: state.info.data ? state.info.data.loc : null,
            //account information
            InvestmentTypesId: "1", 
            CurrencyTypesId: "1", 
            AccountTypeId: "1", 
            MarketAccessId:"1",
            //InvestmentBackground
            ExchangeExperenceId: "1",
            SharesOrBondsExperenceId: "1",
            IncomeLevelsId: "1",
            FundSourceTypesId: "1",
            ClearUnderstandingId: '1',
            //Declaration
            AgreeAccuracyAndNotification: "1",
            AgreeDisclosureInfoToServiceProviderId: "1",
            AgreeKVBTermsConditions: "1",
            AgreeOther: "1",
            AgreePrivacy: "1",
            AgreeRisks: "1"
        }
        const source =  state.info.source
        const PersonalDetail = state.form.PersonalDetail
        
        return {source,PersonalDetail,initialValues};
    }
)(PersonalDetail)
  

export default EnPersonalDetail;