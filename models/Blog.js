const mongoose =require ("mongoose");

const blogSchema = new mongoose.Schema(
    {
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required : true
        },
        image :{
            url : {
                type : String
            },
            public_id : {
                type : String
            }
        }
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model("Blog", blogSchema)
module.exports = Blog;