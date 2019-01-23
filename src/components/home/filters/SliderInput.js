import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import { filterSliders } from "../../../actions/filterActions"
import { updateData } from "../../../actions/dataActions"

class SliderInput extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isOpen: false,
			value: props.type === 'Min' ? props.range[0] : props.range[1]
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ value: nextProps.type === 'Min' ? nextProps.range[0]: nextProps.range[1] })
	}

	openPanel() {
		this.setState({ isOpen: !this.state.isOpen })
	}

	setValue(e) {
		let value = e.target.value
		value = value < this.props.min ? this.props.min : value
		value = value > this.props.max ? this.props.max : value
		if(this.props.type === 'Min') {
			this.props.filterSliders(this.props.name, [value, this.props.range[1]])
		}
		else {
			this.props.filterSliders(this.props.name, [this.props.range[0], value])
		}
		this.props.updateData(this.props.companies, this.props.filters)
	}

	render() {
		return (
			<div>
	    		<div>
				    <Button id={`Popover${this.props.name}${this.props.type}`} type="button" className="buttons info-buttons">
				    	{this.props.type}
				    </Button>
			    </div>
			    <Popover placement="bottom" isOpen={this.state.isOpen} target={`Popover${this.props.name}${this.props.type}`} toggle={this.openPanel.bind(this)}>
			      	<PopoverHeader>Set {this.props.type}</PopoverHeader>
			      	<PopoverBody>
			      		<input className="sliderInputs" type="number" min={this.props.min} max={this.props.max} placeholder={this.props.type} 
			      				value={this.state.value} onChange={this.setValue.bind(this)}/>
			      	</PopoverBody>
			    </Popover>
		    </div>
		)
	}
}

const mapStateToProps = state => ({
	companies: state.data.companies,
	filters: state.filter.filters
})

export default connect(mapStateToProps, { filterSliders, updateData })(SliderInput)