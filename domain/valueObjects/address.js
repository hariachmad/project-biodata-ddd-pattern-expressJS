class Address{
    constructor(street,city,state){
        this._street=street,
        this._city=city,
        this._state=state
    }

    get address(){
        return this._street+"-"+this._city+"-"+this._state
    }

    setAdress(street,city,state){
        this._street=street,
        this._city=city,
        this._state= state
    }
}

module.exports = Address;