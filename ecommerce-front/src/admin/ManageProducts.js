import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout.js'
import { isAuthenticated } from '../auth/index.js'
import { Link } from 'react-router-dom'
import { deleteProduct, getProducts } from './apiAdmin.js'


const ManageProducts =()=> {

    const {user, token} = isAuthenticated()

    const [products,setProducts] =useState([])

    const loadProducts =()=>{
        getProducts().then(response=>{
            if(response.error){
                console.log(response.error)
            }else{
                setProducts(response)
            }
        })
    }

    const destroy =(productId)=>{
        deleteProduct(productId, user._id, token).then(response=>{
            if(response.error){
                console.log(response.error)
            }else{
                loadProducts()
            }
        })
    }


    useEffect(()=>{
        loadProducts()
    },[])

    return (
        <Layout 
            title="Manage Products" 
            description="Perform CRUD on products" 
            className="container-fluid"
        >

        <div className="row">
            <div className="col-12">
                <h2 className="text-center">Total products: {products.length}</h2>
                <hr/>
                <ul className="list-group">
                    {products.map((prod,prodIndex)=>(
                        <li key={prodIndex} className="list-group-item d-flex justify-content-between align-items-center ">
                           <strong>{prod.name}</strong>
                           <Link to={`/admin/product/update/${prod._id}`}>
                               <span className=" badge badge-warning badge-pill">
                                   Update
                               </span>
                           </Link>
                           <span onClick={()=>destroy(prod._id)} className=" badge badge-danger badge-pill">
                               Delete
                           </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
           

        </Layout>
    )
}

export default ManageProducts
