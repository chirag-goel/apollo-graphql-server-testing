const fetch = require('node-fetch');

const getUserData = async (userId) => {
    const userData = await fetch('http://localhost:5000/data1.json');
    return userData.json();
}

module.exports = {
    getUserData
};
