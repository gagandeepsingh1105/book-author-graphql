import { schema } from './schema.js'
import { createYoga } from "graphql-yoga"
import { createServer } from "http"
import { describe, it, expect } from 'vitest'
import  request  from 'supertest'

const yoga = createYoga({ schema })
const server = createServer(yoga)

const app = server.listen(() => {
    console.info('Server is up')
})


describe('Test Query', () => {
    it('Test book by Id', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({ query: '{ bookbyId(id: 1) { title } }'})
        expect(response.body).toEqual(
        {
            "data": {
                "bookbyId": {
                    "title": "Alanna Saves the Day"
                }
            }
        }
    )
    }
    ),
        it('Test list all books', async () => {
            const response = await request(app)
                .post('/graphql')
                .send({ query: '{ listbooks { title } }' })
            expect(response.body.data.listbooks.length).toEqual(10)
        }
        ),
        it('Test list all authors', async () => {
            const response = await request(app)
                .post('/graphql')
                .send({ query: '{ listauthors { name } }' })
            expect(response.body.data.listauthors.length).toEqual(5)
        }
        )
}
)


