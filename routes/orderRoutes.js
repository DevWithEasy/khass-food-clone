const { Router } =require ("express");
const {
    createOrder,
    deleteOrder,
    getAllOrder,
    getAllOrderByUser,
    getOrder,
    updateOrder,
} =require ("../controllers/orderControllers");
const authenticated =require ("../middleware/authentication");

const orderRouter = Router();

orderRouter
    .post("/", authenticated, createOrder)
    .put("/:id", authenticated, updateOrder)
    .delete("/:id",authenticated, deleteOrder)
    .get("/:id",authenticated, getOrder)
    .get("/",authenticated, getAllOrder)
    .get("/user/:id",authenticated, getAllOrderByUser)

module.exports = orderRouter;
