
const {
    ApolloServerBase
} = require('apollo-server-core');
const typeDefs = require('@src/typeDefs.js');
const resolvers = require('@src/resolvers.js');
const {
    createTestClient
} = require('apollo-server-testing');
const DataSource = require('@src/dataSource');
describe('Integration Testing With Mocked DataSource', () => {

    const myTestServer = new ApolloServerBase({
        resolvers,
        typeDefs,
    });

    it('QUERY_userData_withSnapshot', async () => {
        const USER_DATA = {
            "chirag": {
                "firstName": "Chirag",
                "lastName": "Goel",
                "website": "http://www.chirag-goel.in"
            }
        };
        DataSource.getUserData = jest.fn(() => USER_DATA);
        const query = '{ userData(userId: "chirag") { firstName lastName website} }';
        const client = createTestClient(myTestServer);
        const res = await client.mutate({
            query
        });
        expect(res.data.userData).toMatchSnapshot();
    });
});