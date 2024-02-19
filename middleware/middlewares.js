const cors =require ('cors');
const express =require ('express');
const morgan =require ('morgan');

const middlewares = [
    express.urlencoded({extended: true}),
    express.json(),
    cors(),
    morgan('dev'),
]

const applyMiddleware=(app)=>{
    middlewares.map(m=>app.use(m))
}

module.exports = applyMiddleware