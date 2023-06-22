const usercontacts = require("../models/contactModel");
const mongoose = require("mongoose");
//@desc Get all contact
//@route GET /contacts
//@acces public

const getallcontacts = async (req, res) => {
  try {
    const contacts = await usercontacts.find();
    return res.status(200).json(contacts);
  } catch (err) {
    console.log(err.message);
  }
};

//@desc Get single contact
//@route GET /contacts/:id
//@acces public

const getcontact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await usercontacts.findById(id);
    return res.status(200).json(contact);
  } catch (err) {
    console.log(err.message);
  }
};

//@desc Create contact
//@route post /contacts/addcontact
//@acces public

const createcontact = async (req, res) => {
  const { name, email, mobile, city } = req.body;
  if (!name || !email || !mobile || !city) {
    return res.status(400).send("Madatory to fill all details");
  }
  const exist = await usercontacts.findOne({ email });
  if (exist) {
    return res.status(400).send("user already registered");
  }
  const newContact = await new usercontacts({ name, email, mobile, city });
  await newContact.save();
  return res.status(201).send("contact added successfully");
};
//@desc update contact
//@route put /contacts/updatecontact/:id
//@acces public

const updatecontact = async (req, res) => {
  const { id } = req.params;m
  const { name, email, mobile, city } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const updatedUser = await usercontacts.findByIdAndUpdate(
      id,
      { name, email, mobile, city },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
//@desc delete contact
//@route delete /contacts/deletecontact/:id
//@acces public

const deletecontact = async (req, res) => {
  const { id } = req.params;
  try {
    const exist=await usercontacts.findById(id);
    if(!exist){
      return res.status(400).send("user already deleted")
    }
    await usercontacts.findByIdAndDelete(id);
    return res.send("User Deleted");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getallcontacts,
  createcontact,
  updatecontact,
  deletecontact,
  getcontact,
};
