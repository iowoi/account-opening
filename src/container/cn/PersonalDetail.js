import React, {Component} from 'react';
import PersonalDetail from '../../component/cn/Form/PersonalDetail';
import {connect} from 'react-redux';



const CnPersonalDetail = connect(
    state => {
        const initialValues = {
            GendersId: "1",
            TitleTypesId: "1",
            ContactTypesId: "3",
            standadLotRadio: "0",
            PrescribedPersonId: "2",
            CitizenOrTaxResidentOfUSAId: "1",
            BornInUSAAndSurrenderedCitizenshipId: "1",
            DiffrentAddress: "No",
            EmploymentStatusesId: "1" ,
            TypeOfIdentificationId: "1",
            MaritalStatusId: "1",
            CountryId: state.info.data ? state.info.data.loc : null,
            //NationalityId: state.info.data ? state.info.data.loc : null,
            //BirthCountryId: state.info.data ? state.info.data.loc : null,        
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
            FundsAvailableLevelsId: "1",
            FundSourceTypesId: "1",
            ClearUnderstandingId: '1',
            //Declaration
            AgreeAccuracyAndNotification: "1",
            AgreeDisclosureInfoToServiceProviderId: "1",
            AgreeKVBTermsConditions: "1",
            AgreeOther: "1",
            AgreePrivacy: "1",
            AgreeRisks: "1",

            // request 
            FirstName: 'Martina',
            Surname: 'Lin',
            Email: 'martina.lin@bancklogix.com',
            BirthCountryId: '2',
            NationalityId: '2',
            ResidentialAddress: 'ResidentialAddress',
            City: 'City',
            CountryId: '2',
            MailingAddress: 'MailingAddress',
            ContactTypesId: '1',
            contactCountryCode: 'contactCountryCode',
            ContactNumber: 'ContactNumber',
            TelephonePassword: 'TelephonePassword',
            MaritalStatusId: '1',
            NumberOfDependents: 'NumberOfDependents',
            TypeOfIdentificationId: '1',
            IdentificationNumber: '12123',
            
            NameOfBank: 'NameOfBank',
            BankAddress: 'BankAddress',
            BSB: 'BSB',
            BankAccountNumber:'BankAccountNumber',
            BankCurrencyId: '1',
            BankAccountHolderName: 'BankAccountHolderName',
            SwiftCode: 'SwiftCode',
            EmploymentStatusesId: '1',
            CompanyName: 'CompanyName',
            Occupation: 'Occupation',
            BusinessTypesId: '1',
            EmployerCountry: '1',
            EmployerCity: '1',
            EmployerProvince: '1',
            EmployerPostalCode: '1',
            EmployerStreet1: '1',
            EmployerStreet2: '2',
            CitizenOrTaxResidentOfUSAId: '1',
            BornInUSAAndSurrenderedCitizenshipId:'1'
            
        }
        const source =  state.info.source
        const PersonalDetail = state.form.PersonalDetail
        
        return {source,PersonalDetail,initialValues};
    }
)(PersonalDetail)
  

export default CnPersonalDetail;