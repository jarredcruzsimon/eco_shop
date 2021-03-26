import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage.js'

const Card =(props)=>{
    const {product} = props
    
    
    return(
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header">
                    {/* SHOW PRODUCT NAME */}
                    {product.name}
                </div>

                <div className="card-body">
                    {/* SHOW PRODUCT IMAGE */}
                    <ShowImage item={product} url="product"/>

                    {/* SHOW PRODUCT DESCRIPTION */}
                    {/* substring allows us to display a certain character length, we are limiting the length to 100 characters */}
                    <p>{product.description.substring(0, 100)}</p>

                    {/* SHOW PRODUCT PRICE */}
                    <p>${product.price}</p>

                    <Link to="/">
                        <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                            View Product
                        </button>
                    </Link>
                    <button className="btn btn-outline-warning mt-2 mb-2">
                           Add to Cart
                        </button>

                </div>

            </div>
        </div>
    )


}


export default Card