function defineModels(dynamoose) {
  return {
    User: require('./user')(dynamoose),
    Invitation: require('./invitation')(dynamoose),
  };
}

module.exports = defineModels;
