import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const userStore  = (set)=>({
    status : 'start',
    loading : false,
    isAuth : false,
    categories : [],
    user : {
        _id  : '',
        name: '',
        email: '',
        phone : '',
        image: {
            url: '',
            public_id: '',
        },
        password: '',
        isVerified: '',
        orders: [],
        address: {
            area: '',
            postOffice: '',
            upazilla: '',
            district: '',
        },
        createdAt : '',
        updatedAt : '',
    },
    setLogin :(data)=>{
        set(()=>({
            isAuth : true,
            user : data
        }))
    },
    setLogout : ()=>{
        set(()=>({
            isAuth : false,
            user : {}
        }))
    },
    setLoading : ()=>{
        set((state )=>{
            if(state.loading){
                return {loading : false}
            }else{
                return {loading : true}
            }
        })
    },
    setCategories :(data)=>{
        set(()=>({
            categories : data
        }))
    },
    removeCategory :(id )=>{
        set((state)=>({
            categories : [...state.categories.filter(c => c._id === id)]
        }))
    },
    setStatus :(status)=>{
        set(()=>({
            status : status
        }))
    },
})

const useUserStore = create(
    devtools(
        persist(userStore,{
            name : 'user'
        })
    )
)

export default useUserStore;