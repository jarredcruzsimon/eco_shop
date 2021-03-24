import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Signup from './user/Signup.js'
import Signin from './user/Signin.js'
import Home from './core/Home.js'



const Routes = (props) =>{
    
    
    return(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>    
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/signup" component={Signup}/>
        </Switch>
    </BrowserRouter>
    )

}

export default Routes