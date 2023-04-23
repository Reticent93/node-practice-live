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

  const createProvider = (req, res) => {
    const {name, phone} = req.body;
    pool.query(queries.checkNameExists, [name], (error, results) => {
        if (results.rows.length) {
            res.status(409).json({message: "Provider already exists"})
        }
        pool.query(queries.createProvider, [name, phone], (error, results) => {
            if (error) throw error
            res.status(201).send("Provider added successfully")
        })
    })
  }

  const updateProvider = (req, res) => {
    const id = parseInt(req.params.id)
    const {name, phone} = req.body
    pool.query(queries.getProviderById, [id], (error, results) => {
       const noProvider = !results.rows.length
        if (noProvider) {
            res.status(404).json({message: 'Provider does not exist'})
        } else {
            pool.query(queries.updateProvider, [name, phone, id], (error, results) => {
                if (error) throw error
                res.status(200).json({message: 'Provider successfully updated'})
            })
        }
       
    })
  }


  const deletProvider = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getProviderById, [id], (error, results) => {
        noProvider = !results.rows.length
        if (noProvider) {
            res.status(404).json({message: 'Provider does not exist'})
        } else {
            pool.query(queries.deletProvider, [id], (error, results) => {
                if (error) throw error
                res.status(200).send('Provider deleted successfully');
            })
        }
    })
  }



  module.exports = {
    getProviders,
    getProviderById,
    createProvider,
    updateProvider,
    deletProvider
    };