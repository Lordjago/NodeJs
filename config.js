const dotenv = require('dotenv');

dotenv.config();

const {
    CONNECTION_STRING
} = process.env;

module.exports = {
    mongodb_uri: CONNECTION_STRING
}