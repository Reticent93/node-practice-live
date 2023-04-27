const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config()
const admin = require("firebase-admin");

const serviceAccount = {
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL
  };
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const userRoutes = require("./src/routes/userRoutes");
const providerRoutes = require("./src/routes/providerRoutes");
const insuranceRoutes = require("./src/routes/insuranceRoutes");
const appointmentRoutes = require("./src/routes/appointmentRoutes");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/providers", providerRoutes);
app.use("/api/v1/insurances", insuranceRoutes)
app.use("/api/v1/appointments", appointmentRoutes)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
