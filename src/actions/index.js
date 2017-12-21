
import $ from 'jquery';
import moment from 'moment';
/**
 * action type
 */

export const SET_LOCTION = 'SET_LOCTION';
export const GET_SOURCE = 'GET_SOURCE';
export const SEND_FORM = 'SEND_FORM';


const headerConfig = (type, data) => {
    return ({
        method: type,
        headers: {
        },
        body: JSON.stringify(data)
    })
}

/**
  * action creators
  */

export function sendLocation(data) {
    return (dispatch) => {
        dispatch({type: SET_LOCTION, data});
    }
}



/**
 * get select
 */

export function getSource() {
    const ApiUrl = `https://testapi.kvbkunlun.com/api2/SecurityAccount/GetSource`
    return (dispatch) => {
        fetch(ApiUrl, headerConfig('GET'))
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                const data = result.returnValue
                dispatch({type: GET_SOURCE, data})
            });
    }
}



/**
 * Send Form
 */

export function sendForm(dataForm) {
    const ApiUrl = `${API_URL}/Apply`
    
    const PersonalDetail = dataForm.PersonalDetail.values
    const SecurityQuestions = dataForm.SecurityQuestions.values.SecurityQuestions
    const newSourceOfIncome = [];
    const Declarations = ["AgreeAccuracyAndNotification", "AgreeKVBTermsConditions", "AgreeRisks", "AgreePrivacy", "AgreeOther"];
    for(let i = 0; i <Declarations.length; i++){
        if(PersonalDetail[Declarations[i]]){
            PersonalDetail[Declarations[i]] = '1'
        }
    }
    
    if(PersonalDetail.SourceOfIncome){
        PersonalDetail.SourceOfIncome.map((incomeData,index)=>{
            incomeData.SourceOfIncomeId = index
            newSourceOfIncome.push(incomeData)
        })
    }
    PersonalDetail.Birthday = moment(PersonalDetail.Birthday,'dd/mm/YYYY')
    PersonalDetail.ContactNumber = PersonalDetail.contactCountryCode + PersonalDetail.contactAreaCode + PersonalDetail.ContactNumber
    
    var Param = {};
    Param["Email"] = PersonalDetail.Email;
    Param["TaxResidents"] = StrToBase64(PersonalDetail.Tax);
    Param["IBQuestions"] = StrToBase64(SecurityQuestions);
    Param["SourceOfIncome"] = StrToBase64(newSourceOfIncome);
    
    delete PersonalDetail.Tax;
    delete PersonalDetail.isSenior;
    delete PersonalDetail.standadLotRadio;
    delete PersonalDetail.taxResidentCountries;
    delete PersonalDetail.SourceOfIncome;
    
    Param["DATA"] = StrToBase64(PersonalDetail);
    
    
    return (dispatch) => {
        
        $.ajax({
            url: "/api/HttpPost/", 
            type: "POST", 
            dataType: "json", 
            data: {
                "ApiUrl": ApiUrl, 
                "Param": JSON.stringify(Param)
            }, 
            success: function (response) {
                response.Param = Param
                response.renderPage = 'finish'
                const _email = response.returnValue.Email 
                const _guid = response.returnValue.Guid 
                const _no = response.returnValue.No 
                setCookie('Email', _email, cookieDate)
                setCookie('Guid', _guid, cookieDate)
                setCookie('No', _no, cookieDate)
                $.ajax({
                    url: `/api/SecurityAccount/GeneratePDF/?Guid=${_guid}&No=${_no}`, 
                    type: "POST"
                })
                $.ajax({
                    url: `/api/SecurityAccount/WelcomeMail/send/?No=${_no}&Email=${_email}`, 
                    type: "POST"
                })
                dispatch({type: SEND_FORM, response})
                
            }
        });

    }
}

const StrToBase64 = (str) => {
    let objJsonStr = JSON.stringify(str);
    let objJsonB64 = new Buffer(objJsonStr).toString("base64");
    return objJsonB64;
}
// var ApiPath = "/api2/SecurityAccount/Apply";
// dataForm
// var PARAM = {};

// if (confirm("是否确定提交?") == false)
//     return (false);
// }
// PARAM["Email"] = DATA["Email"];
// PARAM["DATA"] = base64.encode(JSON.stringify(DATA));
// PARAM["TaxResidents"] = base64.encode(JSON.stringify(TaxResidents));
// PARAM["IBQuestions"] = base64.encode(JSON.stringify(IBQuestions));
// PARAM["SourceOfIncome"] = base64.encode(JSON.stringify(SourceOfIncome));

// $.ajax({
//     url: ApiPath
//     , type: "POST"
//     , dataType: "json"
//     , data: PARAM
//     , success: SendForm_finish
// });




export const cookieDate = moment().add(6, 'days').toDate()


export function setCookie(name, value, expires) {
	document.cookie = `${name}=${value}; expires=${expires}; path=/`
}

export function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

export function delCookie(name) {
	setCookie(name, "", -1);
}
