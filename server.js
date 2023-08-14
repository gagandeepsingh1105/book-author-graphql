import { schema } from './schema.js'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'

const app = express()

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
app.listen(5000, () => console.log('Server Running at 5000'))