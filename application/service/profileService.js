const ProfileRepository = require('../../domain/repository/profileRepository');
const Profile = require('../../domain/aggregates/profile');

class ProfileService{
    constructor(repository){
        this._repository=repository;
    }

    async checkIsAvailableName(name){
        try{
            const profile = await this._repository.findByName(name);
            console.log("Profile Hasil CheckIsAvailableName "+name+" "+profile);
            if(profile){
                console.log("CheckIsAvailable mengembalikan True");
                return profile;
            }
            console.log("CheckIsAvailable mengembalikan false");
            return false;
        }catch(err){
        console.error("Tidak bisa menjalankan fungsi checkIsAvailableName: "+err);
        }
    }

    async register(name,address,birthday){
        if (!(await this.checkIsAvailableName(name))){
            try{
                const profile= new Profile(name,address,birthday);
                console.log("in function register : address :"+profile.profileDetails);
                console.log("in function register : birthday :"+profile.profileDetails);
                await this._repository.save(profile);
                return {
                    messages : "Data untuk nama : "+name+" Telah berhasil di save"
                };
            }catch(err){
                console.error("Tidak bisa menjalankan register: "+err);
            }
        }
        return {
            messages : "Data untuk nama: "+name+" sudah ada."
        };  
    }

    async getAccountInfo(name){
        if((await this.checkIsAvailableName(name))){
            try{
                const profile= await this.checkIsAvailableName(name);
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

    async updateAccountInfo(name,address,birthday){
        if(await this.checkIsAvailableName(name)){
            try{
                const profile = new Profile(name,address,birthday)
                const updated = await this._repository.updateByName(profile);
                if (updated){
                    return {
                        messages : "Account Dengan nama "+name+" Berhasil di update"
                    };
                }
                throw new Error("updated tidak ada");
                
            }catch(err){
                console.error("Tidak dapat melakukan updateAccountInfo: "+err);
            }
        }
        return {
            messages : "Account Dengan nama : "+name+" Tidak ada"
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
                }
            }catch(err){
                console.log("Tidak bisa melakukan delete account info : "+err);
            }
        }
    }

}

module.exports = new ProfileService(new ProfileRepository);