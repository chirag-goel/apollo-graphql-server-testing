const DataSource = require('./dataSource');

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        userData: async (parent, { userId }, context) => {
            const result = await DataSource.getUserData(userId);
            return (result && result[userId]) || {};
        },
    },
    Mutation: {
        greet: (parent, { name }, context, info) => `Welcome ${name}!`,
    }
};

module.exports = resolvers;