const userRouter = require("./routes/userRoute")
const productRouter = require("./routes/productRoute")
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

app.use("/api/v1",userRouter)
app.use("/api/v1",productRouter)

module.exports = app


