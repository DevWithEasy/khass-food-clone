import {CartList, EmptyCart} from "../components/Index";
import useProductStore from "../store/productStore";

const Cart = () => {
  const { cart } = useProductStore()
  
  return (
    <>
      {
        cart.length > 0 ? 
        <CartList/> 
        : 
        <EmptyCart/>
      }
    </>
  );
};

export default Cart;
