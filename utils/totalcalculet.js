export function totalcalculet(data, categories, userId) {
  let income = 0;
  let expenses = 0;

  
  const userTransactions = data.filter(item => item.userId === userId);

  userTransactions.forEach(item => {
    const cat = categories.find(c => c.id === item.categotyId);
    if (!cat) return;

    if (cat.categoryType === 'income') {
      income += Number(item.amaunt);
    } else if (cat.categoryType === 'expense') {
      expenses += Number(item.amaunt);
    }
  });

  return { income, expenses };
}
