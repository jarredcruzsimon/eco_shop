import React, { useState, useEffect } from 'react'
import { getCategories } from './apiCore'
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

    const searchSubmit =()=>{
        
    }

    const handleChange =()=>{

    }

    const searhForm =()=>{
        return(
            <form onSubmit={searchSubmit}>
                <span className="input-group-text">
                    <div className="input-group input-group-lg">

                        <div className="input-group-prepend">
                            <select className="btn mr-2" onChange={handleChange("category")}>
                                <option value="All">Pick Caetgory</option>
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

    }

    return(
        <div className="row">
            <div className="container">
                {searhForm()}
            </div>
        </div>
    )
}


export default Search