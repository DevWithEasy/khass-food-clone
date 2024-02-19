const cloudinary =require ("cloudinary");
const Category =require ("../models/Category");
const Product =require ("../models/Product");
const AppError =require ("../utils/AppError");

exports.createProduct = async (req,res,next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "ecommerce/products",
        });

        const newProduct = new Product({
            ...req.body,
            image: {
                url: result.url,
                public_id: result.public_id,
            },
        });

        const product = await newProduct.save();

        await Category.findByIdAndUpdate(req.body.category, {
            $push: {
                typeItems: product._id,
            },
        });

        res.json({
            success: true,
            status: 200,
            message: "Successfully product create.",
            data: product,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.updateProduct = async (req,res,next) => {
    try {
        const findProduct = await Product.findById(req.params.id);
        const updateDoc = {
            name: req.body.name,
            price: req.body.price,
            quantity : req.body.quantity,
            sku: req.body.sku,
            category: req.body.category,
            stock: req.body.stock,
            description: req.body.description,
            additionalInfo: req.body.description,
        };

        let product;

        if (!req.file) {
            product = await Product.findByIdAndUpdate(req.params.id, updateDoc, {
                new: true,
            });
        } else {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "ecommerce/products",
            });
            if (result) {
                await cloudinary.uploader.destroy(findProduct.image.public_id);
                product = await Product.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: {
                            ...updateDoc,
                            "image.url": result.url,
                            "image.public_id": result.public_id,
                        },
                    },
                    { new: true }
                );
            }
        }

        res.json({
            success: true,
            status: 200,
            message: "Successfully product updated.",
            data: product,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.deleteProduct = async (req,res,next) => {
    try {
        const product = await Product.findById(req.params.id)

        await Product.findByIdAndDelete(req.params.id)

        await cloudinary.uploader.destroy(product.image.public_id)

        res.json({
            success: true,
            status: 200,
            message: "Successfully product delete.",
            data: {},
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.getSingleProduct = async (req,res,next) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");

        res.json({
            success: true,
            status: 200,
            message: "Successfully product retrived.",
            data: product,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.getAllProduct = async (req,res,next) => {
    try {
        const {page} = req.query

        const limit = 15

        const total = await Product.countDocuments()

        const totalPage = Math.ceil(total/15)

        const skip = Number(page) === 0 ? 0 : Number(page) * limit

        const products = await Product.find()
        .populate("category")
        .skip(skip)
        .limit(limit);

        res.json({
            success: true,
            status: 200,
            message: "Successfully product create.",
            total : total,
            pages : totalPage,
            data: products,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.getProductByCategory = async (req,res,next) => {
    try {
        const products = await Product.find({ category: req.params.id }).populate(
            "category"
        );

        res.json({
            success: true,
            status: 200,
            message: "Successfully product create.",
            data: products,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.findProduct = async (req,res,next) => {
    try {
        const product = await Product.find({ category: req.params.id });

        res.json({
            success: true,
            status: 200,
            message: "Successfully product create.",
            data: product,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.getAllHomeProduct = async (req,res,next) => {
    try {

        const products = await Category.find({type : 'product'}).populate('typeItems','name image price sku quantity')

        res.json({
            success: true,
            status: 200,
            message: "Successfully product create.",
            data: products,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};