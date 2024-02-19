import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import apiUrl from "../../../utils/apiUrl";
import { formats, modules } from "../../../utils/editorsConfig";
import {Loading} from "../../../components/Index";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/userStore";
const AddProduct = () => {
  const {setStatus,loading, setLoading} = useUserStore()
  const navigate = useNavigate()
  const [categories, setCategories] = useState(null);
  const [product, setProduct] = useState({
    category: "",
    name: "",
    price: "",
    quantity: "",
    sku: "",
    stock : ""
  });
  const [description, setDescription] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevVelue) => ({
      ...prevVelue,
      [name]: value,
    }));
  };

  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleAddProduct = async () => {
    if (!product.category || !product.name || !product.sku || !product.price) {
      return alert("field required");
    }
    if (!file) {
      return alert("file required");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("quantity", product.quantity);
    formData.append("sku", product.sku);
    formData.append("stock", product.stock);
    formData.append("description", description);
    formData.append("additionalInfo", additionalInfo);
    setLoading()
    try {
      const res = await axios.post(`${apiUrl}/product/`, formData);
      if(res.data.success){
        setStatus('success')
        setTimeout(()=>{
          setLoading()
          navigate('/product/all')
          setStatus('start')
        },1500)
      }
    } catch (error) {
      console.log(error);
      setStatus('failure')
      setTimeout(()=>{
        setLoading()
        setStatus('start')
      },1500)
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(`${apiUrl}/category?type=product`);
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  return (
    <div className="">
      <h1 className='py-2 bg-green-600 text-white text-center font-bold text-2xl uppercase'>Add new product</h1>
      <div className="p-4 space-y-2">
        <div className="grid grid-cols-2 space-x-3">
          <div className="space-y-2">
            <label>Product Name : </label>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              placeholder="Product name"
              className="w-full p-2 border focus:border focus:outline-green-400 rounded"
            />
          </div>
          <div className="space-y-2">
            <label>Product price : </label>
            <input
              name="price"
              type="number"
              onChange={handleChange}
              placeholder="Product price"
              className="w-full p-2 border focus:border focus:outline-green-400 rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label>SKU Quantity : </label>
            <input
              name="quantity"
              type="number"
              onChange={handleChange}
              placeholder="SKU Quantity"
              className="w-full p-2 border focus:border focus:outline-green-400 rounded"
            />
          </div>
          <div className="space-y-2">
            <label>Product sku : </label>
            <select
              name="sku"
              onChange={handleChange}
              className="w-full p-2 border focus:border focus:outline-green-400 rounded"
            >
              <option> select category </option>
              <option value="Pcs"> Pcs </option>
              <option value="Gm"> Gm </option>
              <option value="Kg"> Kg </option>
            </select>
          </div>
          <div className="space-y-2">
            <label>Product category : </label>
            <select
              name="category"
              onChange={handleChange}
              className="w-full p-2 border focus:border focus:outline-green-400 rounded"
            >
              <option> select category </option>
              {categories &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {" "}
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="space-y-2">
            <label>Stock Quantity : </label>
            <input
              name="stock"
              type="number"
              onChange={handleChange}
              placeholder="Stock Quantity"
              className="w-full p-2 border focus:border focus:outline-green-400 rounded"
            />
          </div>
        </div>

        <div className="space-y-2 pb-10">
          <label>Product Description : </label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
            className="h-[250px]"
          />
        </div>
        <div className="space-y-2 pb-10">
          <label>Product Additinal Info : </label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={additionalInfo}
            onChange={setAdditionalInfo}
            className="h-[250px]"
          />
        </div>
        <div className="space-y-2">
          <label>Product image : </label>
          <input
            name="price"
            type="file"
            onChange={handleFile}
            placeholder="Product price"
            className="w-full p-2 border focus:border focus:outline-green-400 rounded"
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="px-6 py-2 bg-green-600 text-white rounded"
        >
          Submit
        </button>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default AddProduct;
