const User = require('../entities/user');

function mapModelUserToEntitiesUser(modelUser) {
  if (!modelUser) {
    return null;
  }
  return new User(
    modelUser.name,modelUser.birthday,modelUser.address
  );
}

module.exports = {mapModelUserToEntitiesUser};