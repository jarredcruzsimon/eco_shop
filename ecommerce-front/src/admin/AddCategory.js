import React, { useState } from 'react'
import Layout from '../core/Layout.js'
import { isAuthenticated } from '../auth/index.js'
import { Link } from 'react-router-dom'
import { createCategory } from './apiAdmin'

const AddCategory =()=>{
    
const [name, setName]=useState('')
const [error, setError]=useState(false)
const [success, setSuccess]=useState(false)

//destructure user info and token from localstorage

const {user, token} = isAuthenticated()

const handleChange=(e)=>{
    setError('')
    setName(e.target.value)
}

const clickSubmit=(e)=>{
    e.preventDefault()
    setError('')
    setSuccess(false)
    //make request to api to create category
    //sending user id, JWT token, and name of category
    createCategory(user._id, token, {name})
    .then(data=>{
        //if any error we pass that error to state
        if(data.error){
            setError(true)
        }else{
            //if no error we make sure to clean any old error data
            // then pass true to Success state
            setError('')
            setSuccess(true)
        }
    })

}

const newCategoryForm =()=>{
    return(
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" required onChange={handleChange} value={name} autoFocus/>
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    )
}

    const showSuccess =()=>{
        if(success){
            return(
                <h3 className="text-success">{name} has been created!</h3>
            )
        }
    }

    const showError =()=>{
        if(error){
            return(
                <h3 className="text-danger">{name} already exist!</h3>
            )
        }
    }

    const goBack =()=>(
       <div className="mt-5">
           <Link to="/admin/dashboard" className="text-warning">Back to Dashboard </Link>
       </div>
    )

    return(
        <Layout title="Add a new Category" description={`Welcome ${user.name}, ready to add a new Category?`}>
            
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            
        </Layout>
    )
}

export default AddCategory