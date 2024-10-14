const express = require("express");
require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();

const DelManagerModel = require("./models/delManagerModel");
const DelPersonModel = require("./models/delPersonModel");
const ItemDataModel = require("./models/sup_mg_model/mg_model");
const delReportModel = require("./models/delReportModel");
const OderDataModel = require("./models/order_mg_model/order_mg_model");
const UserModel = require("./models/user_mg_model/User_mg_model");
const SurManagerModel = require("./models/sur_mg_model/surManagerModel");
const SurveyansModel = require("./models/sur_mg_model/answerModel");
const QuationModel = require("./models/sur_mg_model/SurveyModel");
const FeedbackModel = require("./models/feedback_mg_model/feedMgModel");
const CustomerModel = require("./models/customer_model/customerModel");
const delModel = require("./models/delivery_model/delivery_model");
const SupManagerModel = require("./models/sup_mg_model/mg_Log_Model");
const OderCardDataModel = require("./models/order_mg_model/card_detail_model");
const AnswerModel = require("./models/sur_mg_model/answerModel");
app.use(express.json());
app.use(cors());

//Creating token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
//supplier login.................................
app.post("/SupRegister", (req, res) => {
  SupManagerModel.create(req.body)
    .then((supManager) => {
      res.json({ supManager });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({
        error: "Failed to create the Supplier manager",
        details: err.message,
      });
    });
});

app.post("/supLogin", (req, res) => {
  const { email, password } = req.body;

  SupManagerModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          // Send user data in the response without a token
          res.json({
            message: "Success",
            user: {
              id: user._id,
              username: user.name, // Include the username here
              email: user.email,
            },
          });
        } else {
          res.status(401).json({ error: "Incorrect Password" }); // Use status codes for errors
        }
      } else {
        res.status(404).json({ error: "No record available" }); // Use status codes for errors
      }
    })
    .catch((err) => {
      console.error(err); // Log the error
      res.status(500).json({ error: "Internal server error" }); // Handle unexpected errors
    });
});

//DeliveryManager crud section ...................................................................
app.post("/register", (req, res) => {
  DelManagerModel.create(req.body)
    .then((delManager) => {
      const token = createToken(delManager._id);
      res.json({ delManager, token });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({
        error: "Failed to create the delivery manager",
        details: err.message,
      });
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  DelManagerModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const token = createToken(user._id);

          // Send user data in the response
          res.json({
            message: "Success",
            user: {
              id: user._id,
              username: user.name, // Include the username here
              email: user.email,
              token: token, // Optionally include a token if you use it for authentication
            },
          });
        } else {
          res.status(401).json({ error: "Incorrect Password" }); // Use status codes for errors
        }
      } else {
        res.status(404).json({ error: "No record available" }); // Use status codes for errors
      }
    })
    .catch((err) => {
      console.error(err); // Log the error
      res.status(500).json({ error: "Internal server error" }); // Handle unexpected errors
    });
});

//DeliveryPerson
app.post("/delPersonRegister", (req, res) => {
  DelPersonModel.create(req.body)
    .then((delPerson) => {
      const token = createToken(delPerson._id);
      res.json({ delPerson, token });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({
        error: "Failed to create the delivery person",
        details: err.message,
      });
    });
});

app.post("/delPersonLogin", (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  DelPersonModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        // Check if the password matches
        if (user.password === password) {
          const token = createToken(user._id); // Create token if you use it for authentication

          // Send user data in the response
          res.json({
            message: "Success",
            user: {
              id: user._id,
              username: user.name, // Include the username here
              email: user.email,
              token: token, // Include a token if you use it for authentication
            },
          });
        } else {
          res.status(401).json({ message: "Incorrect Password" }); // Send 401 Unauthorized
        }
      } else {
        res.status(404).json({ message: "No record available" }); // Send 404 Not Found
      }
    })
    .catch((err) => {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Internal Server Error" }); // Send 500 Internal Server Error
    });
});

//Read Orders
app.get("/readDel", (req, res) => {
  OderDataModel.find()
    .then((dels) => res.json(dels))
    .catch((err) => res.json(err));
});

app.put("/delUpdate/:id", (req, res) => {
  const id = req.params.id;

  OderDataModel.findByIdAndUpdate(
    id,
    {
      delivery_status: req.body.delivery_status,
    },
    { new: true }
  )
    .then((updatedDelivery) => {
      if (!updatedDelivery) {
        return res.status(404).json({ message: "Deliver not found" });
      }
      res.json(updatedDelivery);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

//Read DeliveryPerson
app.get("/readDelPerson", (req, res) => {
  DelPersonModel.find()
    .then((delPerson) => res.json(delPerson))
    .catch((err) => res.json(err));
});

//Deliver
//Add Delivery
app.post("/addDelivery", (req, res) => {
  delModel
    .create(req.body)
    .then((delivery) => res.json(delivery))
    .catch((err) => res.json(err));
});

//Read Deliveries
app.get("/readDeliveries", (req, res) => {
  delModel
    .find()
    .then((delivery) => res.json(delivery))
    .catch((err) => res.json(err));
});

//update Assign Delivery
app.put("/updateDelivery/:deliveryId", (req, res) => {
  const id = req.params.deliveryId;

  delModel
    .findByIdAndUpdate(
      id,
      {
        delivery_status: req.body.delivery_status,
      },
      { new: true }
    )
    .then((updatedReport) => {
      if (!updatedReport) {
        return res.status(404).json({ message: "Delivery not found" });
      }
      res.json(updatedReport);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

//Delete Asigned Deliveries
app.delete("/delDelete/:id", (req, res) => {
  const id = req.params.id;

  delModel
    .findByIdAndDelete(id)
    .then((deletedDel) => {
      if (!deletedDel) {
        return res.status(404).json({ message: "Delivery not found" });
      }
      res.json({ message: "Delivery deleted successfully" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

//Delete Incoming Deliveries
app.delete("/incomingDelDelete/:id", (req, res) => {
  const id = req.params.id;

  OderDataModel.findByIdAndDelete(id)
    .then((deletedDel) => {
      if (!deletedDel) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json({ message: "Report deleted successfully" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

//Reporting ---> Delivery Person
//Add Report
app.post("/addReport", (req, res) => {
  delReportModel
    .create(req.body)
    .then((delIssue) => res.json(delIssue))
    .catch((err) => res.json(err));
});

//Read Report
app.get("/readReport", (req, res) => {
  delReportModel
    .find()
    .then((delIssue) => res.json(delIssue))
    .catch((err) => res.json(err));
});

//Update Report
app.put("/delReportupdate/:id", (req, res) => {
  const id = req.params.id;

  delReportModel
    .findByIdAndUpdate(
      id,
      {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        issue: req.body.issue,
        status: req.body.status,
      },
      { new: true }
    )
    .then((updatedReport) => {
      if (!updatedReport) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json(updatedReport);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

//Get Items for id
app.get("/getDelReport/:id", (req, res) => {
  const id = req.params.id;
  delReportModel
    .findById({ _id: id })
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

//Delete Report
app.delete("/delReportDelete/:id", (req, res) => {
  const id = req.params.id;

  delReportModel
    .findByIdAndDelete(id)
    .then((deletedReport) => {
      if (!deletedReport) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json({ message: "Report deleted successfully" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});
// supplier manager crud section ...................................................................
app.get("/supplierReport", (req, res) => {
  ItemDataModel.find({})
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

app.get("/supplierinv", (req, res) => {
  ItemDataModel.find({})
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

app.get("/home_inventory_view", (req, res) => {
  ItemDataModel.find({})
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

app.get("/home_add_cart", (req, res) => {
  ItemDataModel.find({})
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

app.get("/get_order_dash", (req, res) => {
  OderDataModel.find({})
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

app.get("/get_order_card", (req, res) => {
  OderCardDataModel.find({})
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

app.post("/add_order_card", (req, res) => {
  OderCardDataModel.create(req.body)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.delete("/delete_order_card/:id", (req, res) => {
  const id = req.params.id;
  OderCardDataModel.findOneAndDelete({ _id: id })
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

app.get("/get_card_d/:id", (req, res) => {
  const id = req.params.id;
  OderCardDataModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/card_update/:id", (req, res) => {
  const id = req.params.id;
  OderCardDataModel.findByIdAndUpdate(
    { _id: id },
    {
      card_holder_name: req.body.card_holder_name,
      card_holder_no: req.body.card_holder_no,
      card_date: req.body.card_date,
      card_cvv: req.body.card_cvv,
    }
  )
    .then((items) => res.json(items))
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

app.delete("/delete_order/:id", (req, res) => {
  const id = req.params.id;
  OderDataModel.findOneAndDelete({ _id: id })
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

//add methord
app.post("/item_create", (req, res) => {
  ItemDataModel.create(req.body)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/add_order", (req, res) => {
  console.log("Request Body:", req.body); // Log the request body
  OderDataModel.create(req.body)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

// app.post("/add_order", (req, res) => {
//   console.log("Request Body:", req.body); // Log the request body
//   OderCardDataModel.create(req.body)
//     .then((item) => res.json(item))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// //count methord
// app.get("/count", async (req, res) => {
//   try {
//     const itemCount = await ItemModel.countDocuments();
//     res.status(200).json({ count: itemCount });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to get the count" });
//   }
// });

//usermanager section..................................................................
app.get("/user_dash", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/get_user", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/user_update/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      address: req.body.address,
      contact_no: req.body.contact_no,
      user_type: req.body.user_type,
    }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findOneAndDelete({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

//Feedback Section.......................................................................
app.post("/addFeedback", (req, res) => {
  FeedbackModel.create(req.body)
    .then((feedback) => res.json(feedback))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/get_feedback", (req, res) => {
  FeedbackModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/get_feedbackToAdmin", (req, res) => {
  FeedbackModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/get_feedbacks/:id", (req, res) => {
  const id = req.params.id;
  FeedbackModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/delete_feedback/:id", (req, res) => {
  const id = req.params.id;
  FeedbackModel.findOneAndDelete({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/feedback_update/:id", (req, res) => {
  const id = req.params.id;
  FeedbackModel.findByIdAndUpdate(
    { _id: id },
    {
      fed_full_name: req.body.fed_full_name,
      fed_item_name: req.body.fed_item_name,
      fed_item_id: req.body.fed_item_id,
      fed_rating: req.body.fed_rating,
      fed_feedback: req.body.fed_feedback,
    }
  )
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

//..end of feedback ......................................................................................

app.post("/createUser", (req, res) => {
  console.log(req.body); // Log the request body
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

/*--------Survey Manager*/
app.post("/surlogin", (req, res) => {
  const { email, password } = req.body;
  SurManagerModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const token = createToken(user._id);

          // Send user data in the response
          res.json({
            message: "Success",
            user: {
              id: user._id,
              username: user.name, // Include the username here
              email: user.email,
              token: token, // Optionally include a token if you use it for authentication
            },
          });
        } else {
          res.status(401).json({ error: "Incorrect Password" }); // Use status codes for errors
        }
      } else {
        res.status(404).json({ error: "No record available" }); // Use status codes for errors
      }
    })
    .catch((err) => {
      console.error(err); // Log the error
      res.status(500).json({ error: "Internal server error" }); // Handle unexpected errors
    });
});

app.post("/submitSurveyAnswers", async (req, res) => {
  const { surveyId, username, email, answers } = req.body;

  try {
    // Log the submission or save it to the database
    console.log("Received answers:", { surveyId, username, email, answers });

    // Respond with success
    res.status(200).json({ message: "Answers submitted successfully!" });
  } catch (error) {
    console.error("Error submitting answers:", error);
    res.status(500).json({ message: "Error submitting answers", error });
  }
});

app.post("/surManregister", (req, res) => {
  SurManagerModel.create(req.body)
    .then((surManager) => {
      const token = createToken(surManager._id);
      res.json({ surManager, token });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({
        error: "Failed to create the surManager",
        details: err.message,
      });
    });
});

//Surveyqns Crud ....................................

app.post("/addqns", (req, res) => {
  console.log(req.body);
  QuationModel.create(req.body)
    .then((survey) => res.json(survey))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/getqns", (req, res) => {
  QuationModel.find()
    .then((surveys) => res.json(surveys))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/getqnstoHome", (req, res) => {
  QuationModel.find()
    .then((surveys) => res.json(surveys))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/getqnstoHome", (req, res) => {
  AnswerModel.find()
    .then((surveys) => res.json(surveys))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/getqnstoHome/:id", (req, res) => {
  const id = req.params.id;
  QuationModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

//submit survey
app.post("/submitSurvey/:id", async (req, res) => {
  const surveyId = req.params.id;
  const { cus_email, Q1ans, Q2ans, Q3ans, Q4ans, Q5ans } = req.body;

  try {
    const surveyAnswer = new SurveyansModel({
      sur_id: surveyId,
      cus_email,
      Q1ans,
      Q2ans,
      Q3ans,
      Q4ans,
      Q5ans,
    });

    await surveyAnswer.save();

    res.status(201).json({ message: "Survey submitted successfully" });
  } catch (error) {
    console.error("Error submitting survey:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.get("/view_quations/:id", (req, res) => {
  const id = req.params.id;
  QuationModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/get_quations/:id", (req, res) => {
  const id = req.params.id;
  QuationModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/delete_serveyss/:id", (req, res) => {
  const id = req.params.id;
  QuationModel.findOneAndDelete({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/survey_update/:id", (req, res) => {
  const id = req.params.id;
  QuationModel.findByIdAndUpdate(
    { _id: id },
    {
      title: req.body.title,
      Q1: req.body.Q1,
      Q2: req.body.Q2,
      Q3: req.body.Q3,
      Q5: req.body.Q5,
    }
  )
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});
//...........................................................

// app.post("/addSurvey", (req, res) => {
//   console.log(req.body);
//   SurveyModel.create(req.body)
//     .then((survey) => res.json(survey))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// app.get("/getSurveys", (req, res) => {
//   SurveyModel.find()
//     .then((surveys) => res.json(surveys))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// app.get("/getToHomeSurveys", (req, res) => {
//   SurveyModel.find()
//     .then((surveys) => res.json(surveys))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// app.get("/getToHomeSurveysToView/:id", (req, res) => {
//   const { id } = req.params; // Get the ID from the request parameters
//   SurveyModel.findById(id) // Use findById to get the specific survey
//     .then((survey) => {
//       if (!survey) {
//         return res.status(404).json("Survey not found");
//       }
//       res.json(survey);
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// app.get("/getSurveys/:id", (req, res) => {
//   const { id } = req.params; // Get the ID from the request parameters
//   SurveyModel.findById(id) // Use findById to get the specific survey
//     .then((survey) => {
//       if (!survey) {
//         return res.status(404).json("Survey not found");
//       }
//       res.json(survey);
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// app.delete("/surveys/:id", (req, res) => {
//   SurveyModel.findByIdAndDelete(req.params.id)
//     .then(() => res.json("Survey deleted."))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// app.put("/updateSurvey/:id", (req, res) => {
//   SurveyModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then((updatedSurvey) => res.json(updatedSurvey))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

//Customer
app.post("/customerLogin", (req, res) => {
  const { email, password } = req.body;
  CustomerModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const token = createToken(user._id);

          // Send user data in the response
          res.json({
            message: "Success",
            user: {
              id: user._id,
              username: user.name,
              address: user.address,
              email: user.email,
              token: token,
            },
          });
        } else {
          res.status(401).json({ error: "Incorrect Password" }); // Use status codes for errors
        }
      } else {
        res.status(404).json({ error: "No record available" }); // Use status codes for errors
      }
    })
    .catch((err) => {
      console.error(err); // Log the error
      res.status(500).json({ error: "Internal server error" }); // Handle unexpected errors
    });
});

//register
app.post("/customerRegister", (req, res) => {
  CustomerModel.create(req.body)
    .then((customer) => {
      const token = createToken(customer._id);
      res.json({ customer, token });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({
        error: "Failed to create an account",
        details: err.message,
      });
    });
});

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
