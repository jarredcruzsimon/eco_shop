import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../core/Layout.js'
import { signin, authenticate, isAuthenticated } from '../auth/index.js'



const Signin = () =>{
    
    const[values,setValues] = useState({
        email: 'admin@gmail.com',
        password: '1234qwer',
        error: '',
        loading: false,
        redirectToReferrer: false,
    })

    const {email, password, error, loading, redirectToReferrer } = values
    const {user} = isAuthenticated()

    const handleChange = name => event =>{
        //in the setvalues , [name] is dynamic meaning it will capture name, email, and/or password
        setValues({...values, error: false, [name]: event.target.value})
    }


    const clickSubmit =(event)=>{
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        // since the key and value are the same we do not have to type name: name, we can just type name once. 
        signin({email, password})
        .then(data=>{
            if(data.error){
                setValues({...values, error: data.error, loading:false})
            }else{
                authenticate(data, ()=>{
                    setValues({...values, redirectToReferrer:true})
                })
            }
        })
    }

    const signUpForm = () =>(
        <form>
 
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

    const showLoading = () =>(
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
    )

    const redirectUser = () =>{
        if(redirectToReferrer){
            if (user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    return(
        <Layout title="Signin Page" description="Signin to Node React E-commerce App" className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
            {/* this allows us to see state as it changes */}
            {/* {JSON.stringify(values)} */}
        </Layout>
    )
}

export default Signin