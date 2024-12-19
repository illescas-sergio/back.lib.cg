function dniVal(dni){
    
    const dniFormat = /^\d{8}$/;

    return dniFormat.test(dni);
}

module.exports = {
    dniVal
}
