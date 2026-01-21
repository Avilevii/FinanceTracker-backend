export const stringToDate = (strDate) => {
    const [day, month, year] = strDate.split('/').map(Number);
    const numDate = year * 10000 + month * 100 + day;
    return numDate;
}

export const dateToNumber = (startDate, endDate) => {
  const startNum = stringToDate(startDate);
  const endNum = stringToDate(endDate)

  return { startNum, endNum };
};
