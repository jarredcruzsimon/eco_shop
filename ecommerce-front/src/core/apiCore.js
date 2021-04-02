import { API } from '../config.js'
import queryString from 'query-string'


const getProducts = (sortBy) =>{
    return ( fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
            method: "GET"
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )}

    const getCategories = () =>{
        return ( fetch(`${API}/categories`, {
                method: "GET"
            })
            .then(response=>{
                return response.json()
            })
            .catch(err=>console.log(err))
        )}


    const getFilteredProducts = (skip, limit, filters={}) =>{
        const data = {
            limit,skip,filters
        }
        return ( fetch(`${API}/products/by/search`, {
                method: "POST",
                headers:{
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                
                body: JSON.stringify(data)
            })
            .then(response => {
                return response.json()
            })
            .catch(err =>{
                console.log(err)
            })
        )
    }

    //params is the category and search input from searchbar
    const list = (params) =>{
        const query = queryString.stringify(params)
        return ( fetch(`${API}/products/search?${query}`, {
                method: "GET"
            })
            .then(response=>{
                return response.json()
            })
            .catch(err=>console.log(err))
        )
    }


    //Read a single product
    const read = (productId) =>{
        return ( fetch(`${API}/product/${productId}`, {
                method: "GET"
            })
            .then(response=>{
                return response.json()
            })
            .catch(err=>console.log(err))
        )
    }

    //Forr single product page, show related products
    const listRelated = (productId) =>{
        return ( fetch(`${API}/products/related/${productId}`, {
                method: "GET"
            })
            .then(response=>{
                return response.json()
            })
            .catch(err=>console.log(err))
        )
    }

    //process braintree
    const getBraintreeClientToken = (userId, token) =>{
        return ( fetch(`${API}/braintree/getToken/${userId}`, {
                method: "GET",
                headers:{
                    Accept: 'application/json',
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            .then(response=>{
                return response.json()
            })
            .catch(err=>console.log(err))
        )
    }

    //process payment
    const processPayment = (userId, token, paymentData) =>{
        return ( fetch(`${API}/braintree/payment/${userId}`, {
                method: "POST",
                headers:{
                    Accept: 'application/json',
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(paymentData)
            })
            .then(response=>{
                return response.json()
            })
            .catch(err=>console.log(err))
        )
    }


    export {
        getProducts,
        getCategories,
        getFilteredProducts,
        list,
        read,
        listRelated,
        getBraintreeClientToken,
        processPayment

    }