import React, {Component} from 'react';
import PersonalDetail from '../../component/cn/Form/PersonalDetail';
import {connect} from 'react-redux';
import moment from 'moment';


const CnPersonalDetail = connect(
	state => {
		let _CountryCode = '86'
		if(state.info.source){
			if(state.info.data){
				state.info.source.CountryCode.map((data)=>{
					if(data.code == state.info.data.loc){
						_CountryCode =  data.CountryCode
					}
				})
			}
		}
		const devInit = {
			GendersId: "1",
			TitleTypesId: "1",
			ContactTypesId: "3",
			standadLotRadio: "0",
			PrescribedPersonId: "2",
			CitizenOrTaxResidentOfUSAId: "2",
			BornInUSAAndSurrenderedCitizenshipId: "2",
			DiffrentAddress: "No",
			EmploymentStatusesId: "1" ,
			TypeOfIdentificationId: "1",
			MaritalStatusId: "1",
			CountryId: state.info.data ? state.info.data.loc :  "7",
			NationalityId: state.info.data ? state.info.data.loc : "7",
			BirthCountryId: state.info.data ? state.info.data.loc : "7",              
			Tax:[
				{
					haveTIN:'Yes',
					haveIRD:'Yes',
					CountryCodesId:state.info.data ? state.info.data.loc : "7"
				}
			],
			//account information
			InvestmentTypesId: "1", 
			CurrencyTypesId: "1", 
			AccountTypeId: "1", 
			//MarketAccessId:"1",
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
			//Birthday: moment('01/01/1985', 'DD/MM/YYYY'),
			ResidentialAddress: 'ResidentialAddress',
			City: 'City',
			MailingAddress: 'MailingAddress',
			ContactTypesId: '1',
			contactCountryCode: _CountryCode,
			ContactNumber: '2299922',
			TelephonePassword: 'TelephonePassword',
			MaritalStatusId: '1',
			NumberOfDependents: '2',
			TypeOfIdentificationId: '1',
			IdentificationNumber: '12123',
			MarketAccessOthers:'',
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
			EmployerStreet1: '1',
			EmployerStreet2: '2',
			CitizenOrTaxResidentOfUSAId: '2',
			BornInUSAAndSurrenderedCitizenshipId:'2'
         
		}
		const initialValues = process.env.NODE_ENV === 'develop'? devInit : {
			GendersId: "1",
			TitleTypesId: "1",
			ContactTypesId: "3",
			standadLotRadio: "0",
			PrescribedPersonId: "2",
			CitizenOrTaxResidentOfUSAId: "2",
			BornInUSAAndSurrenderedCitizenshipId: "2",
			DiffrentAddress: "No",
			EmploymentStatusesId: "1" ,
			TypeOfIdentificationId: "1",
			MaritalStatusId: "1",
			//Birthday: moment('01/01/1985', 'DD/MM/YYYY'),
			CountryId: state.info.data ? state.info.data.loc : "7",
			NationalityId: state.info.data ? state.info.data.loc : "7",
			BirthCountryId: state.info.data ? state.info.data.loc : "7",  
			Tax:[
				{
					haveTIN:'Yes',
					haveIRD:'Yes',
					CountryCodesId:state.info.data ? state.info.data.loc : "7"
				}
			],      
			//account information
			InvestmentTypesId: "1", 
			CurrencyTypesId: "1", 
			AccountTypeId: "1", 
			// MarketAccessId:"1",
			//InvestmentBackground
			ExchangeExperenceId: "1",
			SharesOrBondsExperenceId: "1",
			IncomeLevelsId: "1",
			FundsAvailableLevelsId: "1",
			FundSourceTypesId: "1",
			ClearUnderstandingId: '1',
            
			//Declaration
			// AgreeAccuracyAndNotification: "1",
			// AgreeDisclosureInfoToServiceProviderId: "1",
			// AgreeKVBTermsConditions: "1",
			// AgreeOther: "1",
			// AgreePrivacy: "1",
			// AgreeRisks: "1",
			// request 
			// FirstName: 'Martina',
			// Surname: 'Lin',
			// Email: 'martina.lin@bancklogix.com',
			// ResidentialAddress: 'ResidentialAddress',
			// City: 'City',
			//MailingAddress: 'MailingAddress',
			ContactTypesId: '1',
			contactCountryCode: _CountryCode,
			// ContactNumber: 'ContactNumber',
			// TelephonePassword: 'TelephonePassword',
			MaritalStatusId: '1',
			//NumberOfDependents: 'NumberOfDependents',
			TypeOfIdentificationId: '1',
			// IdentificationNumber: '12123',
			// NameOfBank: 'NameOfBank',
			// BankAddress: 'BankAddress',
			// BSB: 'BSB',
			// BankAccountNumber:'BankAccountNumber',
			BankCurrencyId: '1',
			// BankAccountHolderName: 'BankAccountHolderName',
			// SwiftCode: 'SwiftCode',
			EmploymentStatusesId: '1',
			// CompanyName: 'CompanyName',
			// Occupation: 'Occupation',
			BusinessTypesId: '1',
			// EmployerCountry: '1',
			// EmployerCity: '1',
			// EmployerProvince: '1',
			// EmployerPostalCode: '1',
			// EmployerStreet1: '1',
			// EmployerStreet2: '2',
			CitizenOrTaxResidentOfUSAId: '2',
			BornInUSAAndSurrenderedCitizenshipId:'2',
			MarketAccessOthers:''
		}

        
		const source =  state.info.source
		const PersonalDetail = state.form.PersonalDetail
        
		return {source,PersonalDetail,initialValues};
	}
)(PersonalDetail)
  

export default CnPersonalDetail;


