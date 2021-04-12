import { API } from '../config.js'

const read = (userId, token) =>{
    return ( fetch(`${API}/user/${userId}`, {
            method: "GET",
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


const update = (userId, token, userData) =>{
    return ( fetch(`${API}/user/${userId}`, {
            method: "PUT",
            headers:{
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}


//updateing user infor in local storage
const updateUser=(userdata, next)=>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('jwt')){
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = userdata
            localStorage.setItem('jwt', JSON.stringify(auth))
            next()
        }
    }
}

const getPurchasedHistory = (userId, token) =>{
    return ( fetch(`${API}/orders/by/user/${userId}`, {
            method: "GET",
            headers:{
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response=>{
            console.log('Response from apiUser -',response)
            return response.json()
        })
        .catch(err=>console.log(err))
    )}




export {
    read,
    update,
    updateUser,
    getPurchasedHistory,
}

