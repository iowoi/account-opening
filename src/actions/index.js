
import $ from 'jquery';
import moment from 'moment';
/**
 * action type
 */

export const SET_LOCTION = 'SET_LOCTION';
export const GET_SOURCE = 'GET_SOURCE';
export const SEND_FORM = 'SEND_FORM';


const headerConfig = (type, data) => ({
  method: type,
  headers: {
  },
  body: JSON.stringify(data),
});

/**
  * action creators
  */

export function sendLocation(data) {
  return (dispatch) => {
    dispatch({ type: SET_LOCTION, data });
  };
}

/**
 * get select
 */

export function getSource() {
  const ApiUrl = 'https://testapi.kvbkunlun.com/api2/SecurityAccount/GetSource';
  return (dispatch) => {
    fetch(ApiUrl, headerConfig('GET'))
      .then((response) => response.json())
      .then((result) => {
        const data = result.returnValue;
        dispatch({ type: GET_SOURCE, data });
      });
  };
}


/**
 * Send Form
 */

export function sendForm(dataForm) {
  const ApiUrl = `${API_URL}/Apply`;

  const PersonalDetail = dataForm.PersonalDetail.values;
  const SecurityQuestions = dataForm.SecurityQuestions.values.SecurityQuestions;
  const newSourceOfIncome = [];
  const Declarations = ['AgreeAccuracyAndNotification', 'AgreeKVBTermsConditions', 'AgreeRisks', 'AgreePrivacy', 'AgreeOther'];
  for (let i = 0; i < Declarations.length; i++) {
    if (PersonalDetail[Declarations[i]]) {
      PersonalDetail[Declarations[i]] = '1';
    }
  }

  if (PersonalDetail.SourceOfIncome) {
    console.log('=======================================================');
    console.log('[SourceOfIncome]:', PersonalDetail.SourceOfIncome);
    console.log('=======================================================');

    PersonalDetail.SourceOfIncome.map((incomeData, index) => {
      // console.log(incomeData)
      // incomeData['SourceOfIncomeId'] = index
      if (incomeData) {
        if (incomeData.SourceOfIncomePercent) {
          const obj = {
            SourceOfIncomeId: index + 1,
            SourceOfIncomePercent: incomeData.SourceOfIncomePercent,
            SourceOfIncomeDescription: incomeData.SourceOfIncomeDescription ? incomeData.SourceOfIncomeDescription : '',
          };
          newSourceOfIncome.push(obj);
        }
      }
    });
    console.log(newSourceOfIncome);
  }
  if (PersonalDetail.Tax) {
    PersonalDetail.Tax.map((TaxData, index) => {
      if (TaxData.haveTIN) {
        delete TaxData.haveTIN;
      }
      if (TaxData.haveIRD) {
        delete TaxData.haveIRD;
      }
    });
  }

  PersonalDetail.Birthday = moment(PersonalDetail.Birthday, 'dd/mm/YYYY');
  PersonalDetail.ContactNumber = PersonalDetail.contactCountryCode + (PersonalDetail.contactAreaCode ? PersonalDetail.contactAreaCode : '') + PersonalDetail.ContactNumber;
//   console.log('=======================================================');
//   console.log('[TaxResidents]:', PersonalDetail.Tax);
//   console.log('=======================================================');
//   console.log('=======================================================');
//   console.log('[IBQuestions]:', SecurityQuestions);
//   console.log('=======================================================');
  const Param = {};
  Param.Email = PersonalDetail.Email;
  Param.TaxResidents = StrToBase64(PersonalDetail.Tax);
  Param.IBQuestions = StrToBase64(SecurityQuestions);
  Param.SourceOfIncome = StrToBase64(newSourceOfIncome);

  delete PersonalDetail.Tax;
  delete PersonalDetail.isSenior;
  delete PersonalDetail.standadLotRadio;
  delete PersonalDetail.taxResidentCountries;
  delete PersonalDetail.SourceOfIncome;

  Param.DATA = StrToBase64(PersonalDetail);
  // console.log('=======================================================');
  // console.log('[PersonalDetail]:', PersonalDetail);
  // console.log('=======================================================');

  return (dispatch) => {
    $.ajax({
      url: '/api/HttpPost/',
      type: 'POST',
      dataType: 'json',
      data: {
        ApiUrl: ApiUrl,
        Param: JSON.stringify(Param),
      },
      success(response) {
        response.Param = Param;
        response.renderPage = 'finish';
        const _email = response.returnValue.Email;
        const _guid = response.returnValue.Guid;
        const _no = response.returnValue.No;
        setCookie('Email', _email, cookieDate);
        setCookie('Guid', _guid, cookieDate);
        setCookie('No', _no, cookieDate);
        SendWelcomeMail(_no, _email);
        GeneratePDF(_guid, _no);
        // console.log("Email,Guid,No:"+_email,_guid,_no)
        // $.ajax({
        //     url: `/api/SecurityAccount/GeneratePDF/?Guid=${_guid}&No=${_no}`,
        //     type: "POST"
        // })
        // $.ajax({
        //     url: `/api/SecurityAccount/WelcomeMail/send/?No=${_no}&Email=${_email}`,
        //     type: "POST"
        // })
        dispatch({ type: SEND_FORM, response });
      },
    });
  };
}

function SendWelcomeMail(No, Email) {
  $.ajax({
    url: '/api/SecurityAccount/WelcomeMail/Send/',
    type: 'POST',
    dataType: 'json',
    data: {
      No,
      Email,
    },
    success(info) {
      console.log(JSON.stringify(info));
    },
  });
}

function GeneratePDF(Guid, No) {
  $.ajax({
    url: '/api/SecurityAccount/GeneratePDF/',
    type: 'POST',
    dataType: 'json',
    data: {
      Guid: Guid,
      No: No,
    },
    success(info) {
      console.log(JSON.stringify(info));
    },
  });
}


const StrToBase64 = (str) => {
  const objJsonStr = JSON.stringify(str);
  const objJsonB64 = new Buffer(objJsonStr).toString('base64');
  return objJsonB64;
};
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


export const cookieDate = moment().add(6, 'days').toDate();


export function setCookie(name, value, expires) {
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

export function getCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function delCookie(name) {
  setCookie(name, '', -1);
}
export function scrollToElm(elm) {
  if ($(document).width() <= 991) {
    $('html, body').animate({
      scrollTop: elm.offset().top - $('header').height() - $('.mb-navbar').height() - $('.stepper').height(),
    });
  } else {
    $('html, body').animate({
      scrollTop: elm.offset().top - $('header').height(),
    });
  }
}

export function formatFloat(num, pos) {
  const size = Math.pow(10, pos);
  return Math.round(num * size) / size;
}
