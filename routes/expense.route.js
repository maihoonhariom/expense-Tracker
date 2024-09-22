const express = require("express");
const router = express.Router();
const {isLoggedIn}=require("../middleware/auth.middleware");
const expenseSchema = require("../models/expense.schema");

router.get("/create-expense",isLoggedIn , (req,res,next)=>{
    res.render("createexpense", {
        title: "Expense Tracker | Create Expense",
        user:req.user,
    });
});

router.post("/expense-save",isLoggedIn , async (req,res,next)=>{
    try{
        const expense = new expenseSchema(req.body);
        await expense.save();
        res.redirect("/");
    }
    catch (error) {
        console.log(`Error in /expense-save ${error.message}`);   
}})

router.get("/expense-show",isLoggedIn , async (req,res,next)=>{
    try {
        const expenses = await expenseSchema.find();
        res.render("showexpense", {
            expenses:expenses,
            title: "Expense Tracker | Show Expense",
            user:req.user
        })
    } catch (error) {
        console.log(`Error in /expense-show ${error.message}`);
    }
})

router.get("/details/:id",isLoggedIn , async(req,res,next)=>{
        try {
            const expense = await expenseSchema.findById(req.params.id);
            res.render("showexpensedetails",{
                title: "Expense Tracker | Expense Details",
                expense:expense,
                user: req.user
            });
        } catch (error) {
            next(error);
        }
})

router.get("/delete/:id",isLoggedIn , async (req,res,next)=>{
    try {
       await expenseSchema.findByIdAndDelete(req.params.id);
       res.redirect("/expense/expense-show");
    } catch (error) {
        next(error);
    }
})


//edit expense
router.get("/update/:id",isLoggedIn , async (req, res, next)=>{
    try {
        const edit = await expenseSchema.findById(req.params.id)
        res.render("editexpense", {
            title: "Expense Tracker | Expense Edit",
            detail: edit,
            user:req.user
        })
    } catch (error) {
        next(error);
    }
})

router.post("/update/:id",isLoggedIn , async (req,res, next)=>{
    try{
        await expenseSchema.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/expense/details/"+ req.params.id);
    }catch(error){
        next(error);
    }

})


module.exports = router;