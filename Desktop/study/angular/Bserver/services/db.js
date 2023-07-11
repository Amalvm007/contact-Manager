// import mongoose in db.js
const mongoose = require('mongoose')

// define connection string 
mongoose.connect('mongodb://localhost:27017/bank',()=>{
    console.log('mongodb connected');
})

// create model for the project
// colloection -users

const User = mongoose.model('User',{
    username:String,
    acno:Number,
    password:String,
    balance:Number,
    transaction:[]

})

// export model
module.exports={
  User
}