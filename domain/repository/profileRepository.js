const profileModel = require ('../models/profileModel');
const {mapModelProfileToAggregatesProfile} = require('../map/mapperProfile');

class ProfileRepository{
    async save(profile){
        console.log("in models: "+profile.profileDetails.name);
        let payload = {
            name : profile.profileDetails.name,
            address : profile.profileDetails.address,
            birthday : profile.profileDetails.birthday
        }
        try{
            await profileModel.create(payload);
        }catch(err){
            console.error("Tidak dapat menjalankan save :"+err);
        }
    }

    async findByName(name){
        try{
            console.log("name di findByName: "+name);
            const profile =  await profileModel.findOne({
            where : {name : name}
        });

        if(profile){
            console.log("profileModel: "+profile.address);
            const aggregatesProfile = mapModelProfileToAggregatesProfile(profile);
            console.log("aggregatesProfile: "+aggregatesProfile.profileDetails);
            return aggregatesProfile;
        }
        return false;
    }catch(err){
        console.error("Tidak bisa melakukan findByName: "+err);
    }}

    async deleteByName(name){
        try{
            const profile = await profileModel.destroy({
                where : {name : name}
            });

            return profile;
        }catch(err){
            console.error("Tidak bisa melakukan deleteByName: "+err);
        }
    }

    async updateByName(profile){
        try{
            const arrUser = await profileModel.upsert(
                {name : profile.profileDetails.name,address : profile.profileDetails.address,birthday : profile.profileDetails.birthday},{
                    where : {name : profile.profileDetails.name}
                } 
            )
            console.log("arrUser: "+arrUser);
            return arrUser;
        }catch(err){ 
            console.error("Tidak dapat melakukan updateNameByName: "+err);
        }
    }

    }

    module.exports = ProfileRepository;