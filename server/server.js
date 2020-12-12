const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require("mongoose")
const nameModel = require("./budget_schema")

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


let url = 'mongodb://localhost:27017/mongodb_demo';

app.use('', express.static('public'));
app.use(cors());


//Part2: step2 Required to implement an additional endpoint in your server.

//Part2: step4 You are required to use mongoose to interact with your database.
mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true } )
        .then(()=>{
            console.log("Connected to the database")


            app.get('/budget', (req, res) => {
                nameModel.find({})
                .then((data)=>{
                    console.log(data)
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((connectionError)=>{
                     console.log(connectionError)
                })
            }) 
            
            //Part2 step3 : add documents api required to test it using Postman.
            app.post('/add-budget', (req, res) => {
                 console.log(req.body);
                //  res.send("added successfully");

                 let newData = {id: req.body.id, title: req.body.title, budget: req.body.budget, color: req.body.color}
                 nameModel.insertMany(newData)
                          .then((data)=>{
                              console.log(data)
                              res.send(newData)
                              mongoose.connection.close();
                          })
                          .catch((connectionError)=>{
                               console.log(connectionError)
                          })
            }) 
            
            
            
            app.listen(port, () => {
                console.log(` API served at http://localhost:${port}`);
            });


        })
        .catch((connectionError)=>{
            console.log(connectionError)
        })

