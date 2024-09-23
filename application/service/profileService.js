const ProfileRepository = require('../../domain/repository/profileRepository');
const Profile = require('../../domain/aggregates/profile');

class ProfileService{
    constructor(repository){
        if(!repository){
            throw Error("Profile Service membutuhkan constructor instance dari profileRepository")
        }
        this._repository=repository;
    }

    async checkIsAvailableName(name){
        try{
            const profile = await this._repository.findByName(name);
            if(profile){
                return profile;
            }
            return false;
        }catch(err){
        console.error("Tidak bisa menjalankan fungsi checkIsAvailableName: "+err);
        }
    }

    async register(profileDto){
        if (!(await this.checkIsAvailableName(profileDto.name))){
            try{
                const profile= new Profile(profileDto.name,profileDto.address,profileDto.birthday);
                const newUser= await this._repository.save(profile);
                if(!newUser){
                    throw Error = "Tidak bisa menjalankan fungsi save"
                }
                return {
                    messages : "Data untuk nama : "+profileDto.name+" Telah berhasil di save"
                };
            }catch(err){
                console.error("Tidak bisa menjalankan register: "+err);
            }
        }
        return {
            messages : "Data untuk nama: "+profileDto.name+" sudah ada."
        };  
    }

    async getAccountInfo(name){
        if((await this.checkIsAvailableName(name))){
            try{
                const profile= await this.checkIsAvailableName(name);
                if(!profile){
                    throw Error("Tidak bisa menjalankan fungsi checkIsAvailableName")
                }
                return {
                    name : profile.profileDetails.name,
                    address : profile.profileDetails.address,
                    birthday : profile.profileDetails.birthday
                };
            }catch(err){
                console.error("Tidak bisa menjalankan fungsi getAccountInfo: "+err)
            }
        }
        return {
            messages : "Account Dengan nama : "+name+" Tidak ada"
        };
    }

    async updateAccountInfo(profileDto){
        if(await this.checkIsAvailableName(profileDto.name)){
            try{
                const profile = new Profile(profileDto.name,profileDto.address,profileDto.birthday)
                const updated = await this._repository.updateByName(profile);
                if (updated){
                    return {
                        messages : "Account Dengan nama "+profileDto.name+" Berhasil di update"
                    };
                }
                throw Error("updated tidak ada");
                
            }catch(err){
                console.error("Tidak dapat melakukan updateAccountInfo: "+err);
            }
        }
        return {
            messages : "Account Dengan nama : "+profileDto.name+" Tidak ada"
        };
    }

    async deleteAccountInfo(name){
        if(await this.checkIsAvailableName(name)){
            try{
                const profile = await this._repository.deleteByName(name);
                if(profile){
                    return {
                        messages : "Account Dengan nama: "+name+" Berhasil di hapus"
                    };
                }
                return{
                    messages : "Account dengan nama: "+name+" Tidak ada"
                };
            }catch(err){
                console.log("Tidak bisa melakukan delete account info : "+err);
            }
        }
        return {
            messages: "Account dengan nama: "+name+" Tidak ada"
        };
    }

}

module.exports = new ProfileService(new ProfileRepository);