const { Router } =require ("express");
const {
    createProduct,
    deleteProduct,
    findProduct,
    getAllHomeProduct,
    getAllProduct,
    getProductByCategory,
    getSingleProduct,
    updateProduct,
} =require ("../controllers/productControllers");
const upload =require ("../middleware/upload");

const productRouter = Router();

productRouter
    .post("/", upload.single("file"), createProduct)
    .put("/:id", upload.single("file"), updateProduct)
    .delete("/:id", deleteProduct)
    .get("/:id", getSingleProduct)
    .get("/", getAllProduct)
    .get("/find/home", getAllHomeProduct)
    .get("/category/:id", getProductByCategory)
    .get("/find/product", findProduct)

module.exports = productRouter;
