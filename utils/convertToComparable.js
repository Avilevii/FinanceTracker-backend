function convertToComparable(str) {
  const [datePart, timePart] = str.split(' ');
  const [day, month, year] = datePart.split('/'); 
  return `${year}-${month}-${day} ${timePart}`;  
}
