import React, { useState } from 'react'
import Layout from '../core/Layout.js'
import { isAuthenticated } from '../auth/index.js'
import { Link } from 'react-router-dom'

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

}

const newCategoryForm =()=>{
    <form onSubmit={clickSubmit}>
        <div className="form-group">
            <label className="text-muted">Name</label>
            <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus/>
            <button className="btn btn-outline-primary">Create Category</button>
        </div>
    </form>
}

    return(
        <Layout title="Add a new Category" description={`Welcome ${name}, ready to add a new Category?`}>
            
                <div className="col-md-8 offset-md-2">
                    {newCategoryForm()}
                </div>
            
        </Layout>
    )
}

export default AddCategory