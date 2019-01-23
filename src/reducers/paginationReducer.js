/* eslint-disable */
import { CHANGE_PAGE_NUMBER, CHANGE_LAST_PAGE_NUMBER} from '../actions/types'

const initialState = {
	numberOfShowPerPage: 50,
	currentPage: 1,
	lastPage: 1
}

export default function(state = initialState, action) {
	switch(action.type) {
		case CHANGE_PAGE_NUMBER:
	    //prevent page out of bound
	    let currentPage = action.payload
	    let lastPage = state.lastPage
	    if(currentPage <= 0) currentPage = 1
	    else if(currentPage > lastPage) currentPage = lastPage
			return {
				...state,
				currentPage
			}
			break
		case CHANGE_LAST_PAGE_NUMBER:
			return {
				...state,
				lastPage: action.payload
			}
			break
		default:
			return state
			break
	}
}