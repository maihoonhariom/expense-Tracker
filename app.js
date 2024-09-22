const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({path: "./.env"});
app.use(require("morgan")("combined"));  // morgan

const cookieParser = require("cookie-parser")
const passport = require("passport");
const session = require("express-session");

//base route
const indexRouter = require("./routes/index");
const expenseRouter = require("./routes/expense.route");
const userRouter = require("./routes/user.route");
const UserSchema = require("./models/user.schema")


const expenseDB= require("./config/db")

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//static route 
app.use(express.static(path.join(__dirname, "public")));

//passport and session config
app.use(
    session({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
)
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(UserSchema.serializeUser());
passport.deserializeUser(UserSchema.deserializeUser());




app.use("/", indexRouter);
app.use("/expense", expenseRouter);
app.use("/user", userRouter);



app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on PORT: ${process.env.PORT}`);
    
})