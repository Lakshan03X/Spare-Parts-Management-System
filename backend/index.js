const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const DelManagerModel = require("./models/delManagerModel");
const DelPersonModel = require("./models/delPersonModel");
const ItemDataModel = require("./models/sup_mg_model/mg_model");
const delReportModel = require("./models/delReportModel");

app.use(express.json());
app.use(cors());

//DeliveryManager crud section ...................................................................
app.post("/register", (req, res) => {
  DelManagerModel.create(req.body)
    .then((delManager) => res.json(delManager))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  DelManagerModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Incorrect Password");
      }
    } else {
      res.json("No record available");
    }
  });
});

//DeliveryPerson
app.post("/delPersonRegister", (req, res) => {
  DelPersonModel.create(req.body)
    .then((delPerson) => res.json(delPerson))
    .catch((err) => res.json(err));
});

app.post("/delPersonLogin", (req, res) => {
  const { email, password } = req.body;
  DelPersonModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Incorrect Password");
      }
    } else {
      res.json("No record available");
    }
  });
});

// supplier manager crud section ...................................................................
app.get("/supplierReport", (req, res) => {
  ItemDataModel.find({})
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

//Reporting ---> Delivery Person
app.post("/addReport", (req, res) => {
  delReportModel
    .create(req.body)
    .then((delIssue) => res.json(delIssue))
    .catch((err) => res.json(err));
});

app.get("/readReport", (req, res) => {
  delReportModel
    .find()
    .then((delIssue) => res.json(delIssue))
    .catch((err) => res.json(err));
});

app.get("/view_item", (req, res) => {
  ItemDataModel.find({})
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

// getting id for each datas
app.get("/get_item/:id", (req, res) => {
  const id = req.params.id;
  ItemDataModel.findById({ _id: id })
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

//update methord
app.put("/item_update/:id", (req, res) => {
  const id = req.params.id;
  ItemDataModel.findByIdAndUpdate(
    { _id: id },
    {
      item_name: req.body.item_name,
      item_quantity: req.body.item_quantity,
      item_model: req.body.item_model,
      item_price: req.body.item_price,
      item_weight: req.body.item_weight,
      supplier_id: req.body.supplier_id,
      supplier_company: req.body.supplier_company,
      item_description: req.body.item_description,
    }
  )
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

//delete methord
app.delete("/delete_item/:id", (req, res) => {
  const id = req.params.id;
  ItemDataModel.findOneAndDelete({ _id: id })
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

//add methord
app.post("/item_create", (req, res) => {
  ItemDataModel.create(req.body)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

// //count methord
// app.get("/count", async (req, res) => {
//   try {
//     const itemCount = await ItemModel.countDocuments();
//     res.status(200).json({ count: itemCount });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to get the count" });
//   }
// });

//DB Connection ...................................................................
const PORT = process.env.PORT || 8020;

mongoose
  .connect(
    "mongodb+srv://chirath:1234@cluster0.794yb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log(`port number => ${PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log("Server is running!!");
});
