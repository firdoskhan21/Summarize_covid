const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { routes: useRoutes, } = require("./covid_info/routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', useRoutes);
module.exports = app;