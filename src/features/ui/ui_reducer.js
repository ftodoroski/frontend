import { combineReducers } from "redux";
import loadingReducer from './loading_slice'
import profileManagerOverlayReducer from './profile_manager_overlay_slice'
import mediaOverlayReducer from './media_overlay_slice'


export default combineReducers({
    loading: loadingReducer, 
    profileManagerOverlay: profileManagerOverlayReducer,
    mediaOverlay: mediaOverlayReducer
})
