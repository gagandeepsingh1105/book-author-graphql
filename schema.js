import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} from 'graphql'

import { sql } from './db.js'


const BookType = new GraphQLObjectType({
    name: 'bookdata',
    description: 'This represents a book object',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        authorid: { type: new GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: async (bookdata) => {
                const authid = bookdata.authorid
                const auth = await sql`select * from authors where authorid = ${authid};`
                return auth[0]
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'authordata',
    description: 'This represents an author object',
    fields: () => ({
        authorid: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString }
    })
})


const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Root Query',
    fields: () => ({
        listbooks: {
            type: new GraphQLList(BookType),
            description: "Gets the list of all available books and it's authors",
            resolve: async () => {
                const bks = await sql`select * from books;`
                return bks
            }

        },
        bookbyId: {
            type: BookType,
            description: "Gets a single boook by id",
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async (parent, args) => {
                const id = args.id
                const bk = await sql`select * from books where id = ${id};`
                console.log(bk)
                return bk
            }
        },
        listauthors: {
            type: new GraphQLList(AuthorType),
            description: "Gets the list of all available authors",
            resolve: async () => {
                const auths = await sql`select * from authors;`
                return auths
            }
        }
    })
})

export const schema = new GraphQLSchema({
    query: RootQueryType
})
