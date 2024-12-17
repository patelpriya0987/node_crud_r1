const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const routes = require('./router/default_Router');
const path = require('path');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;
const Path= path.join(__dirname , "/views");
const db = require('./config/db')
// const passport = require('./config/pasportConfig.js');
// const express_session = require('express-session');


app.set("view engine" , "ejs");
app.set("views",Path)

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/upload', express.static(path.join(__dirname, 'upload')));


app.use('/', routes);


app.listen(PORT, () => {
    console.log(`Server is running port http://localhost:${PORT}`);
});