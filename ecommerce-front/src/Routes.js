import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Signup from './user/Signup.js'
import Signin from './user/Signin.js'
import Home from './core/Home.js'
import PrivateRoute from './auth/PrivateRoute.js'
import Dashboard from './user/UserDashboard.js'



const Routes = (props) =>{
    
    
    return(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>    
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/signup" component={Signup}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        </Switch>
    </BrowserRouter>
    )

}

export default Routes