const AppError =require ("../utils/AppError");
const Category =require ("../models/Category");

exports.createCategory = async (req,res,next) => {
    try {
        const newCategory = new Category({
            name : req.body.name,
            type : req.body.type
        })
        const category = await newCategory.save()
        res.json({
            success: true,
            status: 200,
            message: "Successfully product create.",
            data: category,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.updateCategory = async (req,res,next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id,{
            'name' : req.body.name,
            'type' : req.body.type
        })
        res.json({
            success: true,
            status: 200,
            message: "Successfully category updated.",
            data: category
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.deleteCategory = async (req,res,next) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.json({
            success: true,
            status: 200,
            message: "Successfully category deleted.",
            data: "",
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.getCategory = async (req,res,next) => {
    try {
        const category = await Category.findById(req.params.id).populate('typeItems')
        res.json({
            success: true,
            status: 200,
            message: "Successfully category retrived.",
            data: category,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.getAllCategory = async (req,res,next) => {
    try {
        let categories

        if(req.query.type){
            categories = await Category.find({type : req.query.type}).select('name')
        }else{
            categories = await Category.find().populate('typeItems')
        }

        res.json({
            success: true,
            status: 200,
            message: "Successfully categories retrived.",
            data: categories,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

