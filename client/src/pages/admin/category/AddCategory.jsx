import axios from "axios";
import React, { useState } from "react";
import { Input, Loading } from "../../../components/Index";
import apiUrl from "../../../utils/apiUrl";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/userStore";

const AddCategory = () => {
  const {setStatus,loading, setLoading} = useUserStore()
  const navigate = useNavigate()
  const [category, setCategory] = useState({
    name: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevVelue) => ({
      ...prevVelue,
      [name]: value,
    }));
  };
  const handleCreateCategory = async () => {
    if(!category.name || !category.type){
      return alert('Add all field')
    }
    setLoading()
    try {
      const res = await axios.post(`${apiUrl}/category/`, category, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setStatus('success')
        setTimeout(()=>{
          setLoading()
          navigate('/categories')
          setStatus('start')
        },1500)
      }
    } catch (error) {
      console.log(error)
      setStatus('failure')
      setTimeout(()=>{
        setLoading()
        setStatus('start')
      },1500)
    }
  };

  return (
    <div className="space-y-2">
      <h1 className='py-2 bg-green-600 text-white text-center font-bold text-2xl uppercase'>Add new Category</h1>
      <div className="p-4 space-y-2">
      <Input
        {...{
          label: "Name",
          name: "name",
          placeholder: "Category Name",
          handleChange,
        }}
      />
      <div className="space-y-2">
        <label>Product sku : </label>
        <select
          name="type"
          onChange={handleChange}
          className="w-full p-2 border focus:border focus:outline-green-400 rounded"
        >
          <option> select for type </option>
          <option value="product"> Product </option>
          <option value="blog"> Blog </option>
        </select>
      </div>
      <button
          onClick={handleCreateCategory}
          className="px-6 py-2 rounded bg-green-500 text-white"
        >
          Submit
        </button>
      </div>
      {loading && <Loading/>}
    </div>
  );
};

export default AddCategory;
