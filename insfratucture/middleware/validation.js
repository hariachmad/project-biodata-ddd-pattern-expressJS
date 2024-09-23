const { body } = require('express-validator');
const { param } = require('express-validator');

const profileValidator =  [
  body('name').notEmpty().withMessage("Nama dibutuhkan"),
  body('address').notEmpty().withMessage("Membutuhkan address yang valid"),
  body('birthday').notEmpty().withMessage("Tanggal Lahir tidak boleh kosong").isDate().withMessage("Membutuhkan Tanggal Sesuai Format")
];

const nameValidator = [
  param('name').notEmpty().withMessage("Nama Dibutuhkan")
];

module.exports = {
  profileValidator,nameValidator
};