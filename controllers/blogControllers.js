const AppError =require ("../utils/AppError");
const cloudinary =require ("cloudinary");
const Blog =require ("../models/Blog");
const Category =require ("../models/Category");

exports.createBlog = async (req,res,next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "ecommerce/blogs",
        });

        const newBlog = new Blog({
            ...req.body,
            user : req.user,
            category : req.body.type,
            image: {
                url: result.url,
                public_id: result.public_id,
            },
        });

        const blog = await newBlog.save()

        await Category.updateOne({_id : req.body.type},{
            $push : {
                typeItems : blog._id
            }
        })

        res.json({
            success: true,
            status: 200,
            message: "Successfully product create.",
            data: blog,
        })
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.updateBlog = async (req,res,next) => {
    try {
        const findBlog = await Blog.findById(req.params.id)

        const updateDoc = {
            'title' : req.body.title,
            'description' : req.body.description,
            'category' : req.body.type
        }

        let blog;

        if (!req.file) {
            blog = await Blog.findByIdAndUpdate(req.params.id,updateDoc,{new : true});
        }else{
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "ecommerce/blogs",
            })
            if(result){
                await cloudinary.uploader.destroy(findBlog.image.public_id)
                blog = await Blog.findByIdAndUpdate(req.params.id,{
                    ...updateDoc,
                    'image.url' : result.url,
                    'image.public_id' : result.public_id
                })
            }
        }

        res.json({
            success: true,
            status: 200,
            message: "Successfully blog updated.",
            data: blog
        })
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.deleteBlog = async (req,res,next) => {
    try {
        const findBlog = await Blog.findById(req.params.id)

        await cloudinary.uploader.destroy(findBlog.image.public_id)

        await Blog.findByIdAndDelete(req.params.id)

        res.json({
            success: true,
            status: 200,
            message: "Successfully blog deleted",
            data: "",
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.getBlog = async (req,res,next) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('user').populate('category')
        res.json({
            success: true,
            status: 200,
            message: "Successfully blog retrived",
            data: blog,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.getAllBlog = async (req,res,next) => {
    try {
        const blogs = await Blog.find().populate('user').populate('category')
        res.json({
            success: true,
            status: 200,
            message: "Successfully blogs retrived.",
            data: blogs,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};