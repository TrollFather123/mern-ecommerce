const userRouter = require("./routes/userRoute")
const productRouter = require("./routes/productRoute")
const orderRoute = require("./routes/orderRoute")
const blogRoute = require("./routes/blogRoute")
const commentRoute = require("./routes/commentRoute");
const paymentRoute = require("./routes/paymentRoute");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors({
    origin:"*",
    methods:["PATCH","PUT","POST","GET","DELETE"],
    allowedHeaders:["Content-type","Authorization"]
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.json("Welcome to Abhisek Mern E-commerce API")
})

app.use("/api/v1",userRouter)
app.use("/api/v1",productRouter)
app.use("/api/v1/",orderRoute)
app.use("/api/v1/",blogRoute)
app.use("/api/v1/",commentRoute)
app.use("/api/v1/",paymentRoute)

module.exports = app


