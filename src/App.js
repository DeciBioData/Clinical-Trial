/* eslint-disable */
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { withAuth } from '@okta/okta-react'
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'

import Home from './components/home/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Login from './components/auth/Login'
import NoMatch from './components/others/NotFoundPage'

import store from './store'

const onAuthRequired = ({history}) => {
  history.push('/login')
}

const config = {
  issuer: 'https://dev-693935.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oaj426q44JFEfw6j0h7',
  onAuthRequired: onAuthRequired
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      	<div>
     		
			<Router>
				<div>
                    <Security issuer={config.issuer}
                              client_id={config.client_id}
                              redirect_uri={config.redirect_uri}
                              onAuthRequired={config.onAuthRequired}
                    >
                    	<Header/> 
			        	<Switch>
					    	<SecureRoute exact={true} path='/' component={Home}/>
                            <Route exact={true} path="/login" render={() => <Login baseUrl='https://dev-693935.oktapreview.com'/>}/>
                            <Route path='/implicit/callback' component={ImplicitCallback}/>
							<Route component={NoMatch} />
						</Switch>
					</Security>
				</div>
			</Router>
			<Footer/>
		</div>
      </Provider>
    )
  }
}

export default App
