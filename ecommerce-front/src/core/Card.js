import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage.js'
import moment from 'moment'
import { addItem } from './CartHelpers.js'

const Card =(props)=>{
    const {product, showViewProductButton = true} = props

    const [redirect, setRedirect]= useState(false)

    const showViewButton = (showViewProductButton) =>{
        return(
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2">
                        View Product
                    </button>
                </Link>
            )
        )
    }

    const addToCart =()=>{
        addItem(product, ()=>{
        setRedirect(true)
        })
    }

    const shouldRedirect = redirect =>{
        if (redirect){
            return <Redirect to="/cart"/>
        }
    }

    const showAddToCartButton = () =>{
        return(
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                Add to Cart
            </button>
        )
    }

    const showStock = (quantity) =>{
        return(
            quantity > 0 ? 
            <span className="badge badge-primary badge-pill">
                In Stock
            </span> :
            <span className="badge badge-primary badge-pill">
                Out of Stock
            </span>
        )
    }
    
    return(
        <div className="card">
                <div className="card-header name">
                    {/* SHOW PRODUCT NAME */}
                    {product.name}
                </div>

                <div className="card-body">
                    {shouldRedirect(redirect)}
                    {/* SHOW PRODUCT IMAGE */}
                    <ShowImage item={product} url="product"/>

                    {/* SHOW PRODUCT DESCRIPTION */}
                    {/* substring allows us to display a certain character length, we are limiting the length to 100 characters */}
                    <p className="lead mt-2">{product.description.substring(0, 100)}</p>

                    {/* SHOW PRODUCT PRICE */}
                    <p className="black-10">${product.price}</p>
                    <p className="black-9">
                        Category: {product.category && product.category.name}
                    </p>
                    <p className="black-8">
                        {/* moment is an npm package for date display */}
                        Added {moment(product.createdAt).fromNow()}
                    </p>

                    {showStock(product.quantity)}
                    <br/>

                    {showViewButton(showViewProductButton)}
                    
                    {showAddToCartButton()}

                </div>

            </div>
        
    )


}


export default Card