import { API } from '../config.js'
    
    
    
   const createCategory = (userId,token,category) =>{
       return ( fetch(`${API}/category/create/${userId}`, {
            method: "POST",
            headers:{
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            // passing the object category as json
            body: JSON.stringify(category)
        })
        .then(response => {
            return response.json()
        })
        .catch(err =>{
            console.log(err)
        })
       )
    }


    const createProduct = (userId,token,product) =>{
        return ( fetch(`${API}/product/create/${userId}`, {
             method: "POST",
             headers:{
                 //Not sending content-type of json since we have to send form data with an image
                 Accept: 'application/json',
                 Authorization: `Bearer ${token}`
             },
             
             body: product
         })
         .then(response => {
             return response.json()
         })
         .catch(err =>{
             console.log(err)
         })
        )
     }


     const getCategories = () =>{
        return ( fetch(`${API}/categories`, {
                method: "GET"
            })
            .then(response=>{
                return response.json()
            })
            .catch(err=>console.log(err))
        )}
        

    const listOrders = (userId, token) =>{
        return ( fetch(`${API}/order/list/${userId}`, {
                method: "GET",
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            .then(response=>{
                console.log(response)
                return response.json()
            })
            .catch(err=>console.log(err))
        )}

    const getStatusValues = (userId, token) =>{
        return ( fetch(`${API}/order/status-values/${userId}`, {
                method: "GET",
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
        })
        .then(response=>{
            console.log(response)
            return response.json()
        })
        .catch(err=>console.log(err))
    )}
      
    
    const updateOrderStatus = (userId, token, orderId, status) =>{
        return ( fetch(`${API}/order/${orderId}/status/${userId}`, {
                method: "PUT",
                headers:{
                    Accept: 'application/json',
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({status, orderId})
        })
        .then(response=>{
            console.log('response:',response)
            return response.json()
        })
        .catch(err=>console.log(err))
    )}

    // to perfrom crud on products 
    // get all products
    const getProducts = () =>{
        // adding the query returns more then the default 6 items
        return ( fetch(`${API}/products?limit=undefined`, {
                method: "GET"
            })
            .then(response=>{
                return response.json()
            })
            .catch(err=>console.log(err))
        )}


    // get single product
    const getProduct = (productId) =>{
        return ( fetch(`${API}/product/${productId}`, {
                method: "GET"
            })
            .then(response=>{
                return response.json()
            })
            .catch(err=>console.log(err))
        )}

    // update single product
    const updateProduct = (productId, userId, token, product) =>{
        return ( fetch(`${API}/product/${productId}/${userId}`, {
                method: "PUT",
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
                // product also containe image
                body: product
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )}

    // delete single product
    const deleteProduct = (productId, userId, token) =>{
        return ( fetch(`${API}/product/${productId}/${userId}`, {
                method: "DELETE",
                headers:{
                    Accept: 'application/json',
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )}

    export {
        createCategory,
        createProduct,
        getCategories,
        listOrders,
        getStatusValues,
        updateOrderStatus,
        getProducts,
        getProduct,
        deleteProduct,
        updateProduct
    }