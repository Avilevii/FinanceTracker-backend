import { readDB } from "../utils/readFileDb.js";
import { totalcalculet } from "../utils/totalcalculet.js";

const historyDB = 'history.json';
const categoriesDB = 'categories.json';

// פונקציה שמחזירה את כל ההוצאות וההכנסות של אותו שבוע, וגם כל הקטגוריות של אותו שבוע
export async function getLastweekHistory(userId){
    const data = await readDB(historyDB);
    const categories = await readDB(categoriesDB)
    const total = totalcalculet(data, categories,userId);
    return total;
}

// פונקציה שמחזירה את כל ההוצאות וההכנסות של אותו החודש, וגם את כל הקטגוריות של אותו חודש 
export async function getLastMonthHistory(){

}

// פונקציה שמחזירה את כל ההוצאות וההכנסות מההיסטוריה, וגם את כל הקטגוריות 
export async function getAllHistory(){

}
async function test() {
  const result = await getLastweekHistory(4);
  console.log(result); // יציג { income: xxx, expenses: yyy }
}

test();