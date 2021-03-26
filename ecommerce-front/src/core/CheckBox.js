import React, { useState, useEffect } from 'react'


//Categories is a destructure of props 
const CheckBox = ({categories, handleFilters}) =>{
    

    const [checked, setChecked] =useState([])


    //Category is the passed in category ID, which is passed into another function
    const handleToggle = category =>()=>{
        //return the first index or return -1
         const currentCategoryId = checked.indexOf(category)
         const newCheckedCategoryId = [...checked]

         //If currently checked was not already in checked state then we wil push
         //If not then we will take off
         if(currentCategoryId === -1){
             newCheckedCategoryId.push(category)
         }else{
             //this takes the category id out of the array if the checkbox is unchecked
             newCheckedCategoryId.splice(currentCategoryId, 1)
         }

        //  console.log(newCheckedCategoryId)
         setChecked(newCheckedCategoryId)
         handleFilters(newCheckedCategoryId)
    }
    
    return(
        categories.map((category,i)=>(
            <li key={i} className="list-unstyled">
                <input 
                onChange={handleToggle(category._id)} 
                value={checked.indexOf(category._id === -1)} 
                type="checkbox" 
                className="form-check-input"/>
                <label className="form-check-label">
                    {category.name}
                </label>
            </li>
        ))    
    )
}

export default CheckBox