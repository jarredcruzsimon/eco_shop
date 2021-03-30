import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout.js'
import { getProducts } from './apiCore'
import Card from './Card.js'
import { isAuthenticated } from '../auth/index.js'


const Checkout = (props) =>{

    const {
        products
    } = props

    const getTotal =()=>{
        return products.reduce((currentValue, nextValue)=>{
            return(
                currentValue + nextValue.count * nextValue.price
            )
        },0)    
    }

    const showCheckout =()=>{
        return(
            isAuthenticated() ? (
                <button className="btn btn-success">
                    Checkout
                </button>
            ):(
                <Link to="/signin">
                    <button className="btn btn-primary"> 
                        Sign in to Checkout
                    </button>
                </Link>
            )
        )
    }

    return(
        <div>
            <h2>Total: ${getTotal()}</h2>
           {showCheckout()}
        </div>
    )
}

export default Checkout