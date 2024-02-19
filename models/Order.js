const mongoose =require ("mongoose")

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref : 'User'
    },
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    
    email : {
        type : String,
        required : true
    },
    address: {
        area: {
            type: String,
            required : true
        },
        postOffice: {
            type: String,
            required : true
        },
        upazilla: {
            type: String,
            required : true
        },
        district: {
            type: String,
            required : true
        },
    },
    bill : {
        type : Number,
        required : true
    },
    charge : {
        type : Number,
        required : true
    },
    isDeliveried : {
        type : Boolean,
        default : false
    },
    products : {
        type : [
            {
                quantity : {
                    type : Number,
                    required : true
                },
                product : {
                    type : mongoose.Types.ObjectId,
                    ref : 'Product'
                }
            }
        ]
    },
    status : {
        type : [
            {
                date : {
                    type : Date,
                    default : Date.now()
                },
                status : {
                    type : String,
                    required : true
                }
            }
        ]
    }
},{
    timestamps : true
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;