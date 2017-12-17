/**
 * action type
 */

export const SET_LOCTION = 'SET_LOCTION';
export const GET_SOURCE = 'GET_SOURCE';

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
    const ApiUrl = `${API_URL}/GetSource`
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
    const PersonalDetail = dataForm.PersonalDetail
    const SecurityQuestions = dataForm.SecurityQuestions
    const newSecurityQuestions = [];
    console.log(SecurityQuestions.values)
    console.log(PersonalDetail.values.Tax)
    console.log(PersonalDetail.values.SourceOfIncome)
    PersonalDetail.values.SourceOfIncome.map((incomeData)=>{
        console.log("incomeData",incomeData)
        newSecurityQuestions.push(incomeData)
        console.log('====================================');
        console.log(newSecurityQuestions);
        console.log('====================================');
    })
    var PARAM = {};
    PARAM["Email"] = "martina@riease.com";
    PARAM["DATA"] = StrToBase64(PersonalDetail.values);
    PARAM["TaxResidents"] = StrToBase64(PersonalDetail.values.Tax);
    PARAM["IBQuestions"] =StrToBase64(SecurityQuestions.values.SecurityQuestions);
    PARAM["SourceOfIncome"] = StrToBase64(newSecurityQuestions);
    console.log(PARAM)
    
    
    
    return (dispatch) => {
        fetch(ApiUrl, headerConfig('POST'))
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                const data = result.returnValue
                dispatch({type: GET_SOURCE, data})
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
