const ProductCardSkeleton = () => {
    return (
        <div
            className='p-4 space-y-3 border rounded animate-pulse'
        >
            <div className='h-[150px] w-[150px] mx-auto bg-gray-200 rounded-full'>
            </div>
            <div className="flex flex-col justify-center items-center space-y-2">
                <p className="text-center">
                    <span className="py-2 block w-[100px] bg-gray-200 rounded-full"></span>
                </p>
                <p className="flex space-x-3">
                <span className="py-2 block w-[75px] bg-gray-200 rounded-full"></span>
                <span className="py-2 block w-[75px] bg-gray-200 rounded-full"></span>
                </p>
                <button
                    className="p-4 w-[100px] bg-gray-200 rounded-full"
                >

                </button>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;