
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

    console.log('====================================');
    console.log('PersonalDetail.Tax',PersonalDetail.Tax);
    console.log('====================================');
    if(PersonalDetail.SourceOfIncome){
        PersonalDetail.SourceOfIncome.map((incomeData)=>{
            newSourceOfIncome.push(incomeData)
        })
    }else{
        alert('至少選擇一種以上的Source Of Income 收入来源')
        return;
    }
    if(!PersonalDetail.Tax){
        alert('至少填寫一種Individual Self-Certification 个人认证')
        return;
    }
    PersonalDetail.Birthday = moment(PersonalDetail.Birthday,'dd/mm/YYYY')
    PersonalDetail.ContactNumber = PersonalDetail.contactCountryCode + PersonalDetail.contactAreaCode + PersonalDetail.ContactNumber
    
    var Param = {};
    Param["Email"] = PersonalDetail.Email;
    Param["TaxResidents"] = StrToBase64(PersonalDetail.Tax);
    Param["IBQuestions"] = StrToBase64(SecurityQuestions);
    Param["SourceOfIncome"] = StrToBase64(newSourceOfIncome);
    console.log("DATA",PersonalDetail)
    
    delete PersonalDetail.Tax;
    delete PersonalDetail.isSenior;
    delete PersonalDetail.standadLotRadio;
    delete PersonalDetail.taxResidentCountries;
    delete PersonalDetail.SourceOfIncome;
    
    Param["DATA"] = StrToBase64(PersonalDetail);
    console.log("Email",Param["Email"])
    console.log("Param",Param)
    const response ={

        code:"0",
        message:"finish",
        returnValue:{Email: "martina.lin@bancklogix.com", Guid: "9e360c12-f4d4-4683-b0a9-0d5b23206df9", No: "S100075"},
        Email:"martina.lin@bancklogix.com",
        Guid:"9e360c12-f4d4-4683-b0a9-0d5b23206df9",
        No:"S100075"
    }
    return (dispatch) => {
        
        dispatch({type: SEND_FORM, response})
    }
    return;    
    return (dispatch) => {
        
        $.ajax({
            url: "/api/HttpPost/"
            , type: "POST"
            , dataType: "json"
            , data: {
                "ApiUrl": ApiUrl, 
                "Param": JSON.stringify(Param)
            }
            , success: function (response) {
                
                response.Param = Param
                response.renderPage = 'finish'
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
