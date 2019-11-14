const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors')
const sequalize = require("./src/database/connection");
const Product = require("./src/models/Product");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.listen(port, () => {
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
})

app.post('/api/products', (req, res) => {
  console.log(req.body);
  Product.create(req.body)
      .then(product => res.json(product))
})

app.get('/api/products', (req, res) => {
  Product.findAll().then(product => res.json(product))
})
