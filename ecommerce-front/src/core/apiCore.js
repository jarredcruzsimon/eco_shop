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


    export {
        getProducts,
        getCategories,
        getFilteredProducts,
        list

    }