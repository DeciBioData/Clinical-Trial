import React, { Component } from 'react'
import { connect } from "react-redux"
import { filterSliders } from "../../../actions/filterActions"
import { updateData } from "../../../actions/dataActions"
import Nouislider from "nouislider-react"
import "nouislider/distribute/nouislider.css"

import SliderInput from "./SliderInput"

class Slider extends Component {

	onSlide(render, handle, value, un, percent) {
		this.props.filterSliders(this.props.type, value)
		this.props.updateData(this.props.companies, this.props.filters)
	}

	onChange(render, handle, value, un, percent) {
		this.props.filterSliders(this.props.type, value)
		this.props.updateData(this.props.companies, this.props.filters)
	}

	render() {
		return (
			<div className="sliderInputs-section row">
				<div className="slider-buttons col-md-1 col-1 col-sm-1">
					<SliderInput name={this.props.type} type="Min" min={this.props.range.min} max={this.props.range.max} range={this.props.value}/>
				</div>
	 			<div className="sliders col-md-8 col-8 col-sm-8">
		 			<Nouislider 
			 			range={this.props.range}
			 			step={1}
			 			start={this.props.value} 
			 			connect
			 			onSlide={this.onSlide.bind(this)}
			 			onChange={this.onChange.bind(this)}
		 			/>
	 			</div>
	 			<div className="slider-buttons col-md-1 col-1 col-sm-1">
					<SliderInput name={this.props.type} type="Max" min={this.props.range.min} max={this.props.range.max} range={this.props.value}/>
				</div>	
 			</div>
		)
	}
}

const mapStateToProps = state => ({
	companies: state.data.companies,
	filters: state.filter.filters
})

export default connect(mapStateToProps, { filterSliders, updateData })(Slider)