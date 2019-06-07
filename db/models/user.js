module.exports = (dynamoose) => {
  const userSchema = new dynamoose.Schema({
    id: {
      type: String,
      hashKey: true,
    },
    name: String,
    email: String,
    token: String
  });

  // Create cat model with default options
  return dynamoose.model('User', userSchema);
};
