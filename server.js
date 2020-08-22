var express = require('express');
var cors = require('cors');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mobile_security_benefits_dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);
var schema = require('./schema');

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

// Instantiate express server
var app = express();
app.use(cors());
app.use('/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphiql');
