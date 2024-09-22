const express = require("express");
const router = express.Router();
const UserSchema = require("../models/user.schema");
const { isLoggedIn } = require("../middleware/auth.middleware");


const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(UserSchema.authenticate()));

router.get("/signup", async (req, res, next)=>{
    res.render("signupuser",{
        title: "Expense Tracker | Signup",
        user: req.user,
    })
})

router.post("/signup", async (req, res, next)=>{
    try {
        const {username, email, password} = req.body;
        await UserSchema.register({username ,email, password}, password);
        res.redirect("/user/signin");
    } catch (error) {
        next(error);
    }
})


router.get("/signin", async (req, res, next)=>{
    res.render("signinuser",{
        title:"Expense Tracker | Sign in",
        user:req.user
    });    
});

// router.post("/signin", passport.authenticate("local",{
//     successRedirect: "/user/profile",
//     failureRedirect: "/user/signin"
// }),
// (req,res)=>{}
// );/
router.post("/signin", passport.authenticate("local"), async(req,res, next)=>{
    try {
        res.redirect("/user/profile");  
    } catch (error) {
        next(error);
    }
})

router.get("/profile", isLoggedIn, async(req,res,next)=>{
    try {
        res.render("profileuser",{
            title:"Expense Tracker | Profile",
            user: req.user
        });
    } catch (error) {
        next(error);
    }
})

router.get("/signout", isLoggedIn, async (req, res)=>{
    req.logout(()=>{
        res.redirect("/user/signin");
    });
});

module.exports = router;

