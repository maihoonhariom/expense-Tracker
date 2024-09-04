const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({path: "./.env"});
app.use(require("morgan")("combined"));  // morgan

const expenseDB= require("./config/db")

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const indexRouter = require("./routes/index");


app.use("/", indexRouter);


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on PORT: ${process.env.PORT}`);
    
})