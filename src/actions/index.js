/**
 * action type
 */

 export const SET_LOCTION = 'SET_LOCTION'

/**
  * action creators
  */
  
export function sendLocation(data) {
    return (dispatch) => {
        dispatch({ 
            type: SET_LOCTION, 
            data
        });
    }
}