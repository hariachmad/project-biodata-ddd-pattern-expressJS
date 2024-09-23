class ProfileDto{
    constructor(name,address,birthday){
        this._name=name;
        this._address=address,
        this._birthday=birthday
    }

    get name(){
        return this._name;
    }
    get address(){
        return this._address;
    }
    get birthday(){
        return this._birthday;
    }
}

module.exports= ProfileDto;