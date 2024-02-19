const { Application, Request, Response, Router } =require ("express")
const blogRouter =require ("./blogRoutes")
const commentRouter =require ("./commentRoutes")
const orderRouter =require ("./orderRoutes")
const productRouter =require ("./productRoutes")
const replyRouter =require ("./replyRoutes")
const userRouter =require ("./userRoutes")
const categoryRouter =require ("./categoryRouter")

const routes  = [
    {
        path : '/api/user',
        handler : userRouter
    },
    {
        path : '/api/category',
        handler : categoryRouter
    },
    {
        path : '/api/product',
        handler : productRouter
    },
    {
        path : '/api/blog',
        handler : blogRouter
    },
    {
        path : '/api/order',
        handler : orderRouter
    },
    {
        path : '/api/comment',
        handler : commentRouter
    },
    {
        path : '/api/reply',
        handler : replyRouter
    },
    {
        path : '/',
        handler : (req,res)=>{
            res.json({
                message : 'Server is running'
            })
        }
    },
]

const applyRouter=(app)=>{
    routes.map(route=>{
        if(route.path === '/' ){
            app.get(route.path,route.handler)
        }else{
            app.use(route.path,route.handler)
        }
    })
}

module.exports = applyRouter