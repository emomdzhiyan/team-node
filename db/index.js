const dynamoose = require('dynamoose');
const dynalite = require('dynalite');

let db = {};

const defineModels = require('./models');

const {
  AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, DB_LOCAL_URL, DB_LOCAL_PORT
} = process.env;

function normalize(port) {
  const numerizedPort = Number(port);
  return (typeof numerizedPort === 'number' && !Number.isNaN(numerizedPort)) ? numerizedPort : 8000;
}

const startUpAndReturnDynamo = async () => {
  const dynaliteServer = dynalite({ path: './mydb', createTableMs: 50 });
  await dynaliteServer.listen(normalize(DB_LOCAL_PORT));
  return dynaliteServer;
};

const createDynamooseInstance = () => {
  dynamoose.AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });
  dynamoose.local(`${DB_LOCAL_URL}:${normalize(DB_LOCAL_PORT)}`);
};

const bootStrap = async () => {
  await startUpAndReturnDynamo();
  createDynamooseInstance();
  Object.assign(db, defineModels(dynamoose));
};

bootStrap();

module.exports = db;
