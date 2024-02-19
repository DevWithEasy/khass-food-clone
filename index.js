const cloudinary = require ("cloudinary");
const  dotenv = require ("dotenv");
const express  = require ("express");
const connectDB  = require ("./config/connectDB");
const errorHandler = require ("./middleware/errorHandler");
const applyMiddleware = require ("./middleware/middlewares");
const applyRouter = require ("./routes/routes");
dotenv.config();

const app = express();

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//database connection
connectDB();

//apply middleware configuration
applyMiddleware(app);

//apply routes
applyRouter(app);

//error handling
errorHandler(app);

app.listen(8080, () => {
  console.log("listening on port http://loaclhost:8080");
});
