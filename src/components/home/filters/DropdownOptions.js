import React, { Component } from "react"

class DropdownOptions extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: props.name,
			type: props.type,
			list: props.list
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			list: nextProps.list
		})
	}

	searchItem(e) {
	    const matchPrefix = (prefix, str) => {
	      prefix = prefix.toLowerCase()
	      str = str.toLowerCase()

	      if(prefix.length > str.length) return false
	      for(let i = 0; i < prefix.length; i++) {
	        if(prefix[i] !== str[i]) return false
	      }
	      return true
	    }

	    let tag = e.target.value
	    let items = document.getElementsByClassName(`${this.state.type}-items`)
		for(let i = 0; i < items.length; i++) {
			let value = items[i].getElementsByClassName(`${this.state.type}Checkbox`)[0].value
			if(tag !== "" && !matchPrefix(tag, value)) {
				items[i].style.display = "none"
			}else {
				items[i].style.display = ""
			}
		}
	}

	handleItem(type) {
		if(type === '(All)') this.clearItem()
		else this.props.handleDropdownOptions(this.state.type, type)  
		this.props.updateData()	
	}

	clearItem() {
	    let inputs = document.querySelectorAll(`.${this.state.type}Checkbox`)
	    for (let i = 0; i < inputs.length; i++) {
	      inputs[i].checked = false;
	    }
	    this.props.clearDropdownOptions(this.state.type)
	    this.props.updateData()    
	}

	render() {
		return (
			<div className="btn-group">
			  <button type="button" className="buttons info-buttons dropdown-toggle dropdown-buttons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    Select {this.state.name}
			  </button>
			  <div className="dropdown-menu">
			  	<input className="tagSearchInput" type="text" placeholder={`Search ${this.state.name}...`} onChange={this.searchItem.bind(this)} />
				{
					this.state.list.map((item, index) => {
						return (
							<div className={`form-check dropdown-item ${this.state.type}-items`} key={index}>
							  <input className={`form-check-input ${this.state.type}Checkbox`} type="checkbox" value={item} id={`${this.state.type}-${item}`} onChange={this.handleItem.bind(this, item)}/>
							  <label className="form-check-label" htmlFor={item}>
							   	{item}
							  </label>
							</div>								
						)
					})
				}
			  </div>
			</div>
		)
	}
}

export default DropdownOptions