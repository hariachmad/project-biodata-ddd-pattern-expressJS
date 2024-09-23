const express = require('express');
const router = express.Router();
const {profileValidator,nameValidator} = require('../../insfratucture/middleware/validation');
const {updateAccountInfo,deleteAccountInfo,getAccountInfo,register}= require('../../controllers/profileController')

/* GET users listing. */
router.post('/register',profileValidator,register);

router.get('/getAccountInfo/:name',nameValidator,getAccountInfo);

router.put('/updateAccountInfo',profileValidator,updateAccountInfo);

router.delete('/deleteAccountInfo/:name',nameValidator,deleteAccountInfo);

module.exports = router;
