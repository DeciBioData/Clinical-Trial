import React, { Component } from "react"
import { connect } from "react-redux"

class Table extends Component {
	render() {
		let endEntry = this.props.currentPage * this.props.numberOfShowPerPage
  		let startEntry = endEntry - this.props.numberOfShowPerPage
  		let partialData = this.props.processedData.slice(startEntry, endEntry)
		return(
			<div className="table-responsive">
				<table className="table table-sm" id="tableData">
				  	<thead className="table-heading">
					    <tr>
					    	<th>Rank</th>
					    	<th>NCTID</th>
					    	<th className="title-column">Title</th>
					    	<th>Sponsor</th>
					    	<th>Completion Date</th>
					    </tr>
				    </thead>
				    <tbody>
				    	{
				    		partialData.map((data, index) => {
				    			return (
							    	<tr key={index}>
							    		<th className="number-column">{data.rank}</th>
							    		<td className="data-column"><a href={`https://clinicaltrials.gov/ct2/show/${data.nctnumber}`} target="_blank" rel="noopener noreferrer">{data.nctnumber}</a></td>
							    		<td className="title-column">{data.title}</td>
							    		<td className="sub-title-column">{data.sponsor}</td>
							    		<td className="data-column">{data.completiondate}</td>
							    	</tr>
				    			)
				    		})
				    	}
					</tbody>
				</table>
			</div>
		)
	}
} 

const mapStateToProps = state => ({
	numberOfShowPerPage: state.pagination.numberOfShowPerPage,
	currentPage: state.pagination.currentPage,
	lastPage: state.pagination.lastPage
})

export default connect(mapStateToProps)(Table)

