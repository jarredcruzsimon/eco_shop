import React, { Fragment } from 'react'
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticate } from '../auth/index.js';

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

                {/* if the user is not signed in the !isAuthenticate will be true 
                and the second condition will show the signin and signout buttons */}
                {!isAuthenticate() && (
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

                {isAuthenticate() && (
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