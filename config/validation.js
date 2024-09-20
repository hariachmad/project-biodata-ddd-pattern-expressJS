const { body } = require('express-validator');
const { param } = require('express-validator');

const userValidation =  [
    body('name').notEmpty().withMessage("Nama dibutuhkan"),
    body('address').notEmpty().withMessage("Membutuhkan alamat email yang valid"),
    body('birthday').notEmpty().withMessage("Tanggal Lahir tidak boleh kosong").isDate().withMessage("Membutuhkan Tanggal Sesuai Format")
  ];

const nameValidation = [
  param('name').notEmpty().withMessage("Nama Dibutuhkan")
];

module.exports = {
    userValidation,nameValidation
};