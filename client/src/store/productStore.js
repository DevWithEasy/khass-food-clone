import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';



const productStore = (set)=>({
    cart : [],
    categories : [],
    products : [],
    setCategoies : (data)=>{

        set(()=>({
            categories : data
        }))
        
    },
    setProducts : (data)=>{

        set(()=>({
            products : data
        }))
        
    },
    setAddCart :(product)=>{

        set((state)=>{
            const inCart = state.cart.find(item=>item._id === product._id ? true : false)
            if (inCart){
                return {cart : state.cart.map(item => item._id === product._id ? {...item,buyQuantity : item.buyQuantity+1} : item)}
            }else{
                return {cart : [...state.cart,{...product,buyQuantity : 1}]}
            }
        })

    },
    setRemoveCart :(id)=>{

        set((state)=>({
            cart : state.cart.filter(item=>item._id !== id)
        }))

    },
    setAdjustCart :(id, qty)=>{

        set((state)=>({
            cart : state.cart.map(item=>item._id === id ? {...item,buyQuantity : qty} : item)
        }))

    },
})

const useProductStore = create(
    devtools(
        persist(productStore,{
            name : 'product'
        })
    )
)

export default useProductStore;