import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxCrossCircled } from 'react-icons/rx'
import useProductStore from "../store/productStore";

const CartList = () => {
    const { cart, setAdjustCart, setremoveCart } = useProductStore()

    const handleCartChange = (type,product) => {
        if(product.buyQuantity === 1 && type === 'decrement'){
            return 
        }
        if (type === 'increment') {
            return setAdjustCart(product._id, product.buyQuantity + 1)
        } else {
            setAdjustCart(product._id, product.buyQuantity - 1)
        }

    }

    const total = cart.reduce((acc, cur) => acc + cur.price * cur.buyQuantity, 0)
    return (
        <div className="flex space-x-4">
            <div className="w-8/12">
            <table
                className="w-full"
            >
                        <thead className="bg-gray-100">
                            <tr>
                                <td className='o-2 text-center'></td>
                                <td className='o-2 text-center'></td>
                                <td className='o-2'>Product</td>
                                <td className='p-2 text-center'>Price</td>
                                <td className='p-2 text-center'>Quantity</td>
                                <td className='p-2 text-center'>Subtotal</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cart &&
                                cart.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            <RxCrossCircled
                                                onClick={() => setremoveCart(product._id)}
                                                size={22}
                                                className='cursor-pointer'
                                            />
                                        </td>
                                        <td>
                                            <img src={product.image.url} className="h-16" />
                                        </td>
                                        <td>{product.name}</td>
                                        <td className='p-2 text-center'>{product.price}</td>
                                        <td>
                                            <div
                                                className="w-24 mx-auto p-2 flex justify-center items-center border rounded"
                                            >
                                                <AiOutlinePlus
                                                    size={22}
                                                    onClick={() => handleCartChange('increment', product)}
                                                    className='hover:text-red-500 cursor-pointer'
                                                />
                                                <span
                                                    className="w-full text-center"
                                                >
                                                    {product.buyQuantity}
                                                </span>
                                                <AiOutlineMinus
                                                    size={22}
                                                    onClick={() => handleCartChange('decrement', product)}
                                                    className={`hover:text-red-500 ${product.buyQuantity === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                />
                                            </div>
                                        </td>
                                        <td className='p-2 text-center'>
                                            {
                                                (product.buyQuantity * product.price).toFixed(0)
                                            }
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
            </div>
            <div className="w-4/12 p-4 space-y-2 border-2">
                <h2 className="p-2 text-2xl font-bold">Cart Totals</h2>
                <p
                    className="p-2 flex justify-between border-b"
                >
                    <span className="font-semibold">
                        Subtotal
                    </span>
                    <span>{total}</span>
                </p>
                <p
                    className="p-2 flex justify-between border-b"
                >
                    <span className="font-semibold">
                        Shipping
                    </span>
                    <span>{total}</span>
                </p>
                <p
                    className="p-2 flex justify-between"
                >
                    <span className="text-xl font-semibold">
                        Total
                    </span>
                    <span className="text-2xl">{total} -Tk</span>
                </p>
                <Link
                    to='/checkout'
                    className="block w-full p-2 bg-green-600 text-white text-center uppercase rounded"
                >
                    Proceed Checkout
                </Link>
            </div>
        </div>
    );
};

export default CartList;