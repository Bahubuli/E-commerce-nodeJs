console.log('E-Commerce API');
require("dotenv").config()
require("express-async-errors")


const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const fileUpload = require("express-fileupload")
const rateLimiter = require("express-rate-limit")
const helmet = require("helmet");
const xss = require("xss-clean")
const cors = require("cors")
const mongoSanitize = require("express-mongo-sanitize");

app.set("trust proxy",1);
app.use(
    rateLimiter({
        windowsMs:15*60*1000,
        max:60
    })
)
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());


// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"))
app.use(fileUpload())
app.use(cors())




// routers
const authRouter = require("./routes/authRoutes")
app.use("/api/v1/auth",authRouter)

const userRouter = require("./routes/userRoutes")
app.use("/api/v1/users",userRouter)

const productRouter = require("./routes/productRoutes");
app.use("/api/v1/product",productRouter)

const reviewRouter = require("./routes/reviewRoutes")
app.use("/api/v1/review",reviewRouter)

const orderRouter = require("./routes/orderRoutes")
app.use("/api/v1/orders",orderRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 5000 || process.env.PORT;
const start = async()=>{
    try {
    await connectDB(process.env.MONGO_URL);
    app.listen(5000,()=>console.log("server is listening at 5000"))
} catch (error) {
   console.log(error)
}
}

start()
