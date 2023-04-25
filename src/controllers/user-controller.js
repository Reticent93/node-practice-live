// const pool = require("../db/db");
// const queries = require("./queries");
const admin = require('firebase-admin');

const db = admin.firestore();


const getUsers = async (req, res) => {
  try {
    const userRef = db.collection("users")
    const response = await userRef.get();
    const usersArr = [];
    if (response.empty) {
      res.status(404).send("No users record found");
      return;
    } else {
    response.forEach((doc) => {
     usersArr.push(doc.data());
    });
    res.send(usersArr);
  }
  } catch (error) {
    res.status(500).send(error.message);
  }
};



const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const userRef = db.collection("users").doc(id)
    const response = await userRef.get(); 
    if (!response.exists) {
      res.status(404).send("No user record found");
      return;
    } else {
    res.status(200).send(response.data());
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}


const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.body.email;
    const userJson = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    await db.collection("users").add(userJson);
    res.status(201).send("User created successfully");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userRef = db.collection("users").doc(id)
    await userRef.update(req.body);
    if (!userRef) {
      res.status(404).send("No user record found");
      return;
    } else {
    res.status(200).send("User updated successfully");
    }
    
  } catch (error) {
    res.send(error.message);
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userRef = db.collection("users").doc(id)
    if (!userRef) {
      res.status(404).send("No user record found");
      return;
    } else {
      await userRef.delete();
    res.status(204).send("User deleted successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
