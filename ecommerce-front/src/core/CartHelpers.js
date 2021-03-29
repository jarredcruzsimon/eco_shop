export const addItem =(item, next)=>{
    let cart = []
    if(typeof window !== "undefined"){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count:1
        })
        console.log(cart)
        //remove duplicates
        //build an Array from new Set and turn it back into array using Array.from
        //so that later we can re-map it
        //new set will only allow unique values in it
        //so pass the ids of each object/product
        //if the loop tries to add the same value again, it will be ignored
        //...with the array of ids we got with first map() was used
        //run map() on it again and return the actual product from the cart
        cart = Array.from(new Set(cart.map((products)=>(products._id)))).map((id)=>{
            return(
                cart.find(product => product._id === id)
            )
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        next()

    }
}