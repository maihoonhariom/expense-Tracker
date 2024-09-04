const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log(`Database is connected`)
}).catch((error)=>{
    console.log(`Error in Database ${error.message}`)
})


