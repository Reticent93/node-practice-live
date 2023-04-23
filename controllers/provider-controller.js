const pool = require("../db/db");
const queries = require("./queries");

const getProviders = (req, res) => {
    pool.query(queries.getProviders, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  };

  const getProviderById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getProviderById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
  }


  module.exports = {
    getProviders,
    getProviderById,
    };