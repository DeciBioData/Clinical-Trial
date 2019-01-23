/* eslint-disable */
import React, { Component } from 'react'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap'

class FilterInstruction extends Component {
	constructor(props) {
		super(props)
		this.name = props.name
		this.type = props.type
		this.content = props.content
		this.state = {
			isInstructionOpen: false
		}
	}

	toggleInstruction() { this.setState({ isInstructionOpen: !this.state.isInstructionOpen })}
	openInstruction() { this.setState({ isInstructionOpen: true }) }
	closeInstruction() { this.setState({ isInstructionOpen: false })}

	render() {
		return(
			<div className="filter-titles row">
				<h6 className="col-10 col-md-10 col-sm-10 justify-content-start"><strong>{this.name}</strong> {this.props.result ? this.props.result : null}</h6>
				<div className="col-2 col-md-2 col-sm-2 justify-content-end">
				    <a className="popover-buttons" id={`Popover${this.type}`} href="#" onMouseEnter={this.openInstruction.bind(this)} onMouseLeave={this.closeInstruction.bind(this)}>
				      <i className="fa fa-question-circle-o"></i>
				    </a>
			    </div>
			    <Popover placement="right" isOpen={this.state.isInstructionOpen} target={`Popover${this.type}`} toggle={this.toggleInstruction.bind(this)}>
			      <PopoverHeader>{this.name}</PopoverHeader>
			      <PopoverBody>
			      	{this.content}
			      </PopoverBody>
			    </Popover>						
			</div>
		)		
	}
}

export default FilterInstruction
