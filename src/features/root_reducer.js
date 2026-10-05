import authReducer from './auth/auth_slice'
import entitiesReducer from './entities/entities_reducer'
import errorsReducer from './errors/errors_reducer'
import uiReducer from './ui/ui_reducer'


export const reducers = {
    entities: entitiesReducer,
    errors: errorsReducer,
    ui: uiReducer, 
    auth: authReducer,
}