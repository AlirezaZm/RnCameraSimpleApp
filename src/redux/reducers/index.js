import { combineReducers } from 'redux'

import statusReducer from './systemStatus'

const rootReducers = combineReducers({
    status: statusReducer
})

export default rootReducers