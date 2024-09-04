const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is Required"],
        minLength: [3,"Atleast 3 Character required"],
        maxLength: [40, "Maximum 40 Character"],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        minLength: [3, "Category must be at least 3 characters long"],
        maxLength: [50, "Category must be at most 50 characters long"],
        lowercase: true,
    },
    remark: {
        type: String,
        required: [true, "Remark is required"],
        minLength: [3, "Remark must be at least 3 characters long"],
        maxLength: [100, "Remark must be at most 100 characters long"],
        trim: true,
    },
    paymentmode: {
        type: String,
        required: [true, "Please select a payment mode"],
        enum: ["cash", "upi", "card"],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("expense", expenseSchema);
