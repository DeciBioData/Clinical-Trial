import { CHANGE_PAGE_NUMBER, CHANGE_LAST_PAGE_NUMBER } from './types'

export const changePageNumber = (pageNumber) => dispatch => {
	dispatch({
		type: CHANGE_PAGE_NUMBER,
		payload: pageNumber
	})
}

export const changeLastPageNumber = (pageNumber) => dispatch => {
	dispatch({
		type: CHANGE_LAST_PAGE_NUMBER,
		payload: pageNumber
	})
}