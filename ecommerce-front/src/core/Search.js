import React, { useState, useEffect } from 'react'
import { getCategories, list } from './apiCore'
import Card from './Card.js'


const Search=()=>{
    const [data,setData] =useState({
        categories: [],
        category: '',
        search:'',
        results:[],
        searched: false
    })

const {categories, category, search, results, searched} = data

    const loadCategories =()=>{
        getCategories()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setData({...data, categories: data})
            }
        })
    }

    useEffect(()=>{
        loadCategories()
    },[])

    const searchData = ()=>{
       if(search){
            list({search:search || undefined, category:category})
            .then(response =>{
                if(response.error){
                }else{
                    setData({...data, results: response, searched: true})
                }
            })
        }
    }

    const searchSubmit =(event)=>{
        event.preventDefault()
        searchData()
    }

    const handleChange = (name) => event =>(
        setData({...data,[name]: event.target.value, searched: false})
    )

    const searchMessage =(searched, results)=>{
        if(searched && results.length > 0){
            return (`Found ${results.length} products`)
         }
        if(searched && results.length < 1){
            return (`No products found`)
         }

    }

    const searchedProducts =(results = [])=>{
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}    
                </h2>
                <div className="row">
                    {results.map((product, index)=>(
                        <div className="col-4 mb-3">
                            <Card key={index} product={product}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const searhForm =()=>(
            <form onSubmit={searchSubmit}>
                <span className="input-group-text">
                    <div className="input-group input-group-lg">

                        <div className="input-group-prepend">
                            <select className="btn mr-2" onChange={handleChange("category")}>
                                <option value="All">All</option>
                                {categories.map((category, index)=>(
                                    <option key={index} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>    
                        </div>

                        <input type="search" 
                            className="form-control" 
                            onChange={handleChange("search")}
                            placeholder="Search by name"
                        />
                    </div>

                    <div className="btn input-group-append" style={{border: 'none'}}>
                        <button className="input-group-text">Search</button>
                    </div>
                </span>
            </form>
        )

    

    return(
        <div className="row">
            <div className="container mb-3">
                {searhForm()}
                
            </div>

            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    )
}


export default Search