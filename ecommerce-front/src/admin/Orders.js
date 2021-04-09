import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout.js'
import { isAuthenticated } from '../auth/index.js'
import { Link } from 'react-router-dom'
import { listOrders } from './apiAdmin'

const Orders =()=>{
    const [orders,setOrders] = useState([])

    const {user,token} =isAuthenticated()
    console.log(user)

    const loadOrders =()=>{
        listOrders(user._id,token)
        .then(data=>{
            console.log(data)
            if(data.error){
                console.log(data.error)
            }else{
                setOrders(data)
            }
        })
    }


    useEffect(()=>{

        loadOrders()

    },[])

    const noOrders =(orders)=>{
        return orders.length<1 ? <h4>No Orders</h4>:null
    }


    return(
        <Layout title="Orders" description={`Welcome ${user.name}, you can manage all the orders here!`}>
            
                <div className="col-md-8 offset-md-2">
                    {noOrders(orders)}
                    {JSON.stringify(orders)}
                </div>
            
        </Layout>
    )



}

export default Orders