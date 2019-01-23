/* eslint-disable */
import React, { Component } from 'react'

import SignOutButton from './SignOutButton'

class Header extends Component {

	async signOut() {
		//this.props.auth.logout('/');
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark heading with-shadow-light">
			  <span className="navbar-brand">
			    <img src="/logos/DeciBio_Icon.png" width="40" className="d-inline-block align-top logo-img" />
			  </span>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			  	<div className="mr-auto align-items-center header-text">
					<h5><strong>DeciBio BioTrack</strong> | </h5>
				</div>
			  	<div>
			  		<SignOutButton signOut={this.signOut.bind(this)}/>
			  	</div>
			  </div>
			</nav>
		)
	}
}

export default Header