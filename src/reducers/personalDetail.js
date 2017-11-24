import {
    SET_LOCTION
} from '../actions'

function personalDetailReducer(state = [], action) {
    switch (action.type) {
      case SET_LOCTION:
        return {
          data: action.data
        }
      default:
        return state
    }
  }
  
  
  export default personalDetailReducer
  