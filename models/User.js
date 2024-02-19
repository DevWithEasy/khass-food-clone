const mongoose =require ("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            min: 11,
            max: 14,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        image: {
            url :{
                type: String,
                default : ''
            },
            public_id : {
                type : String,
                default : ''
            }
        },
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        orders: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "Order",
                },
            ],
            default: [],
        },
        address: {
            area: {
                type: String,
                default : ''
            },
            postOffice: {
                type: String,
                default : ''
            },
            upazilla: {
                type: String,
                default : ''
            },
            district: {
                type: String,
                default : ''
            },
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;