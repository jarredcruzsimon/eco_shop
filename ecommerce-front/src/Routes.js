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
import Shop from './core/Shop.js'
import Product from './core/Product.js'
import Cart from './core/Cart.js'
import Orders from './admin/Orders.js'

// PrivateRoute can only be accessed by an authenticated user
// AdminRoute can only be used by an authenticated user who is also an admin (role === 1)

const Routes = (props) =>{
    
    
    return(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>    
            <Route exact path="/shop" component={Shop}/>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/product/:productId" component={Product}/>
            <Route exact path="/cart" component={Cart}/>
            
            <PrivateRoute exact path="/user/dashboard" component={Dashboard}/>

            <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
            <AdminRoute exact path="/create/category" component={AddCatergory}/>
            <AdminRoute exact path="/create/product" component={AddProduct}/>
            <AdminRoute exact path="/admin/orders" component={Orders}/>
        </Switch>
    </BrowserRouter>
    )

}

export default Routes