import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore'
import { isAuthenticated } from '../auth/index.js'
import DropIn from 'braintree-web-drop-in-react'
import {emptyCart} from './CartHelpers.js'
import { Transaction } from 'braintree'

const Checkout = ({products,setRun = f => f, run = undefined}) =>{

    const [data,setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error:'',
        instance: {},
        address:''
    })

    console.log('transaction', Transaction)

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

    const handleAddress = event =>{
        setData({...data, address: event.target.value})
    }

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
    const buy = () =>{
        setData({loading: true})
        //send the nonce to your server
        //nonce = data.instance.requestPaymentMethod()
        let nonce
        let getNonce = data.instance.requestPaymentMethod()
        .then(response =>{
            // console.log(response)
            nonce = response.nonce
            //once you have nonce, send nonce as paymentMethodNonce
            //also total to be charged
            // console.log(`Nonce ${nonce} Total ${getTotal(products)}`)
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }
            processPayment(userId, token, paymentData)
            .then(response =>{
                // console.log(response)
                setData({...data, success: response.success})

                //create order
                const createOrderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address: data.address,
                    user: null
                }

                createOrder(userId, token, createOrderData)
                .then(resource =>{
                    //empty cart
                    emptyCart(()=>{
                        console.log('payment success and empty cart')
                        setRun(!run)
                        setData({
                            loading: false,
                            success: true
                        })
                    })
                })
                
               
                
            })
            .catch(error=>{
                console.log(error)
                setData({loading: false})
            })
            
        })
        .catch(error=>{
            // console.log(`Dropin error ${error}`)
            setData({...data, error: error.message})
        })

    }

    //onBlur is when you click anywhere within the div it's called
    const showDropIn =()=>{
        return(
            <div onBlur={()=> setData({...data, error: ''})}>
                {data.clientToken !== null && products.length > 0 ? (
                    <div>
                        <div className="gorm-group mb-3">
                            <label className="text-muted">Delivery address:</label>
                            <textarea
                                onChange={handleAddress}
                                className="form-control"
                                value={data.address}
                                placeholder="Type your delivery address here..."
                            />
                        </div>
                        <DropIn options={{
                            authorization: data.clientToken ,
                            paypal: {
                                flow: "vault"
                            }
                        }} onInstance={instance =>(data.instance = instance)} />
                        <button onClick={buy} className="btn btn-success btn-block">
                            Purchase
                        </button>
                    </div>
                ) : null}
            </div>
        )
    }


    const showError = error =>{
        return(
            <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                {error}
            </div>
        )
    }

    const showSuccess = success =>{
        return(
            <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
                Thanks! Your payment was successful
            </div>
        )
    }

    const showLoading = (loading) =>(
        loading && 
        <h2>...Loading</h2>
    )

    return(
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {isAuthenticated() && showError(data.error)}
            {showSuccess(data.success)}
            {showCheckout()}
        </div>
    )
}

export default Checkout