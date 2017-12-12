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
    const ApiUrl = `${API_URL}GetSource`
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