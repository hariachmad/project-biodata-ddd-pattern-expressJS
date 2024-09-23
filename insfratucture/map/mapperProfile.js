const Profile = require('../../domain/aggregates/profile');

function getModelProfileStreetAddress(address){
    const arr = address.split("-");
    return arr[0];
}

function getModelProfileCityAddress(address){
    const arr = address.split("-");
    return arr[1];
}

function getModelProfileStateAddress(address){
    const arr = address.split("-");
    return arr[2];
}

function mapperProfile(modelProfile) {
  if (!modelProfile) {
    return null;
  }
  const address = {
    street : getModelProfileStreetAddress(modelProfile.address),
    city : getModelProfileCityAddress(modelProfile.address),
    state : getModelProfileStateAddress(modelProfile.address)
  }
  const profile= new Profile(modelProfile.name,address,modelProfile.birthday);
  return profile;
}

module.exports = {mapperProfile};