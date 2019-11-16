const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;;
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const bodyParser = require('body-parser');
const cors = require('cors')
const Product = require("./src/models/Product");


const schema = buildSchema(`
  type Product {
    id: Int,
    name: String,
    brand: String,
    image: String,
    number: Int,
    price: Int,
    isInShoppingCart: Boolean,
    shoppingCartNumber: Int
  },
  type Query {
    products: [Product]
  },
  input ProductInput {
    id: Int,
  },
  input ShoppinCartInput {
    id: Int,
    increment: Boolean,
  },
  type Success {
    success: Boolean,
  }
  type Mutation {
    addShoppingCart(params: ShoppinCartInput): Success,
    deleteShoppingCart(params: ProductInput): Success,
  }
`);

const root = {
  products: () => {
    return Product.findAll().then(product => product);
  },
  deleteShoppingCart: ({ params:{ id }}) => {
    return Product.update({
      isInShoppingCart: false,
      shoppingCartNumber: 0,
    }, {
      where: {
        id: id,
      }
    }).then(() => ({ success: true }))
  },
  addShoppingCart: ({ params: { increment, id } }) => {
    Product.update({
      isInShoppingCart: true,
    }, {
      where: {
        id: id,
      }
    });
    if (increment) {
      return Product.increment('shoppingCartNumber', { where: { id: id } }).then(() => ({ success: true }));
    } else {
      return Product.decrement('shoppingCartNumber', { where: { id: id } }).then(() => ({ success: true }));
    }
  }
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use(express.static(path.join(__dirname, 'dist')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});


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
