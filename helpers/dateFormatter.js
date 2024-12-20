// function dateFormatter(fecha){

//     const date = new Date(fecha)
//     return date.toISOString()
// }

function dateFormatter(str) {
    
    const [day, month, year] = str.split('/');
  
    let fullYear;
  
    if (year.length === 4) {
      fullYear = year;
    } else {

        const currentYear = new Date().getFullYear();
  
        fullYear = (parseInt(year) > currentYear % 100) ? ('19' + year) : ('20' + year);     }
  
    const transformedDate = new Date(`${fullYear}-${month}-${day}`);
  
    return transformedDate.toISOString();
}

module.exports = {
    dateFormatter
}
