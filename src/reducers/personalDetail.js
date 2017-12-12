import {SET_LOCTION,GET_SOURCE} from '../actions'

function personalDetailReducer(state = [], action) {
  switch (action.type) {
    case SET_LOCTION:
      return {data: action.data}
    case GET_SOURCE:
      return {source: action.data}
    default:
      return state
  }
}

export default personalDetailReducer
