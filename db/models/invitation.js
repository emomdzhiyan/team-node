module.exports = (dynamoose) => {
  const invitationSchema = new dynamoose.Schema({
    id: {
      type: String,
      hashKey: true,
    },
    name: String,
    email: String,
    activated: Boolean
  });

  // Create cat model with default options
  return dynamoose.model('Invitations', invitationSchema);
};
