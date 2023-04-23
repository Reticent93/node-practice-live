const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const providerRoutes = require('./routes/providerRoutes');


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/providers', providerRoutes)

app.listen(port, () => console.log(`Listening on port ${port}`));