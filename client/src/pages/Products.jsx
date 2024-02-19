import axios from "axios";
import { ProductCard, ProductCardSkeleton } from "../components/Index";
import useProductStore from "../store/productStore";
import apiUrl from "../utils/apiUrl";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import '../App.css'
import array from "../utils/getArray";


const Products = () => {
    const { products, setProducts } = useProductStore()
    const [totalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(0)
    const getProducts = async (page) => {
        try {
            const res = await axios.get(`${apiUrl}/product?page=${page}`)
            if (res.data.success) {
                setTotalPage(res.data.pages)
                setProducts(res.data.data)
            }
        } catch (error) {
            console.log('')
        }
    }
    const changePage = ({ selected }) => {
        // setPage(selected)
        setPage(selected)
    }
    
    useEffect(() => {
        getProducts(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])


    return (
        <>
            {products.length > 0 ?
                <div>
                    <div
                        className="grid grid-cols-5 gap-3"
                    >
                        {
                            products.map((product) => <ProductCard key={product._id} product={product} />)
                        }
                    </div>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={changePage}
                        pageRangeDisplayed={2}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName="paginate"
                        previousClassName="previousBtn"
                        nextClassName="nextBtn"
                        disabledClassName="disabled"
                        activeClassName="activePage"
                    />
                </div>

                :
                <div className="grid grid-cols-5 gap-3">
                    {array(9).map(value=> <ProductCardSkeleton key={value} />)}
                </div>
            }
        </>
    );
};

export default Products;