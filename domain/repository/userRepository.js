const User = require('../entities/user');
const userModel = require ('../models/userModel');
const {mapModelUserToEntitiesUser} = require('../map/mapperUser');

class UserRepository{
    async save(user){
        console.log("in models: address:"+user.address)
        let saveUser = {
            name : user.name,
            address : user.address,
            birthday : user.birthday
        }
        try{
            await userModel.create(saveUser);
        }catch(err){
            console.error("Tidak dapat menjalankan save :"+err);
        }
    }

    async findByName(name){
        try{
        const user =  await userModel.findOne({
            where : {name : name}
        });

        if(user){
            const entitiesUser = mapModelUserToEntitiesUser(user);
            console.log("entitiesUser: "+entitiesUser.address);
            return entitiesUser;
        }
        return false;
    }catch(err){
        console.error("Tidak bisa melakukan findByName: "+err);
    }}

    async deleteByName(name){
        try{
            const user = await userModel.destroy({
                where : {name : name}
            });

            return user;
        }catch(err){
            console.error("Tidak bisa melakukan deleteByName: "+err);
        }
    }

    async updateByName(name,address,birthday){
        try{
            const arrUser = await userModel.upsert(
                {name : name,address : address,birthday : birthday},{
                    where : {name : name}
                } 
            )
            console.log("arrUser: "+arrUser);
            return arrUser;
        }catch(err){ 
            console.error("Tidak dapat melakukan updateNameByName: "+err);
        }
    }

    }

    module.exports = UserRepository;