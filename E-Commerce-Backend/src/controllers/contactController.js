const ContactModel = require("../models/contactModel");
const {
  isValidName,
  isValidEmail,
  isValidPhone,
  isValid,
} = require("../controllers/validator");
const e = require("express");

const createContact = async (req, res) => {
  try {
    let contactData = req.body;
    if (Object.keys(contactData).length === 0) {
      res.status(400).json({ msg: "Bad Request Data Not Found" });
    }
    const { name, email, phoneNo, message } = contactData;

    // Field validation
    if (!isValid(name))
      return res.status(400).json({ msg: "Name is required" });
    if (!isValidName(name))
      return res.status(400).json({ msg: "Name is Invalid" });

    if (!isValid(email))
      return res.status(400).json({ msg: "Email is required" });
    if (!isValidEmail(email))
      return res.status(400).json({ msg: "Email is Invalid" });
    // le
    // t checkDuplicateEmail = await ContactModel.findOne({ email });
    // let checkDuplicatePhone = await ContactModel.findOne({ phoneNo });
    // if (checkDuplicateEmail || checkDuplicatePhone) {
    //   return res.status(409).json({ msg: "Your Query Already Exists." });
    // }
    if (!isValid(phoneNo))
      return res.status(400).json({ msg: "Phone Number is required" });
    if (!isValidPhone(phoneNo))
      return res.status(400).json({ msg: "Phone Number is Invalid" });

    if (!message) return res.status(400).json({ msg: "Message is required" });

    // Creating new contact
    const newContact = await ContactModel.create({
      name,
      email,
      phoneNo,
      message,
    });

    await newContact.save();

    res.status(201).json({
      msg: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({
      msg: "Something went wrong. Please try again later.",
      error: error.msg,
    });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find();
    console.log("Contacts retrieved successfully.");
    return res
      .status(200)
      .json({ msg: "Contacts retrieved successfully.", contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({
      msg: "Something went wrong while retrieving contacts.",
      error: error.msg,
    });
  }
};

module.exports = { getContacts, createContact };
