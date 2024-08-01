const userRouter = require("./routes/userRoute")
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({
    origin:"*",
    methods:["PATCH","PUT","POST","GET","DELETE"],
    allowedHeaders:["Content-type","Authorization"]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1",userRouter)

module.exports = app


