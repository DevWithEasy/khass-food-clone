const { Router } =require ("express");
const {
    createCategory,
    deleteCategory,
    getAllCategory,
    getCategory,
    updateCategory,
} =require ("../controllers/categoryController");
const authenticated =require ("../middleware/authentication");

const categoryRouter = Router();

categoryRouter
    .post("/", authenticated, createCategory)
    .put("/:id", authenticated, updateCategory)
    .delete("/:id", authenticated, deleteCategory)
    .get("/:id", getCategory)
    .get("/", getAllCategory);

module.exports = categoryRouter;