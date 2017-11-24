import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import personalDetailReducer from './personalDetail';

const rootReducer = combineReducers({
    form: formReducer,
    info: personalDetailReducer
})

export default rootReducer;