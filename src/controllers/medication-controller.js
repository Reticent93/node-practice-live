const admin = require('firebase-admin');
const db = admin.firestore();

const getMedications = async (req, res) => {
    try {
        const medRef = db.collection("medications")
        const response = await medRef.get();
        const medsArr = [];
        if (response.empty) {
            res.status(404).send("No medications record found");
            return;
        } else {
            response.forEach((doc) => {
                medsArr.push(doc.data());
            });
            res.send(medsArr);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}


const getMedicationById = async (req, res) => {
    try {
        const id = req.params.id;
        const medRef = db.collection("medications").doc(id)
        const response = await medRef.get();
        if (!response.exists) {
            res.status(404).send("No medication record found");
            return;
        } else {
            res.status(200).send(response.data());
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}



const createMedication = async (req, res) => {
    try {
        const {id} = req.body.name;
        const medication = {
          name: req.body.name,
          dose: req.body.dose,
         
        };
         await db.collection("medications").add(medication);
            res.status(201).json({ message: "Medication created successfully" });
        console.log(id);
      } catch (error) {
        res.send(error.message);
    }
}



const updateMedication = async (req, res) => {
    try {
        const id = req.params.id;
        const medication = {
            name: req.body.name,
            dose: req.body.dose,
        };
        const medRef = db.collection("medications").doc(id)
        const response = await medRef.get();
        if (!response.exists) {
            res.status(404).send("No medication record found");
            return;
        } else {
            await medRef.set(medication);
            res.status(200).json({ message: "Medication updated successfully" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}



const deleteMedication = async (req, res) => {
    try {
        const id = req.params.id;
        const medRef = db.collection("medications").doc(id)
        const response = await medRef.get();
        if (!response.exists) {
            res.status(404).send("No medication record found");
            return;
        } else {
            await medRef.delete();
            res.status(200).json({ message: "Medication deleted successfully" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    getMedications,
    getMedicationById,
    createMedication,
    updateMedication,
    deleteMedication
}