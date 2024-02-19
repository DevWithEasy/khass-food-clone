const mongoose =require ("mongoose")

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref : 'User'
    },
    comment : {
        type : String,
        required : true
    },
    replies : {
        type : [
            {
                type: mongoose.Types.ObjectId,
                ref : 'Reply'
            }
        ]
    }
},{
    timestamps : true
});


const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;