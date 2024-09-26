const express = require("express")


const cors = require("cors")
const { default: mongoose } = require("mongoose")
const app = express()

const DelManagerModel = require('./models/delManagerModel')
const DelPersonModel = require('./models/delPersonModel')
const delReportModel = require("./models/delReportModel")

app.use(express.json())
app.use(cors())

//DeliveryManager
app.post('/register', (req, res) => {
    DelManagerModel.create(req.body)
    .then(delManager => res.json(delManager))
    .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    DelManagerModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("Incorrect Password")
            }
        } else {
            res.json("No record available")
        }
    })

})

//DeliveryPerson
app.post('/delPersonRegister', (req, res) => {
    DelPersonModel.create(req.body)
    .then(delPerson => res.json(delPerson))
    .catch(err => res.json(err))
})

app.post('/delPersonLogin', (req, res) => {
    const {email, password} = req.body;
    DelPersonModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("Incorrect Password")
            }
        } else {
            res.json("No record available")
        }
    })

})

//Reporting ---> Delivery Person
app.post('/addReport',(req,res) => {
    delReportModel.create(req.body)
    .then(delIssue => res.json(delIssue))
    .catch(err => res.json(err))
})

app.get('/readReport', (req,res) => {
    delReportModel.find()
    .then(delIssue => res.json(delIssue))
    .catch(err => res.json(err))
})



//DB Connection
const PORT=process.env.PORT||8020

mongoose.connect("mongodb+srv://chirath:1234@cluster0.794yb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  
    console.log(`port number => ${PORT}`)

}).catch((err)=>{
    console.log(err)
})


app.listen(PORT, () => {
    console.log("Server is running!!")
})