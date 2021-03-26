import React, { useState, useEffect } from 'react'
import Layout from './Layout.js'
import { getProducts } from './apiCore'
import Card from './Card.js'
import Search from './Search'

const Home = () =>{

    const [productsBySell, setProductsBySell]=useState([])
    const [productsByArrival, setProductsByArrival]=useState([])
    const [error, setError]=useState(false)


    const loadProductsBySell =()=>{
        //this will grab the products and order them by SOLD, since we are passing sold in as the arg
        getProducts('sold').then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProductsBySell(data)
            }
        })
    }

    //this will grab the products and order them by ARRIVAL, since we are passing arrival in as the arg
    const loadProductsByArrival =()=>{
        getProducts('createdAt').then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProductsByArrival(data)
            }
        })
    }

    useEffect(()=>{
        loadProductsByArrival()
        loadProductsBySell()
    },[])

    
    return(
        <Layout title="Home Page" description="Node React E-commerce App" className="container-fluid">

            {/* Search Bar */}
            <Search />

            {/* List Product by ARRIVAL */}
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, index)=>(
                <Card key={index} product={product} />
            ))}
            </div>


                        
            {/* List Product by SOLD */}
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, index)=>(
                <Card key={index} product={product} />
            ))}
            </div>

        </Layout>
    )
}

export default Home