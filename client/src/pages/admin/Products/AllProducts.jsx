import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import apiUrl from "../../../utils/apiUrl";
import { useNavigate } from "react-router-dom";
import { DeleteModal } from "../../../components/Index";

const AllProducts = () => {
  const navigate = useNavigate()
  const [deleteView, setDeleteView] = useState(false);
  const [id, setId] = useState("");
  const [products, setProducts] = useState(null);
  const handleDeleteView = () => {
    setDeleteView(!deleteView);
  };

  const handleGetAllProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/product`);
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className='py-2 bg-green-600 text-white text-center font-bold text-2xl uppercase'>All products</h1>
      <TableContainer className="p-4">
        <Table variant="simple">
          <Thead className="bg-gray-100">
            <Tr>
              <Th>Product Name</Th>
              <Th>Price</Th>
              <Th>Unit(SKU)</Th>
              <Th>Stock</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products &&
              products.map((product) => (
                <Tr key={product._id}>
                  <Td>{product.name}</Td>
                  <Td>{product.price}</Td>
                  <Td>
                    {product.quantity}({product.sku})
                  </Td>
                  <Td>{product.stock}</Td>
                  <Td>
                    <AiFillEdit
                      onClick={() => navigate(`/products/update/${product._id}`)}
                      size={22}
                      className="inline-block mr-3 hover:text-green-500"
                    />
                    <AiTwotoneDelete
                      onClick={() => {
                        setId(product._id);
                        handleDeleteView();
                      }}
                      size={22}
                      className="inline-block hover:text-red-500"
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {deleteView && (
        <DeleteModal
          {...{
            path : 'product',
            id: id,
            view: deleteView,
            handleView: handleDeleteView,
          }}
        />
      )}
    </div>
  );
};

export default AllProducts;
