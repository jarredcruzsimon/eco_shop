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

    export {
        createCategory,
        createProduct,
        getCategories
    }