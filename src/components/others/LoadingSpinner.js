/* eslint-disable */
import React from 'react'
import Spinner from 'react-spinkit'

const LoadingSpinner = () => {
	return (
		<div className="loading-section">
			<div className="loading-icon"><Spinner name="pacman" color="#427A9E"/></div>
			<div className="loading-text">
				<h4>We are gathering data for you right now!</h4>
				<h6>just one moment.</h6>
			</div>
		</div>
	)
}

export default LoadingSpinner