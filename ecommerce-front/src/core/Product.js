import React, { useState, useEffect } from 'react'
import Layout from './Layout.js'
import { read, listRelated } from './apiCore'
import Card from './Card.js'



const Product =(props)=>{

const [product,setProduct]=useState({})
const [relatedProduct,setRelatedProduct]=useState([])
const [error,setError]=useState(false)

const loadSingleProduct = productId =>{
    read(productId)
    .then(data =>{
        if(data.error){
            setError(data.error)
        }else{
            setProduct(data)
            //fetch related products
            listRelated(data._id)
            .then(data =>{console.log(data)
               if(data.error){
                   setError(data.error)
               }else{
                   setRelatedProduct(data)
               }
            })
        }
    })
}

useEffect(()=>{
    const productId = props.match.params.productId
    loadSingleProduct(productId)
},[props])
               
    return(
        <Layout title={product && product.name} 
        description={product && product.description && product.description.substring(0,100)} 
        className="container-fluid">

                <div className="row">
                    <div className="col-8">
                    {
                        product && product.description &&
                        <Card product={product}
                        showViewProductButton={false}/>
                        
                    }
                    </div>
                  <div className="col-4">
                      <h2>Related Products</h2>
                      {relatedProduct.map((product,index)=>(
                        <div className="mb-3">
                            <Card key={index} product={product}/>
                        </div>
                      ))}
                  </div>
                </div>

        </Layout>
    )
}

export default Product