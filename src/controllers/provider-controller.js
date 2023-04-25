const admin = require('firebase-admin');
const db = admin.firestore();

const getProviders = async (req, res) => {
  try {
    const providersRef = db.collection("providers")
    const response = await providersRef.get();
    const providersArr = [];
    
    if (response.empty) {
      res.status(404).send("No providers record found");
      return;
    } else {
    response.forEach((doc) => {      
      providersArr.push(doc.data());
    });
    res.send(providersArr);
  }
  } catch (error) {
    res.send(error.message);
  }
};


const getProviderById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const providerRef = db.collection("providers").doc(id)
    const response = await providerRef.get(); 
    if (!response.exists) {
      res.status(404).send("No provider record found");
      return;
    } else {
    res.status(200).send(response.data());
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};



const createProvider = async (req, res) => {
  try {
    const {id} = req.body.name;
    const provider = {
      name: req.body.name,
      phone: req.body.phone,
    };
     await db.collection("providers").add(provider);
        res.status(201).json({ message: "Provider created successfully" });
    console.log(id);
  } catch (error) {
    res.send(error.message);
}
};


const updateProvider = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const body = req.body;
    const providerRef = db.collection("providers").doc(id)
     await providerRef.update(body); 
    if (!providerRef) {
      res.status(404).send("No provider record found");
      return;
    } else {
      res.status(204).json({ message: "Provider updated successfully" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}


const deletProvider = async (req, res) => {
  try {
    const {id} = req.params;
    const providerRef = db.collection("providers").doc(id);
     await providerRef.delete();
    res.status(204).json({ message: "Provider deleted successfully" });
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deletProvider,
};
