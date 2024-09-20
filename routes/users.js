const express = require('express');
const router = express.Router();
const {userValidation,nameValidation} = require('../config/validation');
const {updateAccountInfo,deleteAccountInfo,getAccountInfo,register}= require('../controllers/userController')

/* GET users listing. */
router.post('/register',userValidation,register);

router.get('/getAccountInfo/:name',nameValidation,getAccountInfo);

router.put('/updateAccountInfo',userValidation,updateAccountInfo);

router.delete('/deleteAccountInfo/:name',nameValidation,deleteAccountInfo);

module.exports = router;
