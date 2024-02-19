import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import apiUrl from "../../../utils/apiUrl";
import { DeleteModal, Loading } from "../../../components/Index";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/userStore";

const AllCategory = () => {
    const {loading} = useUserStore()
    const navigate = useNavigate()
    const [deleteView, setDeleteView] = useState(false);
    const [id, setId] = useState("");
    const [categories, setCategories] = useState(null);

    const handleDeleteView = () => {
        setDeleteView(!deleteView);
    };

    const handleGetAllCategories = async () => {
        try {
            const res = await axios.get(`${apiUrl}/category`);
            if (res.data.success) {
                setCategories(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetAllCategories();
    }, []);

    return (
        <div className="space-y-3">
            <h1 className='py-2 bg-green-600 text-white text-center font-bold text-2xl uppercase'>All categories</h1>
            <TableContainer className="p-4">
                <Table variant="simple">
                    <Thead className="bg-gray-100">
                        <Tr>
                            <Th>Category Name</Th>
                            <Th>Category Type</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories &&
                            categories.map((category) => (
                                <Tr key={category._id}>
                                    <Td>{category.name}</Td>
                                    <Td>{category.type === 'blog' ? 'Blog' : 'Product'}</Td>
                                    <Td>
                                        <AiFillEdit
                                            onClick={() => navigate(`/category/update/${category._id}`)}
                                            size={22}
                                            className="inline-block mr-3 hover:text-green-500"
                                        />
                                        <AiTwotoneDelete
                                            onClick={() => {
                                                handleDeleteView()
                                                setId(category._id)
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
                        path: 'category',
                        id: id,
                        view: deleteView,
                        handleView: handleDeleteView,
                    }}
                />
            )}
            {
                loading && <Loading/>
            }
        </div>
    );
};

export default AllCategory;
