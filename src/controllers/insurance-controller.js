const admin = require("firebase-admin");
const db = admin.firestore();

const getInsurances = async (req, res) => {
  try {
    const insuranceRef = db.collection("insurances");
    const response = await insuranceRef.get();
    const insurancesArr = [];
    if (response.empty) {
        res.status(404).send("No insurances record found");
        return;
    } else {
        response.forEach((doc) => {
            insurancesArr.push(doc.data());
        });
        res.send(insurancesArr);
    }
  } catch (error) {
    res.send(error.message);
  }
};


const createInsurance = async (req, res) => {
    try {
        const insuranceJson = {
        name: req.body.name,
        address: req.body.address,
        };
        await db.collection("insurances").add(insuranceJson);
        res.status(201).send("Insurance created successfully");
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

const updateInsurance = async (req, res) => {
    try {
        const id = req.params.id;
        const insuranceRef = db.collection("insurances").doc(id);
        const insurance = await insuranceRef.get();
        if (!insurance.exists) {
            res.status(404).send("No insurance record found");
            return;
        } else {
            await insuranceRef.update(req.body);
            res.status(200).send("Insurance updated successfully");
        }
    } catch (error) {
        res.send(error.message);
    }
}

const deleteInsurance = async (req, res) => {
    try {
        const id = req.params.id
        const insuranceRef = db.collection("insurances").doc(id);
        const insurance = await insuranceRef.get();
        if (!insurance.exists) {
            res.status(404).send("No insurance record found");
            return;
        } else {
            await insuranceRef.delete();
            res.status(200).send("Insurance deleted successfully");
        }
    } catch (error) {
        res.send(error.message)
    }
};


module.exports = {
    getInsurances,
    createInsurance,
    updateInsurance,
    deleteInsurance
};