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
					    	<th>Title</th>
					    	<th>Sponsor</th>
					    	<th>Completion Date</th>
					    </tr>
				    </thead>
				    <tbody>
				    	{
				    		partialData.map((data, index) => {
				    			return (
							    	<tr key={index}>
							    		<th>{data.rank}</th>
							    		<td>{data.nctnumber}</td>
							    		<td>{data.title}</td>
							    		<td>{data.sponsor}</td>
							    		<td>{data.completiondate}</td>
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

