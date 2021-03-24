import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout.js'
import { signup } from '../auth/index.js'



const Signup = () =>{
    
    const[values,setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {name, email, password, error, success} = values

    const handleChange = name => event =>{
        //in the setvalues , [name] is dynamic meaning it will capture name, email, and/or password
        setValues({...values, error: false, [name]: event.target.value})
    }


    const clickSubmit =(event)=>{
        event.preventDefault()
        setValues({...values, error: false})
        // since the key and value are the same we do not have to type name: name, we can just type name once. 
        signup({name, email, password})
        .then(data=>{
            if(data.error){
                setValues({...values, error: data.error, success:false})
            }else{
                //if there is no error on submit we are clearing all fields and setting success to true
                setValues({...values, name:'', email:'', password:'', error:'', success:true})
            }
        })
    }

    const signUpForm = () =>(
        <form>
            <div className="form-group">
                <label className="text-muted"> Name </label> 
                <input onChange={handleChange('name')} type="text" className="form-control"
                value={name}/>
            </div>

            <div className="form-group">
                <label className="text-muted"> Email </label> 
                <input onChange={handleChange('email')} type="email" className="form-control"
                value={email}/>
            </div>

            <div className="form-group">
                <label className="text-muted"> Password </label> 
                <input onChange={handleChange('password')} type="password" className="form-control"
                value={password}/>
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    const showError = () =>(
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () =>(
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
            New Account is created. Please <Link to="/signin">Signin</Link>
        </div>
    )

    return(
        <Layout title="Signup Page" description="Signup to Node React E-commerce App" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {/* this allows us to see state as it changes */}
            {/* {JSON.stringify(values)} */}
        </Layout>
    )
}

export default Signup