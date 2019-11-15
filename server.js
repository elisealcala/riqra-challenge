const express = require('express');
const app = express();
const port = 4000;
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const bodyParser = require('body-parser');
const cors = require('cors')
const Product = require("./src/models/Product");


const schema = buildSchema(`
  type Product {
    name: String,
    brand: String,
    image: String,
    price: Int,
  },
  type Query {
    products: [Product]
  }
`);

const root = {
  products: () => {
    return Product.findAll().then(product => product);
  },
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

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
