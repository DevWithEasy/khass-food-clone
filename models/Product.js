const mongoose =require ("mongoose")

const productSchema = new mongoose.Schema({
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
    name: {
        type: String,
        required: true,
    },
    quantity : {
        type : Number,
        required: true
    },
    sku : {
        type : String,
        required: true
    },
    price : {
        type : Number,
        required: true
    },
    image: {
        url :{
            type: String,
        },
        public_id : {
            type : String
        }
    },
    stock : {
        type : Number,
        required: true,
        default : 0
    },
    description : {
        type : String
    },
    additionalInfo : {
        type : String
    },
    comments :{
        type : [
            {
                type : mongoose.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    }

},{
    timestamps : true
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;