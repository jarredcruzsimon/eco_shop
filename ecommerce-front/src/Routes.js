import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Signup from './user/Signup.js'
import Signin from './user/Signin.js'
import Home from './core/Home.js'
import PrivateRoute from './auth/PrivateRoute.js'
import AdminRoute from './auth/AdminRoute.js'
import Dashboard from './user/UserDashboard.js'
import AdminDashboard from './user/AdminDashboard.js'
import AddCatergory from './admin/AddCategory.js'
import AddProduct from './admin/AddProduct.js'

// PrivateRoute can only be accessed by an authenticated user
// AdminRoute can only be used by an authenticated user who is also an admin (role === 1)

const Routes = (props) =>{
    
    
    return(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>    
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/signup" component={Signup}/>
            
            <PrivateRoute exact path="/user/dashboard" component={Dashboard}/>

            <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
            <AdminRoute exact path="/create/category" component={AddCatergory}/>
            <AdminRoute exact path="/create/product" component={AddProduct}/>
        </Switch>
    </BrowserRouter>
    )

}

export default Routes