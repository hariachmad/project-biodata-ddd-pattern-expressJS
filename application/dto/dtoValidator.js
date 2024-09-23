function dtoValidator(profileDto){
    const errors = [];

    if(!(Object.keys(profileDto.address).length = 3) || !profileDto.address){
        errors.push("profileDto.address harus mempunyai 3 keys");
    }

    return errors,length ? errors : null ;
}

module.exports  = {dtoValidator};