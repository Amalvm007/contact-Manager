// import express 
const express =require('express')

// inmport dataService
const dataService = require('./services/dataService')


// import the cors
const cors = require('cors')

// import jsonwebtoken
const jwt = require('jsonwebtoken')

// server call
const server =express()

// use cors to define the orgin
server.use(cors({
    origin:'http://localhost:4200'
}))

// to parse the json data
server.use(express.json())

// set port for backend
server.listen(3000,()=>{
    console.log('server in running at 3000');
})

// application specific middleware
const appMiddleWare=(req,res,next)=>{
    console.log('inside application specific middleware');
    next()

}
server.use(appMiddleWare)

// token verify
const jwtMiddleWare =(req,res,next)=>{
    console.log('inside router specific middleware');
    const token = req.headers['token']
    try{
        // verify token
        const data =jwt.verify(token,'amal123')
        console.log(data);
        // acnt take from jwt middleware
        req.fromAcno = data.currentAcno
        console.log('vaild token');
        next()
    }catch{
        console.log('invaild token');
        res.status(401).json({
            message:'please Login'
        })
    }
}

// bankapp front end api call for register
server.post('/register',(req,res)=>{
    console.log('inside the register function');
    console.log(req.body);
    dataService.register(req.body.name,req.body.acno,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)

    })

})


// bankapp front end api call for login
server.post('/login',(req,res)=>{
    console.log('inside the login function');
    console.log(req.body);
    dataService.login(req.body.acno,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)

    })

})

// api call for getBalance
server.get('/getBalance/:anco',jwtMiddleWare,(req,res)=>{
    console.log('inside the getBalance function');
    console.log(req.params.anco);
    // asynchronus
    dataService.getBalance(req.params.anco)
    .then((result)=>{
        res.status(result.statusCode).json(result)

    })

})

// api call for deposit
server.post('/deposit',jwtMiddleWare,(req,res)=>{
    console.log('inside the deposit function');
    console.log(req.body);
    dataService.deposit(req.body.acno,req.body.amount)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// api call for fundTransfer
server.post('/fundTransfer',jwtMiddleWare,(req,res)=>{
    console.log('inside the fundTransfer function');
    console.log(req.body);
    dataService.fundTransfer(req,req.body.toAcno,req.body.pswd,req.body.amount)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// api call getAllTransactions
server.get('/all-transaction',jwtMiddleWare,(req,res)=>{
    console.log('inside the alltransactions function');
    dataService.getAllTransactions(req)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })

})

// api call for delete-account
server.delete('/delete-account/:anco',jwtMiddleWare,(req,res)=>{
    console.log('inside the delete-account function');
    console.log(req.params.anco);
    // asynchronus
    dataService.deleteMyAccount(req.params.anco)
    .then((result)=>{
        res.status(result.statusCode).json(result)

    })

})



