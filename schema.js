import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} from 'graphql'

const authors = [
    { id: 1, name: 'Bernard Hopf' },
    { id: 2, name: 'Robert Plimpton' },
    { id: 3, name: 'Jill Hergesheimer' },
    { id: 4, name: 'John W. Spanogle' },
    { id: 5, name: 'Lynne Danticat' }
]

const books = [
    { id: 1, title: 'Alanna Saves the Day', authorId: 1 },
    { id: 2, title: 'Soft, Pliable Truth', authorId: 2 },
    { id: 3, title: 'She Also Tottered', authorId: 2 },
    { id: 4, title: 'Cimornul', authorId: 3 },
    { id: 5, title: 'Quiddity and Quoddity', authorId: 3 },
    { id: 6, title: 'Say it with Snap!', authorId: 4 },
    { id: 7, title: 'The Elephant House', authorId: 4 },
    { id: 8, title: 'Muddy Waters', authorId: 5 },
    { id: 9, title: 'Did You Hear?', authorId: 5 },
    { id: 10, title: 'The Scent of Oranges', authorId: 5 }
]
const BookType = new GraphQLObjectType({
    name: 'bookdata',
    description: 'This represents a book object',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: (bookdata) => {
                return authors.find(getauthor => getauthor.id === bookdata.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'authordata',
    description: 'This represents an author object',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString }
    })
})


const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Root Query',
    fields: () => ({
        listbooks: {
            type: GraphQLList(BookType),
            description: "Gets the list of all available books and it's authors",
            resolve: () => books

        },
        bookbyId: {
            type: BookType,
            description: "Gets a single boook by Id",
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                return books.find(searchbook => searchbook.id === args.id)
            }
        },
        listauthors: {
            type: GraphQLList(AuthorType),
            description: "Gets the list of all available authors",
            resolve: () => authors
        }
    })
})

export const schema = new GraphQLSchema({
    query: RootQueryType
})
