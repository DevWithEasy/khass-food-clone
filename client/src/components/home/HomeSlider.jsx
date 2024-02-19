import img1 from "../../assets/image/header_image_01.webp";
import img2 from "../../assets/image/header_image_02.webp";


const HomeSlider = () => {
 
  return (
    <div className="p-2 overflow-hidden">
      <div>
        <img src={img1} />
      </div>
      <div>
        <img src={img2} />
      </div>
    </div>
  );
};

export default HomeSlider;
