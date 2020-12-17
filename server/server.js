const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require("mongoose")
const nameModel = require("./budget_schema")
const userModel = require('./user_schema')

const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


let url = 'mongodb://localhost:27017/mongodb_demo';

app.use('', express.static('public'));
app.use(cors());


const secretKey = 'My super secret key';
const jwtMW = exjwt({
    secret: secretKey,
    algorithms: ['HS256']
});


let users = [
    {
        id:1,
        username:'Gayatri',
        password: 'vaka123'
    },
    {
        id:2,
        username: 'Vaka',
        password: '456'
    }
]

//Part2: step2 Required to implement an additional endpoint in your server.

//Part2: step4 You are required to use mongoose to interact with your database.
mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )

app.get('/budget', (req, res) => {
    nameModel.find({})
    .then((data)=>{
        res.send(data);
        // mongoose.connection.close();
    })
    .catch((connectionError)=>{
            console.log(connectionError)
    })
});

app.post('/add-budget', (req, res) => {
    console.log(req.body);
   //  res.send("added successfully");

    let newData = {id: req.body.id, title: req.body.title, budget: req.body.budget, color: req.body.color}
    nameModel.insertMany(newData)
             .then((data)=>{
                 console.log(data)
                 res.send(newData)
               //   mongoose.connection.close();
             })
             .catch((connectionError)=>{
                  console.log(connectionError)
             })
}) 


app.post('/register', async (req, res) => {
    console.log(req.body);
    let newUser = {username: req.body.username, password: req.body.password, email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName}
    userModel.insertMany(newUser)
             .then((data)=>{
                 console.log(data)
                 res.send(newUser)
               //   mongoose.connection.close();
             })
             .catch((connectionError)=>{
                  console.log(connectionError)
             })
  });



  app.post('/api/login',(req,res)=>{
      console.log(req.body);
    const {username,password} = req.body;

    userModel.find({})
    .then((data)=>{
        console.log(data);
        const user = data.find(u => u.username === username && u.password === password);
        console.log(user);
        if (user === undefined) {
            res.json({
                success:false,
                token:null,
                err: 'Username or Password is incorrect, please try again!'
            });
        } else{
    const token = jwt.sign({username: user.username}, secretKey, { expiresIn: '7d' });
    console.log(token);
    res.json({
        success: true,
        err:null,
        token
    });
}
        // mongoose.connection.close();
    })
    .catch((connectionError)=>{
            console.log(connectionError)
    })
    // const user = users.find(u => u.username === username && u.password === password);
    
    
}); 


app.listen(port, () => {
   console.log(` API served at http://localhost:${port}`);
});