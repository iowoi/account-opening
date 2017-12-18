import {SET_LOCTION, GET_SOURCE, SEND_FORM} from '../actions'

const initState = []

const personalDetailReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOCTION:
      return {
        ...state,
        data: action.data
      };
    case GET_SOURCE:
      return {
        ...state,
        source: action.data
      };
    case SEND_FORM:
      return {
        ...state,
        source: action.data
      };
    default:
      return state;
  }
}

export default personalDetailReducer
