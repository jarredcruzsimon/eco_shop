import { API } from '../config.js'
    
    
    // user is an object
   const signup = (user) =>{
        // console.log(name, email, password)
        // first value is URL, second value is an arg; we can send different methods such as get/post.. etc
       return ( fetch(`${API}/signup`, {
            method: "POST",
            headers:{
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            // passing the object user as json
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch(err =>{
            console.log(err)
        })
       )
    }





    const signin = (user) =>{
        // console.log(name, email, password)
        // first value is URL, second value is an arg; we can send different methods such as get/post.. etc
       return ( fetch(`${API}/signin`, {
            method: "POST",
            headers:{
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            // passing the object user as json
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch(err =>{
            console.log(err)
        })
       )
    }

    //next is a callback function
    const authenticate = (data, next)=>{
        //setItem takes a key value pair
        if(typeof window !== 'undefined'){
            localStorage.setItem('jwt', JSON.stringify(data))
            next()
        }
    }

    //next is a callback function
    const signout =(next) =>{
        //remove item only needs key
        if(typeof window !== 'undefined'){
            localStorage.removeItem('jwt')
            next()
            return fetch(`${API}/signout`, {
                method: "GET",
            })
            .then(response=>{
                console.log('signout', response)
            })
            .catch(err=>console.log(err))
        }
    }

    const isAuthenticate = ()=>{
        if(typeof window === 'undefined'){
            return false
        }

        if(localStorage.getItem('jwt')){
            return JSON.parse(localStorage.getItem('jwt'))
        }else{
            return false
        }
    }


export {
    signup,
    signin,
    authenticate,
    signout,
    isAuthenticate,
}