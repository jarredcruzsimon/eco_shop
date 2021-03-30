import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage.js'
import moment from 'moment'
import { addItem, updateItem, removeItem } from './CartHelpers.js'

const Card =(props)=>{
    const {
        product, 
        showViewProductButton = true, 
        showAddToCartButton = true, 
        cartUpdate = false,
        showRemoveProductButton = false,
        setRun = f => f, // default value of function
        run = undefined // default value of undefined
    } = props

    const [redirect, setRedirect]= useState(false)
    const [count, setCount]= useState(product.count)

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

    const showAddToCart = (showAddToCartButton) =>{
        return (
            showAddToCartButton && (
                <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveButton = (showRemoveProductButton) =>{
        return (
            showRemoveProductButton && (
                <button onClick={()=>{
                    removeItem(product._id)
                    setRun(!run); // run useEffect in parent Cart
                }}
                className="btn btn-outline-danger mt-2 mb-2">
                    Remove product
                </button>
            )
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

    const handleChange =(productId) => event =>{
        setRun(!run); // run useEffect in parent Cart
        //check to see if the value is less than 1 and set it to one or update based on value
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if (event.target.value >= 1){
            updateItem(productId, event.target.value)
        }
    }

    const showCartUpdateOptions = (cartUpdate)=>{
        return(
            cartUpdate && <div>
                <div className="input-group mb-3">
                   <div className="input-group-prepend">
                        <span className="input-group-text">Adjust Quantity</span>
                   </div>
                   <input 
                   type="number" 
                   className="form-control" 
                   value={count} 
                   onChange={handleChange(product._id)}
                   />
                </div>
            </div>
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
                    
                    {showAddToCart(showAddToCartButton)}

                    {showCartUpdateOptions(cartUpdate)}

                    {showRemoveButton(showRemoveProductButton)}

                </div>

            </div>
        
    )


}


export default Card