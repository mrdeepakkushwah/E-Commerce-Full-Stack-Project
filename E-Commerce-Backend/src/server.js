const express = require("express");
const mongoose = require("mongoose");
const myRoutes = require("./routes/route");
const cors = require("cors");
const port  = 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", myRoutes);

mongoose
  .connect(
     "mongodb+srv://deepak9109:Deepak%409109@cluster0.4rmqb.mongodb.net/E-Commerce"
  )
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log("DB Not Connected", err));

app.get("/test", (req, res) => {
  res.send("Hello");
});

const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Define storage location

app.post("/signupUser", upload.single("profilePic"), (req, res) => {
  const { fName, lName, email, phoneNo, password, address } = req.body;
  console.log(req.file); // Uploaded file information
  console.log(req.body); // Other form data
  res.status(200).json({ message: "Signup successful!" });
});


app.listen(port, (err) => {
  err ? console.log(err) : console.log(`Server is Running at ${port}`);
});
