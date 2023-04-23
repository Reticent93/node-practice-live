const pool = require("../db/db");
const queries = require("./queries");

const getUsers = (req, res, next) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    next();
  });
};

const getUserById = (req, res, next) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    next();
  });
};

const createUser = (req, res) => {
  const { name, email, password } = req.body;
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.status(409).json({ message: "Email already exists" });
    }

    pool.query(
      queries.createUser,
      [name, email, password],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("User added successfully");
      }
    );
  });
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    pool.query(queries.getUserById, [id], (error, results) => {
        const noUser = !results.rows.length;
        if (noUser) {
            res.status(404).json({ message: "User does not exist" });
        } else {
          pool.query(queries.updateUser, [name, email, id], (error, results) => {
              if (error) throw error;
              res.status(200).send('User updated successfully');
          });
        }
        
    });
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUserById, [id], (error, results) => {
        const noUser = !results.rows.length;
        if (noUser) {
            res.status(404).json({ message: "User does not exist" });
        } else {
          pool.query(queries.deleteUser, [id], (error, results) => {
            if (error) throw error;
              res.status(200).send('User deleted successfully');
          });
        }
        
    });
}


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
