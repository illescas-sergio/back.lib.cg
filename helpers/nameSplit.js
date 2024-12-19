

const nameSplit = (author) => {

    const [nombre, apellido] = author.split(' ')

    return {first_name: nombre, last_name: apellido }
}

module.exports = {
    nameSplit
}