class Birthday{
    constructor(birthday){
        this._birthday=birthday;
    }

    get birthday(){
        return this._birthday;
    }
    
    setBirthday(birthday){
        this._birthday= birthday;
    }
}

module.exports = Birthday;