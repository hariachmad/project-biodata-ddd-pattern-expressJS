const {DataTypes} = require('sequelize');
const Sequelize =require('../../config/db');

const user= Sequelize.define(
    'user',{
        name : {
            type : DataTypes.STRING,
            primaryKey: true,
            allowNull : false      
        },
        address : {
            type : DataTypes.STRING,
        },
        birthday : {
            type : DataTypes.STRING
        }
    },
    {
        timestamps : false
    }
)

console.log(user === Sequelize.models.user);

const syncDB =async () => {
    try {
        await user.sync({alter: true});
        console.log('The table for the User model was just (re)created!');
    }catch(error){
        console.error('Unable to sync Database', error);
    }
}

syncDB();

module.exports = user;
