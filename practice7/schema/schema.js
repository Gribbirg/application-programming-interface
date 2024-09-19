const graphql = require('graphql');
const _ = require("lodash");

const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLSchema,
} = graphql;

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        id: {type: GraphQLID},
        text: {type: GraphQLString},
        qty: {type: GraphQLInt},
        completed: {type: GraphQLBoolean},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(users, {id: parent.userId});
            },
        },
    }),
});

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        name: {type: GraphQLString},
        surname: {type: GraphQLString},
        product: {
            type: ProductType,
            resolve(parent, args) {
                return _.find(users, {userId: parent.id});
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        info: {
            type: GraphQLString,
            resolve(parent, args) {
                return "Сервер запущен";
            },
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(users, {userId: args.id});
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return users;
            },
        },
        product: {
            type: ProductType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(products, {userId: args.id});
            },
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return products;
            },
        },
    },
});

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        adduser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString},
                surname: { type: GraphQLString }
            },
            resolve(parent,args) {
                const arrLength = users.push(args);
                return users[arrLength - 1];
            },
        },
    },
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations,
});

const users = [
    {
        id: "0",
        username: "john_doe",
        name: "John",
        surname: "Doe",
        product: {
            id: "0",
            text: "Laptop",
            qty: 2,
            completed: true,
            userId: "0"
        }
    },
    {
        id: "1",
        username: "jane_smith",
        name: "Jane",
        surname: "Smith",
        product: {
            id: "1",
            text: "Phone",
            qty: 1,
            completed: false,
            userId: "1"
        }
    },
    {
        id: "2",
        username: "mike_johnson",
        name: "Mike",
        surname: "Johnson",
        product: {
            id: "2",
            text: "Tablet",
            qty: 3,
            completed: true,
            userId: "2"
        }
    },
    {
        id: "3",
        username: "anna_white",
        name: "Anna",
        surname: "White",
        product: {
            id: "3",
            text: "Headphones",
            qty: 1,
            completed: false,
            userId: "3"
        }
    },
    {
        id: "4",
        username: "chris_brown",
        name: "Chris",
        surname: "Brown",
        product: {
            id: "4",
            text: "Smartwatch",
            qty: 2,
            completed: true,
            userId: "4"
        }
    }
];

const products = [
    {
        id: "0",
        text: "Laptop",
        qty: 2,
        completed: true,
        user: {
            id: "0",
            username: "john_doe",
            name: "John",
            surname: "Doe"
        }
    },
    {
        id: "1",
        text: "Phone",
        qty: 1,
        completed: false,
        user: {
            id: "1",
            username: "jane_smith",
            name: "Jane",
            surname: "Smith"
        }
    },
    {
        id: "2",
        text: "Tablet",
        qty: 3,
        completed: true,
        user: {
            id: "2",
            username: "mike_johnson",
            name: "Mike",
            surname: "Johnson"
        }
    },
    {
        id: "3",
        text: "Headphones",
        qty: 1,
        completed: false,
        user: {
            id: "3",
            username: "anna_white",
            name: "Anna",
            surname: "White"
        }
    },
    {
        id: "4",
        text: "Smartwatch",
        qty: 2,
        completed: true,
        user: {
            id: "4",
            username: "chris_brown",
            name: "Chris",
            surname: "Brown"
        }
    }
];
