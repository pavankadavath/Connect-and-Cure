const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");

const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res.send(user);
  } catch (error) {
    res.status(500).send("Unable to get user");
  }
};

const getallusers = async (req, res) => {
  try {
    const users = await User.find()
      .find({ _id: { $ne: req.locals } })
      .select("-password");
    return res.send(users);
  } catch (error) {
    res.status(500).send("Unable to get all users");
  }
};

const login = async (req, res) => {
  try {
    const emailPresent = await User.findOne({ email: req.body.email });
    if (!emailPresent) {
      return res.status(400).send("Incorrect credentials");
    }
    const verifyPass = await bcrypt.compare(
      req.body.password,
      emailPresent.password
    );
    if (!verifyPass) {
      return res.status(400).send("Incorrect credentials");
    }
    const token = jwt.sign(
      { userId: emailPresent._id, isAdmin: emailPresent.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      }
    );
    return res.status(201).send({ msg: "User logged in successfully", token });
  } catch (error) {
    res.status(500).send("Unable to login user");
  }
};

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, pic } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("h")
    // Check if email already exists
    const emailPresent = await User.findOne({ email });
    if (emailPresent) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Hash the password
    const hashedPass = await bcrypt.hash(password, 10);
    // Create the user
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPass,
      pic: pic || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    });
    if(user){
      console.log("User created successfully:", user);
    }else{
      console.log("User creation failed");
    }
    const result = await user.save();

    if (!result) {
      return res.status(500).json({ message: "Unable to register user" });
    }

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Backend Registration Error:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const updateprofile = async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    // console.log(req.body);
    const result = await User.updateOne(
      { email : req.body.email },
      { ...req.body, password: hashedPass }
    );
    if (!result) {
      return res.status(500).send("Unable to update user");
    }
    return res.status(201).send("User updated successfully");
  } catch (error) {
    res.status(500).send("Unable to update user");
  }
};

const deleteuser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.body.userId);
    const removeDoc = await Doctor.findOneAndDelete({
      userId: req.body.userId,
    });
    const removeAppoint = await Appointment.findOneAndDelete({
      userId: req.body.userId,
    });
    return res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Unable to delete user");
  }
};

module.exports = {
  getuser,
  getallusers,
  login,
  register,
  updateprofile,
  deleteuser,
};
