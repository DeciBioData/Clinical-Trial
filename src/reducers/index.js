import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import filterReducer from './filterReducer'
import paginationReducer from './paginationReducer'


export default combineReducers({
	data: dataReducer,
	filter: filterReducer,
	pagination: paginationReducer
})