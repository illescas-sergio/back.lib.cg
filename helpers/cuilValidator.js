function cuilVal(cuil){
    
    const cuilFormat = /^\d{2}-\d{8}-\d{1}$/;

    return cuilFormat.test(cuil);
}

module.exports = {
    cuilVal
}
