// import db in dataservice
const db =require('./db')

// import jsonwebtoken
const jwt = require('jsonwebtoken')


// Register ( in node arrow fn are useds)
const register=(name,acno,pswd)=>{

    // check acno in mongodb - db.users.findone()
    return db.User.findOne({
        acno
    }).then((result)=>{
        console.log(result);
        if(result){
            // acno alredy axist
            return {
                statusCode:403,
                message:'Account already exist'
            }
        }
        else{
            // to add new user
            const newUser = new db.User({
                  username:name,
                    acno,
                    password:pswd,
                    balance:0,
                    transaction:[]
                

            })

            // to save new user in mongoDb 
            newUser.save()

            return{
                statusCode:200,
                message:'Registraction Successfull.....!!!'
            }
        }

    })

}

// login function

const login=(acno,pswd)=>{
    console.log('inside login function');
    // check acno and pswd in mongodb
    return db.User.findOne({
        acno,
        password:pswd
    }).then(
        (result)=>{
            if(result){
                // generate token
                const token = jwt.sign({
                    currentAcno:acno
                },'amal123')
                return{
                    statusCode:200,
                    message:'Login Successfull.....!!!',
                    username:result.username,
                    currentAcno:acno,
                    token
                }
            }
            else{
                return{
                    statusCode:404,
                    message:' Invaild  Account or Password'
                }

            }
        }
    )

}

// getBalance function

const getBalance=(acno)=>{
    console.log('inside getBalance function');

    return db.User.findOne({
        acno
    }).then(
        (result)=>{
            if(result)
            return{
                statusCode:200,
                Balance:result.balance 

            }
            else{
                return{
                    statusCode:404,
                    message:' Invaild  Account or Password'
                } 
            }
        }
    )

}
// deposit
const deposit=(acno,amt)=>{
    let amount = Number(amt)
    return db.User.findOne({
        acno
    }).then((result)=>{
        if(result){
            // if acno is present
            result.balance += amount
            // store transactions
            result.transaction.push({
                type:"CREDIT",
                fromAcno:acno,
                toAcno:acno,
                amount
            })
            // save in mongoDB 
            result.save()
            return {
                statusCode:200,
                message:`${amount} Successfully Deposited....`
            }
        }else{
            return{
                statusCode:404,
                message:' Invaild  Amount'
            }
        }
    })

}
// fund transfer 
const fundTransfer=(req,toAcno,pswd,amt)=>{
    let amount = Number(amt)
    let fromAcno = req.fromAcno
    return db.User.findOne({
        acno:fromAcno,
        password:pswd
    }).then((result)=>{
        console.log(result);
        if(result){
            // debit details
            let fromAcnoBalance = result.balance
            if(fromAcnoBalance>=amount){
                result.balance=fromAcnoBalance-amount
                // credit details
                return db.User.findOne({
                    acno:toAcno
                }).then((creditdata)=>{
                    // check fromacno and toanco  are same
                    if(fromAcno==toAcno){
                        return{
                            statusCode:401,
                            message:"Permission dined due to own fund transfer"
                        } 
                    }
                    console.log(creditdata);
                    if(creditdata){
                        creditdata.balance+=amount
                        creditdata.transaction.push({
                         type:"CREDIT",
                         fromAcno,
                         toAcno,
                         amount  
                        })
                        creditdata.save();
                        result.transaction.push({
                        type:"DEBIT",
                        fromAcno,
                        toAcno,
                        amount 
                        })
                        result.save();
                        return{
                            statusCode:200,
                            message:"Amount Transfer Successfully"
                        }

                    }else{
                        return{
                            statusCode:401,
                            message:"Invaild Credit Account Number"
                        }
                    }
                })
            }else{
                return{
                    statusCode:403,
                    message:"Insufficient balance"
                }
            }


        }
        else{
            return{
                statusCode:401,
                message:"Invaild Debit Account Number / Password"
            }
        }
    })

}
// getAllTransactions
const getAllTransactions=(req)=>{
    let acno=req.fromAcno
    return db.User.findOne({
        acno
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                transaction:result.transaction
            }

        }else{
            return{
                statusCode:401,
                message:"Invaild Account Number"
            }
        }
    })

}

// delete account
const deleteMyAccount=(acno)=>{
    return db.User.deleteOne({
        acno
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                message:"Account Deleted Successfully"
            }
        }
        else{
            return{
                statusCode:401,
                message:"Invaild Account Number"
            }

        }
    })
}


// export
module.exports={
    register,
    login,
    getBalance,
    deposit,
    fundTransfer,
    getAllTransactions,
    deleteMyAccount

    
}