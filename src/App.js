/* eslint-disable */
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"

import Home from './components/home/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Login from './components/auth/Login'
import NoMatch from './components/others/NotFoundPage'

import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      	<div>
			<Header/>      		
			<Router>

				<div>
		        	<Switch>
				    	<Route exact={true} path='/' component={Home}/>
						<Route component={NoMatch} />
					</Switch>
				</div>
			</Router>
			<Footer/>
		</div>
      </Provider>
    )
  }
}

export default App
