const { Router } =require ('express');
const { } =require ('../controllers/userControllers');
const authenticated =require ('../middleware/authentication');
const { createComment, deleteComment, getComment, updateComment } =require ('../controllers/commentControllers');

const commentRouter = Router()

commentRouter.post('/',authenticated,createComment )
    .put('/:id', updateComment)
    .delete('/:id',deleteComment)
    .get('/:id',getComment)

module.exports = commentRouter