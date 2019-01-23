import React, { Component } from 'react'
import { connect } from "react-redux"
import { 
	filterName, filterDropdownOptions, clearDropdownOptions
} from "../../../actions/filterActions"
import { updateData } from "../../../actions/dataActions"
import { load } from '../../../helper/spreadsheet'
import config from '../../../helper/config'

import Slider from './Slider'
import FilterInstruction from "./FilterInstruction"
import DropdownOptions from "./DropdownOptions"

class Filter extends Component {

	constructor(props) {
		super(props)
		this.state = {
			sponsorList: [],
			phaseList: [],
			statusList: [],
			biomarkerTypeList: [],
			biomarkerGroupList:[],
			studyPurposeList: [],
			technologyList: []
		}
	}

	componentDidMount() {
	    // 1. Load the JavaScript client library.
	    window.gapi.load("client", () => {
	      // 2. Initialize the JavaScript client library.
	      window.gapi.client
	        .init({
	          apiKey: config.apiKey,
	          // Your API key will be automatically added to the Discovery Document URLs.
	          discoveryDocs: config.discoveryDocs
	        })
	        .then(() => {
	        // 3. Initialize and make the API request.
	        load((data, error) => {
	          if (data) {
	            let list = data.DataSets
	            this.setState({
	            	sponsorList: list.map((entry) => entry.sponsor),
					phaseList: list.map((entry) => entry.phase),
					statusList: list.map((entry) => entry.status),
					biomarkerTypeList: list.map((entry) => entry.biomarkertype),
					biomarkerGroupList:list.map((entry) => entry.biomarkergroup),
					studyPurposeList: list.map((entry) => entry.purpose),
					technologyList: list.map((entry) => entry.technology)
	            })
	          }
	        })
	      })
	    })
	}

	updateData() {
		this.props.updateData(this.props.data, this.props.filters)
	}

	handleSearchName(e) { 
		this.props.filterName(e.target.value)
		this.updateData()
	}

	handleDropdownOptions(type, item) {
		this.props.filterDropdownOptions(type, item)
	}

	clearDropdownOptions(type) {
		this.props.clearDropdownOptions(type)
	}

	render() {
		const { processedData, filters } = this.props
		const { sponsorList, phaseList, statusList, biomarkerTypeList, biomarkerGroupList, studyPurposeList, technologyList } = this.state
		return (
			<div className="side-nav with-shadow-light">
				<div className="company-count">
					<h6><strong>{processedData.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong> Clinical Trails</h6>
				</div>
				<div className="mr-auto company-search">
					<FilterInstruction name="Search Biomarker" type="BiomarkerSearch" content="Search for the exact name of the biomarkers"/>
					<input className="form-control mr-sm-2 search-companyInput" type="search" placeholder="Search Biomarker.." aria-label="Search" onChange={this.handleSearchName.bind(this)}/>
			  	</div>

				<div className="category-filter">
					<FilterInstruction name="Trial Sponsor" type="Sponsor" content="Filter down trails by selecting sponsors. Use the search bar to look up relevant tags"/>
					<DropdownOptions 
						name="Sponsor" type="sponsor" list={sponsorList} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Phase" type="Phase" content='Filter down trails by selecting the phase.'/>
					<DropdownOptions 
						name="Phase" type="phase" list={phaseList} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Enrollement Status" type="Status" content='Filter down companies by status'/>
					<DropdownOptions 
						name="Status" type="enrollmentstatus" list={statusList} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Biomarker Type" type="Type" content='Filter down trails by biomarker types'/>
					<DropdownOptions 
						name="Type" type="biomarkertype" list={biomarkerTypeList} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Biomarker Grouping - Granular" type="Group" content='Filter down trails by biomarker grouping'/>
					<DropdownOptions 
						name="Group" type="biomarker" list={biomarkerGroupList} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Study Purpose" type="Purpose" content='Filter down trails by study purpose'/>
					<DropdownOptions 
						name="Purpose" type="purpose" list={studyPurposeList} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Technology" type="Technology" content='Filter down trails by technology'/>
					<DropdownOptions 
						name="Technology" type="technology" list={technologyList} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="filter-slider">
					<FilterInstruction name="Enrollment Volume" type="EnrollmentVolume" result={`( ${Math.round(filters.enrollmentvol[0])} - ${Math.round(filters.enrollmentvol[1])} )`}
						content='Filter down trails by selecting their minimum and maximum enrollment volume'/>
					<Slider type="enrollmentvol" value={filters.enrollmentvol} range={{min: 1, max: 10000}}/>
				</div>
				<div className="filter-slider">
					<FilterInstruction name="Biomarker Count" type="Count" result={`( ${Math.round(filters.biomarkercount[0])} - ${Math.round(filters.biomarkercount[1])} )`}
						content='Filter down trails by selecting their minimum and maximum count of biomarker count'/>
					<Slider type="biomarkercount" value={filters.biomarkercount} range={{min: 1, max: 80}}/>
				</div>
				<div className="filter-slider">
					<FilterInstruction name="Trial Start Date" type="TrialStartDate" 
						result={`( ${filters.trialstartdate[0] === 0 ? filters.trialstartdate[1] === 2000 ? 0 : 2000 : filters.trialstartdate[0]} - ${filters.trialstartdate[1]} )`}
						content='Filter down trials by selecting their minimum and maximum start date'/>
					<Slider type="trialstartdate" value={filters.trialstartdate} range={{min: 2000, max: 2018}}/>
				</div>
				<div className="filter-slider">
					<FilterInstruction name="Trial End Date" type="TrialEndDate" 
						result={`( ${filters.completiondate[0] === 0 ? filters.completiondate[1] === 2000 ? 0 : 2000 : filters.completiondate[0]} - ${filters.completiondate[1]} )`}
						content='Filter down trials by selecting their minimum and maximum end date'/>
					<Slider type="completiondate" value={filters.completiondate} range={{min: 2000, max: 2040}}/>
				</div>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.data.data,
	processedData: state.data.processedData,
	filters: state.filter.filters
})

export default connect(mapStateToProps, { 
	filterName, filterDropdownOptions, clearDropdownOptions, updateData 
})(Filter)