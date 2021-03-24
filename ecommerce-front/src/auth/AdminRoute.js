import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './index.js'

const AdminRoute = ({component: Component, ...rest}) =>{
    return(
        //if authenticated, we return one statement with props or if not authenticated return a different statement without props
        <Route {...rest} render={props => isAuthenticated() && isAuthenticated().user.role === 1 ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{pathname: '/signin', state:{from: props.location}}}/>
        ) }/>
    )
}

export default AdminRoute