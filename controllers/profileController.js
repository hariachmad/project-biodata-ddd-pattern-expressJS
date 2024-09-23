const profileService = require ('../application/service/profileService');
const {validationResult} = require('express-validator');
const ProfileDto = require('../application/dto/profileDto');
const {dtoValidator} = require('../application/dto/dtoValidator');
const jwt = require('jsonwebtoken');

async function updateAccountInfo(req,res,next){
    const errors = validationResult(req);
    const {name,address,birthday} = req.body;
    const profileDTO= new ProfileDto(name,address,birthday);
    const errorsDtoValidator = dtoValidator(ProfileDto);
    const response= await profileService.updateAccountInfo(profileDTO);
    if (!errors.isEmpty() || !errorsDtoValidator.isEmpty()) {
      return res.status(400).json({ errors: errors.array(),errorsDtoValidator : errorsDtoValidator.array()});
    }
    res.status(200).json(response);
  }

  async function deleteAccountInfo(req,res,next){
    const errors = validationResult(req);
    const {name} = req.params;
    const response = await profileService.deleteAccountInfo(name);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
    res.status(200).json(response);
  }

  async function getAccountInfo(req,res,next){
    const errors = validationResult(req);
    const name=req.params.name;
    const response = await profileService.getAccountInfo(name);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.status(200).json(response);
  }

  async function register(req, res, next) {
    const errors = validationResult(req);
    const {name, address, birthday}= req.body;
    const profileDto= new ProfileDto(name,address,birthday);
    const response = await profileService.register(profileDto);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.status(200).json(response);
  }



  module.exports= {updateAccountInfo,deleteAccountInfo,getAccountInfo,register};