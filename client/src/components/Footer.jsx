import { AiFillInstagram, AiOutlineMail } from "react-icons/ai";
import {
  BsFacebook,
  BsFillTelephoneFill,
  BsLinkedin,
  BsYoutube,
} from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import playStoreImage from "../assets/image/Google_Play_Store.png";
import payImage from "../assets/image/payImage.webp";

const Footer = () => {
  return (
    <div className="bg-green-900">
      <div className="w-11/12 mx-auto">
        <div className="py-5 border-b"></div>
        <div className="p-4 flex flex-col justify-center items-center space-y-2">
          <span className="text-4xl text-white font-bold border p-2">
            Daily Needs
          </span>
          <div className="flex items-center space-x-3 text-white">
            <Link to="">
              <BsFacebook size={20} />
            </Link>
            <Link to="">
              <BsYoutube size={20} />
            </Link>
            <Link to="">
              <AiFillInstagram size={20} />
            </Link>
            <Link to="">
              <BsLinkedin size={20} />
            </Link>
          </div>
        </div>
        <div className="flex justify-between space-x-8">
          <div className="w-3/12">
            <h2 className="text-lg text-green-500">In Brief</h2>
            <p className="text-justify text-white text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              vero quae molestias iure aliquid aut nesciunt corrupti ab, veniam
              dolores voluptate quam consectetur cum sapiente provident
              doloremque? Qui consequatur, maxime sit suscipit provident eaque
              dolores alias assumenda quia pariatur quo ex nulla error, quas
              repudiandae facere aut minima magni voluptatibus sint!.
            </p>
          </div>
          <div className="w-3/12 text-white">
            <h2 className="text-lg text-green-500">Contact Us</h2>
            <div className="flex items-center space-x-2 font-semibold">
              <FaLocationArrow />
              <span>Head Office : </span>
            </div>
            <p className="text-sm">
              Asadullah House, 5/1, Block- E, Lalmatia, Dhaka
            </p>
            <div className="flex items-center space-x-2 font-semibold">
              <BsFillTelephoneFill />
              <span>Phone : </span>
            </div>
            <p className="text-sm">09612002255</p>
            <div className="flex items-center space-x-2 font-semibold">
              <AiOutlineMail />
              <span>Email : </span>
            </div>
            <p className="text-sm">
              customercare@khaasfood.com
              <br />
              khaasfood@gmail.com
            </p>
          </div>
          <div className="w-3/12">
            <h2 className="text-lg text-green-500">Download Apps</h2>
            <img src={playStoreImage} />
          </div>
          <div className="w-3/12 text-white">
            <h2 className="text-lg text-green-500">Usefull Links</h2>
            <div className="flex flex-col space-y-2">
              <Link to="">Privacy Policy</Link>
              <Link to="">Refund Policy</Link>
              <Link to="">Delivary Policy</Link>
              <Link to="">Faq's</Link>
              <Link to="">About Us</Link>
              <Link to="">Contact Us</Link>
              <Link to="">Career</Link>
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-gray-100" />
      <div className="w-11/12 py-3 mx-auto flex justify-between items-center text-white">
        <p>KhassFood@2023</p>
        <img src={payImage} alt="" className="h-6" />
      </div>
    </div>
  );
};

export default Footer;
