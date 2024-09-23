const express = require("express")


const cors = require("cors")
const { default: mongoose } = require("mongoose")
const app = express()

const DelManagerModel = require('./models/delManagerModel')

app.use(express.json())
app.use(cors())


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