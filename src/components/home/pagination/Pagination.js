import React, { Component } from 'react'
import { connect } from "react-redux"
import { changePageNumber, changeLastPageNumber } from "../../../actions/paginationActions"

class Pagination extends Component {

	constructor(props) {
		super(props)
		this.state = {
			currentPage: props.currentPage,
			lastPage: props.lastPage
		}
	}

	componentDidMount() {
		this.setPage(this.props.dataLength)
	}

	componentWillReceiveProps(nextProps) {
    	//set new max page based on the new dataSets after filtering
	    let lastPage = Math.ceil(nextProps.dataLength / this.props.numberOfShowPerPage)
	    if(lastPage <= 0) lastPage = 1

	    let currentPage = nextProps.currentPage
	    if(currentPage > lastPage) currentPage = lastPage

	    this.setState({ currentPage, lastPage })	
	}

	setPage(dataLength) {
    	//set new max page based on the new dataSets after filtering
	    let lastPage = Math.ceil(dataLength / this.props.numberOfShowPerPage)
	    if(lastPage <= 0) lastPage = 1

	    let currentPage = this.props.currentPage
	    if(currentPage > lastPage) currentPage = lastPage

	    this.props.changePageNumber(currentPage)
	  	this.props.changeLastPageNumber(lastPage)			
	}

	increasePageNumber() {
		this.props.changePageNumber(this.props.currentPage + 1)
	}

	decreasePageNumber() {
		this.props.changePageNumber(this.props.currentPage - 1)
	}

	changePageNumber(e) {
		this.props.changePageNumber(e.target.value)
	}

	render() {
		const { currentPage, lastPage } = this.state
		return (
		    <nav aria-label="Page navigation example">
		      <div className="page-section">
				  <ul className="pagination">
				    <li className="page-item">
				      <a href="#/" aria-label="Previous" className="text-dark" onClick={this.decreasePageNumber.bind(this)}>
				        <span aria-hidden="true">&laquo;</span>
				        <span className="sr-only">Previous</span>
				      </a>
				    </li>
					<li className="page-item">Page <input type="number" id="page-input" min="1" max={lastPage} value={currentPage} onChange={this.changePageNumber.bind(this)}/> / { lastPage }</li>
				    <li className="page-item">
				      <a href="#/" aria-label="Next" className="text-dark" onClick={this.increasePageNumber.bind(this)}>
				        <span aria-hidden="true">&raquo;</span>
				        <span className="sr-only">Next</span>
				      </a>
				    </li>
				  </ul>
			  </div>
			</nav>
		)
	}
}

const mapStateToProps = state => ({
	numberOfShowPerPage: state.pagination.numberOfShowPerPage,
	currentPage: state.pagination.currentPage,
	lastPage: state.pagination.lastPage
})

export default connect(mapStateToProps, { changePageNumber, changeLastPageNumber })(Pagination)

