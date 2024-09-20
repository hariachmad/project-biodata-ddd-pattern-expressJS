class User{
    constructor(name,address,birthday){
        this._name = name;
        this._address = address;
        this._birthday = birthday;
    }

    get name(){
        return this._name;
    }
    get address(){
        return this._birthday;
    }
    get birthday(){
        return this._address;
    }
}

module.exports = User;