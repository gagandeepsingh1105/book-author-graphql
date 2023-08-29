import { createServer } from "http"
import { createYoga } from "graphql-yoga"
import { getauthor_loader, schema } from "./schema.js"
import postgres from "postgres"


export const sql = postgres('postgres://postgres:Waheguru@1@34.152.25.97:5432/postgres')

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