import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from "graphql";

const productType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    name: { type: GraphQLString },
    brand: { type: GraphQLString },
    image: { type: GraphQLString },
    price: { type: GraphQLInt },
  })
});
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    product: {
      type: productType,
      resolve() {
        return "asdasd";
      }
    },
  }
})
});

export { graphql };
export default schema;