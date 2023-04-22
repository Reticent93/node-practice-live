const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');


const app = express();

const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1/users', userRoutes);

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => console.log(`Listening on port ${port}`));