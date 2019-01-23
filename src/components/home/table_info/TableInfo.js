import React, { Component } from 'react'
import { connect } from 'react-redux'
import { exportExcel } from '../../../actions/otherActions'
import { clearSliders, filterDropdownOptions, clearAll } from '../../../actions/filterActions'
import { updateData } from "../../../actions/dataActions"

class TableInfo extends Component {

	constructor(props) {
		super(props)
		this.state = {
			sponsor: props.filters.sponsor.length === 0 ? null : props.filters.sponsor,
			phase: props.filters.phase.length === 0 ? null : props.filters.phase,
			enrollmentstatus: props.filters.enrollmentstatus.length === 0 ? null : props.filters.enrollmentstatus,
			biomarkertype: props.filters.biomarkertype.length === 0 ? null : props.filters.biomarkertype,
			biomarker: props.filters.biomarker.length === 0 ? null : props.filters.biomarker,
			purpose: props.filters.purpose.length === 0 ? null : props.filters.purpose,
			technology: props.filters.technology.length === 0 ? null : props.filters.technology,
			enrollmentvol: props.filters.enrollmentvol[0] === 1 && props.filters.enrollmentvol[1] === 10000 ? null : props.filters.enrollmentvol,
			biomarkercount: props.filters.biomarkercount[0] === 1 && props.filters.biomarkercount[1] === 80 ? null : props.filters.biomarkercount,
			trialstartdate: (props.filters.trialstartdate[0] === 2000 && props.filters.trialstartdate[1] === 2018) || (props.filters.trialstartdate[0] === 0 && props.filters.trialstartdate[1] === 2018) ? null : props.filters.trialstartdate,
			completiondate: (props.filters.completiondate[0] === 2000 && props.filters.completiondate[1] === 2040) || (props.filters.completiondate[0] === 0 && props.filters.completiondate[1] === 2040) ? null : props.filters.completiondate
		}
	}

	componentWillReceiveProps(nextProps) {
		const { filters } = nextProps
		this.setState({
			sponsor: filters.sponsor.length === 0 ? null : filters.sponsor,
			phase: filters.phase.length === 0 ? null : filters.phase,
			enrollmentstatus: filters.enrollmentstatus.length === 0 ? null : filters.enrollmentstatus,
			biomarkertype: filters.biomarkertype.length === 0 ? null : filters.biomarkertype,
			biomarker: filters.biomarker.length === 0 ? null : filters.biomarker,
			purpose: filters.purpose.length === 0 ? null : filters.purpose,
			technology: filters.technology.length === 0 ? null : filters.technology,
			enrollmentvol: filters.enrollmentvol[0] === 1 && filters.enrollmentvol[1] === 10000 ? null : filters.enrollmentvol,
			biomarkercount: filters.biomarkercount[0] === 1 && filters.biomarkercount[1] === 80 ? null : filters.biomarkercount,
			trialstartdate: (filters.trialstartdate[0] === 2000 && filters.trialstartdate[1] === 2018) || (filters.trialstartdate[0] === 0 && filters.trialstartdate[1] === 2018) ? null : filters.trialstartdate,
			completiondate: (filters.completiondate[0] === 2000 && filters.completiondate[1] === 2040) || (filters.completiondate[0] === 0 && filters.completiondate[1] === 2040) ? null : filters.completiondate
		})
	}

	clearFilters(type, content) {
		const dropdownList = ["sponsor", "phase", "enrollmentstatus", "biomarkertype", "biomarker", "purpose", "technology"]
		const sliderList = ["enrollmentvol", "biomarkercount", "trialstartdate", "completiondate"]

		if(dropdownList.indexOf(type) !== -1) {
			this.props.filterDropdownOptions(type, content)
			document.getElementById(`${type}-${content}`).checked = false
		}
		else if(sliderList.indexOf(type) !== -1){
			this.props.clearSliders(type)
		}
		this.props.updateData(this.props.data, this.props.filters)
	}

	clearAllFilter() {
		let inputs = document.querySelectorAll('input[type=checkbox]')
		for (let i = 0; i < inputs.length; i++) {
			inputs[i].checked = false;
		}
		this.props.clearAll()
		this.props.updateData(this.props.data, this.props.filters)
	}

	exportExcel(data, col) {
		exportExcel(data, col)
	}

	render() {
		const { 
			nctnumber, sponsor, phase, enrollmentstatus, biomarkertype, biomarker,
	    	purpose, technology, enrollmentvol, biomarkercount,trialstartdate, completiondate
	    } = this.state
		const showItems = []

		if(nctnumber) {
			nctnumber.forEach((data) => {
				showItems.push({ name: "NCTID", type:"nctnumber" ,content: data })
			})
		}
		if(sponsor) {
			sponsor.forEach((data) => {
				showItems.push({ name: "Sponsor", type:"sponsor" ,content: data })
			})
		}

		if(phase) {
			phase.forEach((data) => {
				showItems.push({ name: "Phase", type:"phase" ,content: data })
			})
		}

		if(enrollmentstatus) {
			enrollmentstatus.forEach((data) => {
				showItems.push({ name: "Status", type:"enrollmentstatus" ,content: data })
			})
		}

		if(biomarkertype) {
			biomarkertype.forEach((data) => {
				showItems.push({ name: "Biomarker Type", type:"biomarkertype" ,content: data })
			})
		}

		if(biomarker) {
			biomarker.forEach((data) => {
				showItems.push({ name: "Biomarker Group", type:"biomarker" ,content: data })
			})
		}

		if(purpose) {
			purpose.forEach((data) => {
				showItems.push({ name: "Purpose", type:"purpose" ,content: data })
			})
		}

		if(technology) {
			technology.forEach((data) => {
				showItems.push({ name: "Technology", type:"technology" ,content: data })
			})
		}

		if(enrollmentvol) showItems.push({ name: "Enrollment Vol.", type:"enrollmentvol", content: `${parseInt(enrollmentvol[0])} - ${parseInt(enrollmentvol[1])}`})
		if(biomarkercount) showItems.push({ name: "Biomarker Count", type: "biomarkercount", content: `${parseInt(biomarkercount[0])} - ${parseInt(biomarkercount[1])}`})
		if(trialstartdate) showItems.push({ name: "Start Date", type: "trialstartdate", content: `${parseInt(trialstartdate[0])} - ${parseInt(trialstartdate[1])}`})
		if(completiondate) showItems.push({ name: "Completion Date", type: "completiondate", content: `${parseInt(completiondate[0])} - ${parseInt(completiondate[1])}`})

		return(
			<div className="tags-section">
				<ul className="tags-list">
					{
						showItems.map((item, index) => {
							return (
								<li key={index} className="filterTags">
									<span className="badge badge-light">
									  	{item.name}: {item.content}
									  	<button type="button" className="btn btn-sm btn-light" onClick={this.clearFilters.bind(this, item.type, item.content)}>
								    		<span className="text-dark"><span aria-hidden="true">&times;</span></span>
								  		</button>
									</span>
								</li>
							)
						})
					}
					{ showItems.length === 0 ? '' : 
						<li className="filterTags">
							<button className="buttons info-buttons" onClick={this.clearAllFilter.bind(this)}>CLEAR ALL</button> 
						</li>
					}
					<li className="filterTags export-button"><button className="buttons success-buttons my-2 my-sm-0" onClick={this.exportExcel.bind(this, this.props.companies, this.props.columns)}>Export Table</button></li>
				</ul>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.data.data,
	processedData: state.data.processedData,
	filters: state.filter.filters
})

export default connect(mapStateToProps, { clearSliders,filterDropdownOptions, clearAll, updateData })(TableInfo)

