const { Client } = require('@elastic/elasticsearch');

const cloudID = process.env.ELASTIC_CLOUD_ID;
const username = process.env.ELASTIC_USERNAME;
const password = process.env.ELASTIC_PASSWORD;

const client = new Client({
  cloud: {
    id: cloudID,
  },
  auth: {
    username,
    password,
  },
});

module.exports = client;
