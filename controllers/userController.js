const profileService = require ('../application/service/profileService');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');

async function updateAccountInfo(req,res,next){
    const errors = validationResult(req);
    const {name,address,birthday} = req.body;
    const response= await profileService.updateAccountInfo(name,address,birthday);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
    res.status(200).json(response);
  }

  async function deleteAccountInfo(req,res,next){
    const errors = validationResult(req);
    const {name} = req.params;
    console.log("params "+req.params);
    console.log("name "+name);
    const response = await profileService.deleteAccountInfo(name);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
    res.status(200).json(response);
  }

  async function getAccountInfo(req,res,next){
    const errors = validationResult(req);
    const name=req.params.name;
    console.log("Name: "+name);
    const response = await profileService.getAccountInfo(name);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
    res.status(200).json(response);
  }

  async function register(req, res, next) {
    const errors = validationResult(req);
    const {name, address, birthday}= req.body;
    console.log("name :"+name);
    console.log("address : "+address);
    const response = await profileService.register(name,address, birthday);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  res.status(200).json(response);
  }



  module.exports= {updateAccountInfo,deleteAccountInfo,getAccountInfo,register};