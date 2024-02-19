import { Link } from 'react-router-dom';
import cartImg from '../assets/image/empty-cart.png';

const EmptyCart = () => {
    return (
        <div
            className='pb-10 flex flex-col justify-center items-center space-y-4'
        >
            <img 
                src={cartImg}
                className='w-64'
            />
            <h1 className='text-4xl text-center font-semibold'>
                Your cart is currently empty.
            </h1>
            <p className='text-center'>
            Before proceed to checkout you must add some products to your shopping cart.<br/>
            You will find a lot of interesting products on our "Shop" page.
            </p>
            <Link
                to='/products'
                className='px-6 py-2 uppercase bg-green-500 text-white rounded'
            >
                Return Shopping
            </Link>
        </div>
    );
};

export default EmptyCart;