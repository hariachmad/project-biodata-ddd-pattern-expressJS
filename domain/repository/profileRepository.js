const profileModel = require ('../../insfratucture/models/profileModel');
const {mapperProfile} = require('../../insfratucture/map/mapperProfile');

class ProfileRepository{
    async save(profile){
        let payload = {
            name : profile.profileDetails.name,
            address : profile.profileDetails.address,
            birthday : profile.profileDetails.birthday
        }
        try{
            const newProfile = await profileModel.create(payload);
            return  newProfile;
        }catch(err){
            console.error("Tidak dapat menjalankan save :"+err);
        }
    }

    async findByName(name){
        try{
            const profile =  await profileModel.findOne({
                where : {name : name}
            });

        if(profile){
            const aggregatesProfile = mapperProfile(profile);
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

            if(!profile){
                throw new Error("Tidak bisa melakukan melakukan fungsi profileModel.destroy()");
            }

            return profile;
        }catch(err){
            console.error("Tidak bisa melakukan deleteByName: "+err);
        }
    }

    async updateByName(profile){
        try{
            const arrUser = await profileModel.upsert(
                {
                    name : profile.profileDetails.name,address : profile.profileDetails.address,birthday : profile.profileDetails.birthday},{
                    where : {name : profile.profileDetails.name}
                } 
            )
            if(!arrUser){
                throw new Error("Tidak bisa melakukan fungsi profileModel.upsert()")
            }
            return arrUser;
        }catch(err){ 
            console.error("Tidak dapat melakukan updateNameByName: "+err);
        }
    }

    }

    module.exports = ProfileRepository;