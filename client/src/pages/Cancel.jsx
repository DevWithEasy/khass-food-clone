import axios from "axios";
import { useParams } from "react-router-dom";
import apiUrl from "../utils/apiUrl";
import { useEffect } from "react";

const Cancel = () => {
    const {id} = useParams()
    const handleOrderDelete=async()=>{
        try {
            const res = await axios.delete(`${apiUrl}/order/${id}`)
            if(res.data.success === true){
                console.log(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        handleOrderDelete()
    })
    return (
        <div>
            cancel
        </div>
    );
};

export default Cancel;