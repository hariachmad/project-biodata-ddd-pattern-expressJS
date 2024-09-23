const {DataTypes} = require('sequelize');
const Sequelize =require('../../config/db');

const profile= Sequelize.define(
    'profile',{
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            primaryKey : true      
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

console.log(profile === Sequelize.models.profile);

const syncDB =async () => {
    try {
        await profile.sync({alter: true});
        console.log('The table for the Profile model was just (re)created!');
    }catch(error){
        console.error('Unable to sync Database', error);
    }
}

syncDB();

module.exports = profile;
