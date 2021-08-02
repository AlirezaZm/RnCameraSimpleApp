import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducers from './reducers'

const initilaState = {}


const store = createStore(rootReducers, initilaState, composeWithDevTools())

export default store