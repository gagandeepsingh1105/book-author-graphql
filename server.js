import { schema } from './schema.js'

const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP

const app = express()

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))
app.listen(5000, () => console.log('Server Running'))