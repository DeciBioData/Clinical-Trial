/* eslint-disable */
import { 
	FILTER_NAME, FILTER_DROPDOWNOPTIONS, CLEAR_ALL, CLEAR_DROPDOWNOPTIONS,
	FILTER_SLIDERS, CLEAR_SLIDERS
} from '../actions/types'

const initialState = {
	filters: {
	    nctnumber: "",
	    sponsor: [],
	    phase: [],
	    enrollmentstatus: [],
	    biomarkertype: [],
	    biomarker: [],
	    purpose: [],
	    technology: [],
	    enrollementvol: [1, 10000],
	    biomarkercount: [1, 80],
	    trialstartdate: [2000, 2018],
	    completiondate: [2000, 2040]
	}
}

export default function(state = initialState, action) {
	switch(action.type) {

		case FILTER_NAME:
			state.filters.name = action.payload
			return {
				...state,
				filters: state.filters
			}
			break

		case FILTER_DROPDOWNOPTIONS:
			switch(action.payload.type) {
				case 'column':
				    let typeIndex = state.columns.indexOf(action.payload.item)
				    if(typeIndex === -1) state.columns.push(action.payload.item)
				    else {
				      state.columns.splice(typeIndex, 1)
				    }
				    return {
				    	...state,
				    	columns: state.columns
				    }
					break
				default:
				    typeIndex = state.filters[action.payload.type].indexOf(action.payload.item)
				    if(typeIndex === -1) state.filters[action.payload.type].push(action.payload.item)
				    else {
				      state.filters[action.payload.type].splice(typeIndex, 1)
				    }
					return {
						...state,
						filters: state.filters
					}
					break
			}
			break

		case CLEAR_DROPDOWNOPTIONS:
			state.filters[action.payload] = []
			return {
				...state,
				filters: state.filters
			}
			break

		case CLEAR_SLIDERS:
			let defaultRange = {
			    enrollmentvol: [1, 10000],
			    biomarkercount: [1, 80],
			    trialstartdate: [2000, 2018],
			    completiondate: [2000, 2040]			
			}			
			state.filters[action.payload] = defaultRange[action.payload]
			return {
				...state,
				filters: state.filters
			}
			break
		case FILTER_SLIDERS:
			state.filters[action.payload.type] = action.payload.newRange
			return {
				...state,
				filters: state.filters
			}
			break

		case CLEAR_ALL:
			let { filters } = state
		    filters.sponsor = []
		    filters.phase = []
		    filters.enrollmentstatus = []
		    filters.biomarkertype = []
		    filters.biomarker = []
		    filters.studytype = []
		    filters.technology = []
		    filters.enrollementvol = [1, 10000]
		    filters.biomarkercount = [1, 80]
		    filters.trialstartdate = [2000, 2018]
		    filters.completiondate = [2000, 2040]
			return {
				...state,
				filters: state.filters
			}
			break

		default:
			return state
			break
	}
}