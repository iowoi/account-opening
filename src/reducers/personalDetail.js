import {SET_LOCTION, GET_SOURCE} from '../actions'

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
    default:
      return state;
  }
}

export default personalDetailReducer
