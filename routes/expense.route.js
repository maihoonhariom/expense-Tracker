const express = require("express");
const router = express.Router();

const expenseSchema = require("../models/expense.schema");

router.get("/create-expense", (req,res,next)=>{
    res.render("createexpense", {
        title: "Expense Tracker | Create Expense"
    });
})

router.post("/expense-save", async (req,res,next)=>{
    try{
        const expense = new expenseSchema(req.body);
        await expense.save();
    }
    catch (error) {
        console.log(`Error in /expense-save ${error.message}`);   
}})

router.get("/expense-show", async (req,res,next)=>{
    try {
        const expenses = await expenseSchema.find();
        res.render("showexpense", {
            expenses:expenses,
            title: "Expense Tracker | Show Expense"
        })
    } catch (error) {
        console.log(`Error in /expense-show ${error.message}`);
    }
})
module.exports = router;