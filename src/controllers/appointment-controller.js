const admin = require("firebase-admin");
const db = admin.firestore();

const getAppointments = async (req, res) => {
  try {
    const appointmentRef = db.collection("appointments");
    const response = await appointmentRef.get();
    console.log(appointmentRef.id);
    const appointmentsArr = [];
    if (response.empty) {
      res.status(404).send("No appointment records found");
      return;
    } else {
      response.forEach((doc) => {
        appointmentsArr.push(doc.data());
      });
      res.send(appointmentsArr);
    }
  } catch (error) {
    res.send(error.message);
  }
};

const createAppointment = async (req, res) => {
  try {
    const { user_id, provider_id, date, time, duration, reason } = req.body;
    const appointmentRef = await db.collection("appointments").add({
      user_id,
      provider_id,
      date,
      time,
      duration,
      service,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(appointmentRef.id);
    const appointment = await appointmentRef.get();
    res.status(201).send({
      id: appointment.id,
      data: appointment.data(),
    });
  } catch (error) {
    res.send(error.message);
  }
};

const updateAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const appointmentRef = db.collection("appointments").doc(id);
    const appointment = await appointmentRef.update({
      user_id: req.body.user_id,
      date: req.body.date,
      time: req.body.time,
      duration: req.body.duration,
      service: req.body.service,
      provider_id: req.body.provider_id,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    if (!appointment) {
      res.status(404).send("Appointment record not found");
      return;
    } else {
      await appointmentRef.update(appointment);
      res.status(200).send("Appointment updated successfully");
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteAppointment = (req, res) => {
  const id = req.params.id;
  const appointmentRef = db.collection("appointments").doc(id);
  if (!appointmentRef.exists) {
    res.status(404).send("Appointment record not found");
    return;
  } else {
    appointmentRef.delete();
    res.status(204).send("Appointment deleted successfully");
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
