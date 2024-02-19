import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import user_image from "../assets/image/profile.png";
import useUserStore from "../store/userStore";
import apiUrl from "../utils/apiUrl";

const Product = () => {
  const { user } = useUserStore();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const getProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}/product/${id}`);
      if (res.data.success) {
        setProduct(res.data.data);
      }
    } catch (error) {
      console.log("first");
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {product && (
        <div className="flex justify-between">
          <div className="w-1/2">
            <img src={product?.image?.url} className="" />
          </div>
          <div className="w-1/2 p-4 space-y-3">
            <div className="py-2 mb-5 space-x-2 text-gray-500">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to={`/category/${product?.category?._id}`}>
                {product?.category?.name}
              </Link>
              <span>/</span>
              <Link
                to={`/product/${product?._id}`}
                className="text-black font-semibold"
              >
                {product.name}
              </Link>
            </div>
            <h2 className="py-2 text-4xl font-semibold">{product?.name}</h2>
            <p className="space-x-2 font-semibold">
              <span className="text-3xl">৳</span>
              <span className="text-2xl">{product?.price}</span>
            </p>
            <p className="space-x-2">
              <span className="font-semibold">Quantity : </span>
              <span className="text-gray-500">
                {product.quantity} {product?.sku}
              </span>
            </p>
            <p className="space-x-2">
              <span className="font-semibold">Stock : </span>
              <span className="text-gray-500">{product?.stock}</span>
            </p>
            <button className="px-4 py-2 uppercase bg-green-600 text-white rounded">
              Add cart
            </button>
          </div>
        </div>
      )}
      <Tabs>
        <TabList>
          <Tab>Descriptions</Tab>
          <Tab>Additional information</Tab>
          <Tab>Customers Reviews</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div
              dangerouslySetInnerHTML={{
                __html: product?.description ? product?.description : "",
              }}
            ></div>
          </TabPanel>
          <TabPanel>
            <div
              dangerouslySetInnerHTML={{
                __html: product?.additionalInfo ? product?.additionalInfo : "",
              }}
            ></div>
          </TabPanel>
          <TabPanel>
            <div
              className="space-y-3"
            >
            <h2 className="text-xl">Got The Question About This Product?</h2>
            {user?.email ?
              <div className="p-4 flex justify-between space-x-3 bg-[#F9F9F9]">
                <img
                  src={`${user?.image?.url ? user?.image?.url : user_image}`}
                  className="w-16 h-16 rounded-full"
                />
                <div className="w-full">
                  <textarea
                    rows={3}
                    className="w-full p-2 outline-none rounded"
                  />
                  <button className="px-6 py-2 bg-[#f0f0f0] hover:bg-[#e6e6e6] rounded">
                    Post Comment
                  </button>
                </div>
              </div>
              :
              <div className="p-4 bg-[#F9F9F9] text-sm">
                You must be logged in to post a comment.
              </div>
            }
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Product;
