const crypto = require('crypto');

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

exports.generateAuthToken = generateAuthToken;
