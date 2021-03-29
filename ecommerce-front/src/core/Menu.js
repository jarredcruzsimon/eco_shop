import React, { Fragment } from 'react'
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/index.js';
import { itemTotal } from './CartHelpers.js'

//highlights the active link
const isActive = (history, path)=>{
    if(history.location.pathname === path){
        return {color: '#ff9900'}
    }else{
        return {color: '#ffffff'}
    }
}

const Menu = (props) =>{
    const {history} = props
    return(
        <div>
            <ul  className="nav nav-tabs bg-primary">

                {/* Home */}
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/')} to="/">Home</Link>
                </li>

                {/* SHOP */}
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/shop')} to="/shop">Shop</Link>
                </li>

                {/* CART */}
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/cart')} to="/cart">
                        Cart <sup>
                                <small className="cart-badge">
                                    {itemTotal()}
                                </small>
                            </sup>
                    </Link>
                </li>

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                 <li className="nav-item">
                    {/* Dashboard */}
                        <Link className="nav-link" style={isActive(history,'/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                 <li className="nav-item">
                 {/* Dashboard */}
                    <Link className="nav-link" style={isActive(history,'/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                </li>
                )}

                {/* if the user is not signed in the !isAuthenticate will be true 
                and the second condition will show the signin and signout buttons */}
                {!isAuthenticated() && (
                    <Fragment>
                        {/* Fragment can be used to wrap multiple elements without causeing a line break*/}
                        {/* Signup */}
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history,'/signup')} to="/signup">Signup</Link>
                        </li>
                                               
                        {/* Signin */}
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history,'/signin')} to="/signin">Signin</Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && (
                    <li className="nav-item">
                        {/* Signout */}
                        <span className="nav-link" style={{cursor: 'pointer', color: '#ffffff'}} 
                            onClick={()=> signout(()=>{
                            history.push('/')})}>Signout
                        </span>
                    </li>
                )}
                

            
            </ul>
        </div>
    )
}

export default withRouter(Menu)