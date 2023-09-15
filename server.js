import { getauthor_loader, schema } from "./schema.js"
import postgres from "postgres"
import 'dotenv-safe/config.js'
import {
    simpleEstimator,
    createComplexityRule,
    fieldExtensionsEstimator
} from 'graphql-query-complexity'
import express from 'express'
//import { createHandler } from 'graphql-http/lib/use/http'
import { graphqlHTTP } from 'express-graphql'
import requestLanguage from 'express-request-language'
const app = express()

export const sql = postgres({
    host: process.env.HOST,           
    port: 5432,         
    database: process.env.DATABASE,            
    username: process.env.USER,           
    password: process.env.PASSWORD
})

app.use(
    requestLanguage({
        languages: ['en', 'fr'], // First locale becomes the default
    }),
).use('/graphql', graphqlHTTP({
    schema: schema,
    context: {
        authorloader: getauthor_loader()
    },
    validationRules: [
        createComplexityRule({
            estimators: [
              //  Configure your estimators
                fieldExtensionsEstimator(),
                simpleEstimator({ defaultComplexity: 1 })
            ],
            maximumComplexity: 10,
            variables: {},
            onComplete: (complexity) => {
                console.log('Query Complexity:', complexity)
            },
        }),
    ],
    graphiql: true
}))

//app.get('/playground', graphQLPlayground({ endpoint: '/graphql' }))
app.listen(process.env.PORT, () => console.log('Server is running on http://localhost:'+process.env.PORT+'/graphql'))