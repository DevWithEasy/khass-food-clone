import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import apiUrl from "../utils/apiUrl";
import useUserStore from "../store/userStore";

const DeleteModal = ({ path, id, view, handleView }) => {
    const { setLoading, setStatus } = useUserStore()
    const handleDelete = async () => {
        setLoading()
        handleView()
        try {
            const res = await axios.delete(`${apiUrl}/${path}/${id}`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                setStatus('success')
                setTimeout(() => {
                    setLoading()
                    setStatus('start')
                }, 1500)
            }
        } catch (error) {
            console.log('')
            setStatus('failure')
            setTimeout(() => {
                setLoading()
                setStatus('start')
            }, 1500)
        }
    }
    return (
        <>
            <Modal isOpen={view} onClose={handleView}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>
                            Your data will be delete successfully delete.You cannot be undone and loss your data.
                        </p>
                    </ModalBody>

                    <ModalFooter className="space-x-3">
                        <button
                            onClick={handleView}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Delete
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteModal;
