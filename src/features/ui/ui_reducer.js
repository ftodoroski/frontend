import { combineReducers } from "redux";
import loadingReducer from './loading_slice'
import modalReducer from './modal_slice'


export default combineReducers({
    loading: loadingReducer, 
    modal: modalReducer
})
