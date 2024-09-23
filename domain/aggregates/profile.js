const Name = require('../valueObjects/name');
const Address = require('../valueObjects/address');
const Birthday = require('../valueObjects/birthday');

class Profile{
    constructor(name,address,birthday){
        this._name = new Name(name);
        this._address = new Address(address.street,address.city,address.state);
        this._birthday = new Birthday(birthday);
    }
    setName(name){
        this._name = new Name(name);
    }

    setAddress(street,city,state){
        this._address= new Address(street,city,state);
    }

    setBirthday(birthday){
        this._birthday= new Birthday(birthday);
    }

    get profileDetails(){
        return {
            name : this._name.name,
            address : this._address.address,
            birthday : this._birthday.birthday
        }
    }
}

module.exports = Profile;