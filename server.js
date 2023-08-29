import { createServer } from "http"
import { createYoga } from "graphql-yoga"
import { getauthor_loader, schema } from "./schema.js"
import postgres from "postgres"
import 'dotenv-safe/config.js'

export const sql = postgres({
    host: process.env.HOST,           
    port: process.env.PORT,         
    database: process.env.DATABASE,            
    username: process.env.USER,           
    password: process.env.PASSWORD
})

const yoga = createYoga({
    schema,
    context: {
        authorloader: getauthor_loader(),
        sql
    }
})

const server = createServer(yoga)
server.listen(8080, () => {
    console.info(`Server is running on http://localhost:8080/graphql`)
})