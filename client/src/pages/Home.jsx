import { useEffect } from "react";
import axios from "axios";
import apiUrl from "../utils/apiUrl";
import { HomeProductSection, HomeProductSectionSkeleton } from "../components/Index";
import useProductStore from "../store/productStore";
import { Link } from "react-router-dom";

const Home = () => {
  const { categories, setCategoies } = useProductStore()

  const getHomeProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/product/find/home`)
      if (res.data.success) {
        setCategoies(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getHomeProducts()
  }, [])

  return <div>
    {categories.length > 0 ?
      <div>
        {
          categories &&
          categories.slice(0,5).map((category) => <HomeProductSection
            key={category._id}
            category={category}
          />)
        }
        <div
          className='pt-5 flex justify-center'
        >
          <Link 
            to='/products'
            className='px-6 py-2 bg-green-500 text-white rounded'
          >
            Browse All Products
          </Link>
        </div>
      </div>
      :
      <HomeProductSectionSkeleton />
    }

  </div>;
};

export default Home;
