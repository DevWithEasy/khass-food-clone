const { Router } =require ("express");
const {
    createBlog,
    deleteBlog,
    getAllBlog,
    getBlog,
    updateBlog,
} =require ("../controllers/blogControllers");
const authenticated =require ("../middleware/authentication");

const blogRouter = Router();

blogRouter
    .post("/", authenticated, createBlog)
    .put("/:id", authenticated, updateBlog)
    .delete("/:id", authenticated, deleteBlog)
    .get("/:id", getBlog)
    .get("/", getAllBlog);

module.exports =  blogRouter;