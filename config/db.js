const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('biodata', 'postgres', 'Oper@ti0n', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Koneksi ke PostgreSQL berhasil!');
  })
  .catch(err => {
    console.error('Gagal terhubung ke PostgreSQL:', err);
  });

module.exports = sequelize;