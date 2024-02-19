import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import paylogo from "../assets/image/sslcommerze_logo.png";
import districts from "../assets/location_data/bd-districts.json";
import postcodes from "../assets/location_data/bd-postcodes.json";
import upazillas from "../assets/location_data/bd-upazilas.json";
import { Input } from "../components/Index";
import useProductStore from "../store/productStore";
import useUserStore from "../store/userStore";
import apiUrl from "../utils/apiUrl";

const CheckOut = () => {
  const { user } = useUserStore();
  const { cart } = useProductStore();
  const [value, setValue] = useState({
    name: user?.name,
    phone: user?.phone,
    email: user?.email,
    area: user?.address?.area,
    postOffice: user?.address?.postOffice,
    upazilla: user?.address?.upazilla,
    district: user?.address?.district,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevVelue) => ({
      ...prevVelue,
      [name]: value,
    }));
  };

  const total = cart.reduce(
    (acc, cur) => acc + cur.price * cur.buyQuantity,
    0
  );

  const district = districts.districts.find(
    (district) => district.name == value.district
  );

  const order = {
    name: value.name,
    phone: value.phone,
    email: value.email,
    address: {
      area: value.area,
      postOffice: value.postOffice,
      upazilla: value.upazilla,
      district: value.district,
    },
    bill: total,
    charge: 160,
    products: cart.map((product) => {
      return {
        quantity: product.buyQuantity,
        product: product._id,
      };
    }),
  };

  const handleCheckout = async () => {
    if (
      !value.email ||
      !value.name ||
      !value.phone ||
      !value.area ||
      !value.postOffice ||
      !value.upazilla ||
      !value.district
    ) {
      return alert("Please enter");
    }
    try {
      const res = await axios.post(`${apiUrl}/order/`, order, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success === true) {
        console.log(res.data);
        window.location.replace(res.data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-3">
      <div className="space-y-3">
        <h2 className="text-3xl">Billing Address</h2>
        <div className="space-y-2">
          <Input
            {...{
              name: "name",
              label: "Name",
              placeholder: "Enter your name",
              value: value.name,
              handleChange: handleChange,
            }}
          />
          <Input
            {...{
              name: "phone",
              label: "Phone Number",
              placeholder: "Enter Phone number",
              value: value.phone,
              handleChange: handleChange,
            }}
          />
          <Input
            {...{
              name: "email",
              label: "Email Address",
              placeholder: "Enter your email address",
              value: value.email,
              handleChange: handleChange,
            }}
          />
          <fieldset className="p-2 space-y-2 border border-dashed">
            <legend>Shipping Address</legend>
            <select
              name="district"
              value={value.district}
              onChange={(e) => handleChange(e)}
              className="p-2 w-full border rounded focus:outline-green-500"
            >
              <option value="">Select district</option>
              {districts.districts.map((district,i) => (
                <option key={i} value={district.name}>{district.name}</option>
              ))}
            </select>
            <select
              name="upazilla"
              value={value.upazilla}
              onChange={(e) => handleChange(e)}
              className="p-2 w-full border rounded focus:outline-green-500"
            >
              <option value="">Select upazilla</option>
              {upazillas.upazilas
                .filter((upazilla) => upazilla.district_id == district?.id)
                .map((upazilla,i) => (
                  <option key={i}>{upazilla.name}</option>
                ))}
            </select>
            <select
              name="postOffice"
              value={value.postOffice}
              onChange={(e) => handleChange(e)}
              className="p-2 w-full border rounded focus:outline-green-500"
            >
              <option value="">Select district</option>
              {postcodes.postcodes
                .filter((postcode) => postcode.district_id == district?.id)
                .map((postcode,i) => (
                  <option
                    key={i}
                    value={`${postcode.postOffice} (${postcode.postCode})`}
                  >
                    {postcode.postOffice}({postcode.postCode})
                  </option>
                ))}
            </select>
            <textarea
              name="area"
              value={value.area}
              onChange={(e) => handleChange(e)}
              rows={3}
              placeholder="Location area"
              className="w-full p-2 border focus:border focus:outline-green-400 rounded"
            />
          </fieldset>
        </div>
      </div>
      <div className="p-4 bg-gray-50">
        <h2 className="pb-3 text-3xl text-center font-semibold">Your order</h2>
        <div className="p-4 bg-white shadow-sm">
          <p className="px-2 py-3 flex justify-between uppercase font-semibold border-b-2">
            <span>Product</span>
            <span>Subtotal</span>
          </p>
          {cart.map((product,i) => (
            <p key={i} className="px-2 py-3 flex justify-between text-sm border-b">
              <span>
                {product.name} - {product.quantity}
                {product.sku} x {product.buyQuantity}
              </span>
              <span>{(product.buyQuantity * product.price).toFixed(0)}/-</span>
            </p>
          ))}
          <p className="px-2 py-3 flex justify-between text-sm font-semibold border-b">
            <span>Subtotal</span>
            <span>{total}/-</span>
          </p>
          <p className="px-2 py-3 flex justify-between text-sm font-semibold border-b">
            <span>Shipping : (Delivery Charge)</span>
            <span>{160}/-</span>
          </p>
          <p className="px-2 py-3 flex justify-between text-xl font-semibold">
            <span>Total</span>
            <span>{total + 160}/-</span>
          </p>
        </div>
        <div className="p-2 space-y-1">
          <p>Pay Online : (Verified By)</p>
          <img src={paylogo} className="h-8" aria-disabled />
        </div>
        <div className="p-4 bg-white shadow-sm">
          Please check the Delivery Policy before completing your order
        </div>
        <hr />
        <div className="p-2 py-5">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our
          <Link to="/privacy" className="text-blue-500">
            {" "}
            privacy policy
          </Link>
          .
        </div>
        <button
          onClick={handleCheckout}
          className="block w-full p-2 bg-green-600 text-white uppercase rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
