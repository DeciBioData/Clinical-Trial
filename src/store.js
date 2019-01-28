import mixpanel from 'mixpanel-browser'
import MixpanelMiddleware from 'redux-mixpanel-middleware'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

// init mixpanel and pass mixpanel client to middleware
mixpanel.init('876ad24aad4fd665f0b3a0af7f74cbad')
const mixpanelMiddleware = new MixpanelMiddleware(mixpanel)
const middleware = [thunk, mixpanelMiddleware]
const initialState = {}

const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(...middleware)
)

export default store