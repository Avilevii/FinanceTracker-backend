import { dateToNumber, stringToDate } from "../utils/dateToarray.js";
import { readDB } from "../utils/readFileDb.js";
import { totalcalculet } from "../utils/totalcalculet.js";

const historyDB = "history.json";
const categoriesDB = "categories.json";

// פונקציה שמחזירה את כל ההוצאות וההכנסות של אותו שבוע, וגם כל הקטגוריות של אותו שבוע
export async function getLastweekHistory(userId) {
  const data = await readDB(historyDB);
  const categories = await readDB(categoriesDB);
  const total = totalcalculet(data, categories, userId);
  return total || {};
}

// פונקציה שמחזירה את כל ההוצאות וההכנסות של אותו החודש, וגם את כל הקטגוריות של אותו חודש
export async function getHistoryByMonth(userId, month, year) {
  const history = await readDB(historyDB);
  const categories = await readDB(categoriesDB);

  const filteredByMonth = history.filter((item) => {
    if (item.userId !== userId) return false;

    const [datePart] = item.date.split(" ");
    const [, itemMonth, itemYear] = datePart.split("/").map(Number);

    return itemMonth === month && itemYear === year;
  });

  if (filteredByMonth.length === 0) return null;

  const summary = totalcalculet(filteredByMonth, categories);

  return {
    history: filteredByMonth,
    summary,
  };
}

// פונקציה שמחזירה היסטוריה לפי תאריכים.
export async function getHistoryByRangeDates(startDate, endDate, userId) {
  const history = await readDB(historyDB);
  const categories = await readDB(categoriesDB);
  
  const { startNum, endNum } = dateToNumber(startDate, endDate);

  const filteredHistory = history.filter((item) => {

    if (item.userId !== userId) return false;

    const [datePart,] = item.date.split(" ");
    const currentDate = stringToDate(datePart);
    return currentDate >= startNum && currentDate <= endNum;
  });

  if( filteredHistory.length === 0) return null;

  const summery = totalcalculet(filteredHistory, categories);

  return {
    history: filteredHistory,
    summery
  }
}
