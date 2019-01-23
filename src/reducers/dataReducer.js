/* eslint-disable */
import { FETCH_DATA, UPDATE_DATA } from '../actions/types'

const initialState = {
	data: [],
	processedData: [],
	onLoad: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_DATA:
			return {
				...state,
				data: action.payload,
				processedData: action.payload,
				onLoad: false
			}
			break
		case UPDATE_DATA:
			return {
				...state,
				processedData: action.payload
			}
			break
		default:
			return state
			break
	}
}