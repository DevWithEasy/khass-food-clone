import axios from "axios";
import { useEffect, useState } from "react";
import { Input, Loading } from "../../../components/Index";
import apiUrl from "../../../utils/apiUrl";
import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "../../../store/userStore";

const UpdateCategory = () => {
  const {setStatus,loading, setLoading} = useUserStore()
  const navigate = useNavigate()
  const {id} = useParams()
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

  const handleUpdate = async () => {
    setLoading()
    try {
      const res = await axios.put(`${apiUrl}/category/${id}`, category, {
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
      console.log("")
      setStatus('failure')
      setTimeout(()=>{
        setLoading()
        setStatus('start')
      },1500)
    }
  };

  const getCategory = async (id) => {
    setLoading()
    try {
      const res = await axios.get(`${apiUrl}/category/${id}`);
      if (res.data.success === true) {
        const { name, type } = res.data.data;
        setCategory({
          name: name,
          type: type,
        });
        setLoading();
      }
    } catch (error) {
      console.log(error);
      setLoading();
    }
  };

  useEffect(() => {
    id && getCategory(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className='space-y-3'>
      <h1 className='py-2 bg-green-600 text-white text-center font-bold text-2xl uppercase'>Update Category</h1>
      <div className="p-4 space-y-3">
        <Input
          {...{
            label: "Name",
            name: "name",
            value: category.name,
            placeholder: "Category Name",
            handleChange,
          }}
        />
        <div className="space-y-2">
          <label>Product sku : </label>
          <select
            name="type"
            value={category.type}
            onChange={handleChange}
            className="w-full p-2 border focus:border focus:outline-green-400 rounded"
          >
            <option> select for type </option>
            <option value="product"> Product </option>
            <option value="blog"> Blog </option>
          </select>
        </div>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Update
        </button>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default UpdateCategory;
