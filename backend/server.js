const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')


require('./models').initialize();
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/gg');
const api = require('./api')
const PORT = 8081;
const app = express();
app.use(cookieParser())
app.use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true, origin: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api)
app.use('/', (req, res) => {
	res.send('Hello');
});



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});