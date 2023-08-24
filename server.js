import { createYoga } from "graphql-yoga"
import { createServer } from "http"
import {schema } from "./schema.js"

const yoga = createYoga({schema})
const server = createServer(yoga)
server.listen(8080, () => {
    console.info(`Server is running on http://localhost:8080/graphql`)
})