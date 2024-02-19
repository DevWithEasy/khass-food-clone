const mongoose =require ("mongoose")

const replySchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref : 'User'
    },
    reply : {
        type : String,
        required : true
    }
},{
    timestamps : true
});

const Reply = mongoose.model("Reply", replySchema);
module.exports = Reply;