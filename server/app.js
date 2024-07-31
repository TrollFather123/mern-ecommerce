const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors({
    origin:"*",
    methods:["PATCH","PUT","POST","GET","DELETE"],
    allowedHeaders:["Content-type","Authorization"]
}));
app.use(express.json());


module.exports = app


