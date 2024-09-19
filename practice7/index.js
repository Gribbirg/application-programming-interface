const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const app = express();
const port = 1234;
const schema = require('./schema/schema.js');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:63342',
}));
app.use('/graphql', graphqlHTTP({schema: schema, graphiql: true}));

app.listen(port);