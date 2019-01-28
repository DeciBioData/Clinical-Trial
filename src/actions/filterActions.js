import { 
	FILTER_NAME, FILTER_DROPDOWNOPTIONS, CLEAR_ALL, CLEAR_DROPDOWNOPTIONS,
	FILTER_SLIDERS, CLEAR_SLIDERS
} from './types'

export const filterName = (name) => dispatch => {
	dispatch({
		type: FILTER_NAME,
		payload: name,
		meta: {
			mixpanel: {
			  event: 'Search name',
			  props: {
			  	input: name
			  }
			}
		}
	})
}

export const filterDropdownOptions = (type, item) => dispatch => {
	dispatch({
		type: FILTER_DROPDOWNOPTIONS,
		payload: {
			type,
			item
		},
		meta: {
			mixpanel: {
			  event: 'Dropdown filter',
			  props: {
			    type,
			    tags: item
			  }
			}
		}
	})
}

export const clearDropdownOptions = (type) => dispatch => {
	dispatch({
		type: CLEAR_DROPDOWNOPTIONS,
		payload: type
	})
}

export const clearAll = () => dispatch => {
	dispatch({
		type: CLEAR_ALL,
		payload: null
	})
}

export const filterSliders = (type, newRange) => dispatch => {
	dispatch({
		type: FILTER_SLIDERS,
		payload: {
			type,
			newRange
		},
          meta: {
            mixpanel: {
              event: 'Slider filter',
              props: {
                type,
                range: newRange
              }
            }
          }
	})
}

export const clearSliders = (type) => dispatch => {
	dispatch({
		type: CLEAR_SLIDERS,
		payload: type
	})
}



















