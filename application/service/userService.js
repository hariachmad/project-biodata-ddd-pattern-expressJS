const UserRepository = require('../../domain/repository/userRepository');
const User = require('../../domain/entities/user');

class UserService{
    constructor(repository){
        this._repository=repository;
    }

    async checkIsAvailableName(name){
        const user = await this._repository.findByName(name);
        console.log("User Hasil CheckIsAvailbaleName "+name+" "+user);
        if(user){
            console.log("CheckIsAvailable mengembalikan True");
            return user;
        }
        console.log("CheckIsAvailable mengembalikan false");
        return false;
    }

    async register(name,address,birthday){
        if (!(await this.checkIsAvailableName(name))){
            const user= new User(name,birthday,address);
            console.log("in function register : address :"+user.address);
            console.log("in function register : birthday :"+user.birthday);
            await this._repository.save(user);
            return {
                messages : "Data untuk nama : "+name+" Telah berhasil di save"
            };
        }
        return {
            messages : "Data untuk nama: "+name+" sudah ada."
        };  
    }

    async getAccountInfo(name){
        if((await this.checkIsAvailableName(name))){
            const user = await this.checkIsAvailableName(name);
            return {
                name : user.name,
                address : user.address,
                birthday : user.birthday
            };
        }
        return {
            messages : "Account Dengan nama : "+name+" Tidak ada"
        };
    }

    async updateAccountInfo(name,address,birthday){
        if(await this.checkIsAvailableName(name)){
            try{
            const user=await this._repository.updateByName(name,address,birthday);
            return {
                messages : "Account Dengan nama "+name+" Berhasil di update"
            };
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
                const user = await this._repository.deleteByName(name);
                if(user){
                    return {
                        messages : "Account Dengan nama: "+name+" Berhasil di hapus"
                    };
                }
            }catch(err){
                console.log("Tidak bisa melakukan delete account info : "+err);
            }
        }
    }

}

module.exports = new UserService(new UserRepository);