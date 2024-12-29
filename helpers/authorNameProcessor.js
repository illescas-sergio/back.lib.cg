const authorsSeparator = (str) => {

    const arr = str.split(',')
    
    const array = arr.map(el => el.trim())
    
    if(array.length <= 1){
        
        return []
    }
    
    return array
}

const nameSplit = (author) => {

    const [name, lastName] = author.split(' ')

    return {first_name: name, last_name: lastName }
}

module.exports = {
    authorsSeparator,
    nameSplit,
}