import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducers } from '../features/root_reducer'


const appReducer = combineReducers(reducers)

const rootReducer = (state, action) => {
    if (action.type === 'SIGN_OUT') {
        state = undefined
    }

    return appReducer(state, action)
}

export default configureStore({
    reducer: rootReducer,
})
