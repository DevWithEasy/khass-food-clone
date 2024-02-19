import array from "../../utils/getArray";
import ProductCardSkeleton from "./ProductCardSkeleton";

const HomeProductSectionSkeleton = () => {
    return (
        <>
            {array(2).map((value) => (
                <div key={value} className="w-full">
                    <div className="py-2 flex justify-between items-center">
                        <h2 className="w-8/12 py-4 bg-gray-200 rounded-full"></h2>
                        <span className="w-[75px] p-4 bg-gray-200 rounded-full"></span>
                    </div>
                    <div className="w-full grid grid-cols-5 gap-2">
                        {array(4).map((value) => (
                            <ProductCardSkeleton key={value} />
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default HomeProductSectionSkeleton;
