const {
    ApolloServerBase
} = require('apollo-server-core');
const typeDefs = require('@src/typeDefs.js');
const resolvers = require('@src/resolvers.js');
const {
    createTestClient
} = require('apollo-server-testing');

// Schema testing
describe('Schema Testing With Mocked Schema', () => {
    const mocks = {
        Float: () => 22.1,
        Int: () => 6,
        String: () => 'Hello',
    };

    const myTestServer = new ApolloServerBase({
        mocks,
        resolvers,
        typeDefs,
    });
    it('QUERY_hello', async () => {
        const query = '{ hello }';
        const client = createTestClient(myTestServer);
        const res = await client.query({
            query
        });
        expect(res.data.hello).toEqual('Hello');
    });

    it('QUERY_hello_withSnapshot', async () => {
        const query = '{ hello }';
        const client = createTestClient(myTestServer);
        const res = await client.query({
            query
        });
        expect(res.data.hello).toMatchSnapshot();
    });
});

// Resolver testing
describe('Resolver Testing Without Mock', () => {

    const myTestServer = new ApolloServerBase({
        resolvers,
        typeDefs,
    });

    it('MUTATION_greet_withSnapshot', async () => {
        const mutation = 'mutation { greet(name: "Chirag") }';
        const client = createTestClient(myTestServer);
        const res = await client.mutate({
            mutation
        });
        expect(res.data.greet).toMatchSnapshot();
    });
});