const mongoose =require ("mongoose");

const verificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    code : {
        type : String,
        required: true
    },
    expire : {
        type : Date,
        default : Date.now() + 21600000
    }
},{
    timestamps : true
});

const Verification = mongoose.model("Verification", verificationSchema);
module.exports = Verification;