import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout.js'
import { isAuthenticated } from '../auth/index.js'
import { Link, Redirect } from 'react-router-dom'
import { getProduct, getCategories, updateProduct } from './apiAdmin'



const UpdateProduct =({match})=>{
const {user, token} = isAuthenticated()

//state
const [values, setValues]=useState({
    name:'',
    description:'',
    price:'',
    categories: [],
    categpry:'',
    shipping:'',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''

})

const init =(productId)=>{
    getProduct(productId).then(response=>{
        if(response.error){
            console.log(response.error)
            setValues({...values, error: response.error})
        }else{
            //populate the state
            console.log(response)
            setValues({...values,
                name: response.name, 
                description: response.description,
                price: response.price,
                category: response.category._id,
                shipping: response.shipping,
                quantity: response.quantity,
                FormData: new FormData()
            })
            //load categories
            initCategories()
        }
    })
}

//load categories and set form data
const initCategories = () =>{
    getCategories().then(data=>{
        if (data.error){
            setValues({...values, error: data.error})
        }
        else{
            setValues({ categories: data, formData: new FormData()})
        }
    })
}



useEffect(()=>{
    init(match.params.productId)
},[])

//Handles all state updates by passing each state key dynamically. Name = name, description, category....etc (All from state)
const handleChange= name => event =>{
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name,value)
    setValues({...values, [name]: value})
    
}
const {name, description, price, categories, category, shipping, quantity, loading, error, createdProduct, redirectToProfile, formData} = values

    const clickSubmit =(e)=>{
        e.preventDefault()
        setValues({...values, errorr: '', loading:true})

        updateProduct(match.params.productId ,user._id,token, formData)
        .then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({
                    ...values,
                    name:'',
                    description:'',
                    price:'',
                    quantity: '',
                    photo: '',
                    loading: false,
                    redirectToProfile: true,
                    error: false,
                    createdProduct: data.name
                })
            }
        })
    }

    const newPostForm =()=>{
        return(
            <form className="mb-3" onSubmit={clickSubmit}> 
                <h4>Post Photo</h4>
                {/* PHOTO */}
                <div className="form-group">
                    <label className="btn btn-secondary">
                        <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*"/>
                    </label>
                </div>

                {/* NAME */}
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
                </div>

                {/* DESCRIPTION */}
                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <textarea onChange={handleChange('description')} className="form-control" value={description}/>
                </div>

                {/* PRICE */}
                <div className="form-group">
                    <label className="text-muted">Price</label>
                    <input onChange={handleChange('price')} type="number" className="form-control" value={price}/>
                </div>

                {/* CATEGORY */}
                <div className="form-group">
                    <label className="text-muted">Category</label>
                    <select onChange={handleChange('category')} className="form-control">
                        <option>Please Select</option>
                        {categories && categories.map((category,index)=>(
                            <option key={index} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                {/* SHIPPING */}
                <div className="form-group">
                    <label className="text-muted">Shipping</label>
                    <select onChange={handleChange('shipping')} className="form-control">
                        <option>Please Select</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                 {/* Quantity */}
                 <div className="form-group">
                    <label className="text-muted">Quantity</label>
                    <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity}/>
                </div>

                <button  className="btn btn-outline-primary">Update Product</button>

            </form>
        )
    }


    //SHOW ERROR
    const showError =()=>(
        <div className="alert alert-danger" style={{display: error ? '':'none'}}>
            {error}
        </div>
    )

    //SHOW SUCCESS
    const showSuccess =()=>(
        <div className="alert alert-info" style={{display: createdProduct ? '':'none'}}>
            <h2>{`${createdProduct}`} has been Updated successfully</h2>
        </div>
    )

    //SHOW LOADING
    const showLoading =()=>(
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    )


    const redirectUser =()=>{
        if(redirectToProfile){
            if(!error){
                return <Redirect to="/"/>
            }
        }
    }
        

    return(
        <Layout title="Add a new product" description={`Welcome ${user.name}, ready to add a new Product?`}>
            
        <div className="col-md-8 offset-md-2">
            {showLoading()}
            {showSuccess()}
            {showError()}
            {newPostForm()}
            {redirectUser()}
        </div>
    
        </Layout>
    )
}

export default UpdateProduct