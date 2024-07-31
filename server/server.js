const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config({path:"./config.env"});


const PORT = process.env.PORT || 6000;
const DB = process.env.MONGO_DATABASE;

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})

mongoose.connect(DB).then(() => {
    console.log("Connected to the database successfully");
}).catch((err) => {
    console.error("Database connection error:", err);
});