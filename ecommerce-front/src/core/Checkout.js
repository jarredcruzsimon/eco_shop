import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout.js'
import { getProducts, getBraintreeClientToken } from './apiCore'
import Card from './Card.js'
import { isAuthenticated } from '../auth/index.js'
import DropIn from 'braintree-web-drop-in-react'


const Checkout = (props) =>{

    const {
        products
    } = props

    const [data,setData] = useState({
        success: false,
        clientToken: null,
        error:'',
        instance: {},
        address:''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken =(userId,token)=>{
        console.log(`userID: ${userId} token: ${token}`)
        getBraintreeClientToken(userId, token)
        .then(response=>{
            if(response.error){
                setData({...data, error: response.error})
            }else{
                console.log(response)
                setData({...data, clientToken: response.clientToken})
            }
        })
    }
    
    useEffect(()=>{
        getToken(userId,token)
        console.log('CLient Token',data.clientToken)
    },[])

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
                <div>
                    {showDropIn()}
                </div>
            ):(
                <Link to="/signin">
                    <button className="btn btn-primary"> 
                        Sign in to Checkout
                    </button>
                </Link>
            )
        )
    }


    const showDropIn =()=>{
        <div>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken 
                    }} onInstance={instance =>(data.instance = instance)} />
                    <button className="btn btn-success">
                        Checkout
                    </button>
                </div>
            ) : null}
        </div>
                }

    return(
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showCheckout()}
        </div>
    )
}

export default Checkout