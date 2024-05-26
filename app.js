const express = require("express");
const app = express();
const path = require("path"); 

const domain = 'http://localhost:3000/'

app.use(express.static(path.join(__dirname, 'public'))); 

module.exports = app;