/* eslint-disable */
import React from 'react'

const SignOutButton = ({ signOut }) => {
	return (
		<button className="buttons info-buttons my-2 my-sm-0" onClick={signOut.bind(this)}>Logout</button>
	)
}

export default SignOutButton