class Name{
    constructor(name){
        this._name=name;
    }

    get name(){
        return this._name;
    }
    
    setUserName(name){
        this._name= name;
    }
}

module.exports = Name;