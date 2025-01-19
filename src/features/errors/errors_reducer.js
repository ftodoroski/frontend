import { combineReducers } from "redux";
import sessionErrorsReducer from './session_errors_slice'
import searchErrorsReducer from './search_errors_slice'
import watchlistErrorsReducer from './watchlist_errors_slice'


export default combineReducers({
    session: sessionErrorsReducer, 
    search: searchErrorsReducer,
    watchlist: watchlistErrorsReducer
})
