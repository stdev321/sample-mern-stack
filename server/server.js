import 'dotenv/config';
import express, { json } from "express";
import packges from 'mongoose';
import cors from "cors";
import pkg from 'bcryptjs';
import jwtpkg from 'jsonwebtoken';

const { hashSync, compare } = pkg;
const { connect, connection, Schema, model } = packges;
const { sign } = jwtpkg;

const PORT = 5000;
const app = express();


// Corrected MongoDB connection string
const MONGB_UR = process.env.MONGB_UR;
const jwtSecretKey =  "hiThisISMyToken"
// Middleware
app.use(cors());
app.use(json());

// Connect to MongoDB with options
connect(MONGB_UR, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = connection;
db.on("error", (err) => {
  console.error("Mongodb connection error", err);
});
db.once("open", () => {
  console.log("Mongodb is connected");
});

// User Schema and Model
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  gender: String,
  age: Number,
  phone: String,
  address: String,
  bio: String,
  occupation: String
});

const User = model("User", userSchema);

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hasspassword = await hashSync(req.body.password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hasspassword,
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Include all fields in the token payload
    const token = sign(
      { 
        id: savedUser._id, 
        name: savedUser.name,
        email: savedUser.email,
        gender: savedUser.gender,
        age: savedUser.age,
        phone: savedUser.phone,
        address: savedUser.address,
        bio: savedUser.bio,
        occupation: savedUser.occupation
      }, 
      jwtSecretKey,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      token,
    });
  } catch (error) {
    console.error("Error during registration", error);
    res.status(500).json({ error: "internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    // Compare password with hashed password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }

    // Create token with user information
    const token = sign(
      { 
        id: user._id, 
        name: user.name,
        email: user.email,
        gender: user.gender,
        age: user.age,
        phone: user.phone,
        address: user.address,
        bio: user.bio,
        occupation: user.occupation
      }, 
      jwtSecretKey
    );
    
    res.json({ 
      success: true, 
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          gender: user.gender,
          age: user.age,
          phone: user.phone,
          address: user.address,
          bio: user.bio,
          occupation: user.occupation
        }
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add update profile endpoint
app.put("/update-profile", async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    
    delete updateData.password;
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = sign(
      { 
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        gender: updatedUser.gender,
        age: updatedUser.age,
        phone: updatedUser.phone,
        address: updatedUser.address,
        bio: updatedUser.bio,
        occupation: updatedUser.occupation
      }, 
      jwtSecretKey
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
      token
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
