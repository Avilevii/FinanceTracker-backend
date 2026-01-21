export function totalcalculet(history, categories) {
  let income = 0;
  let expenses = 0;

  history.forEach(item => {
    const cat = categories.find(c => c.id === item.categoryId);
    if (!cat) return;

    if (cat.categoryType === "income") {
      income += Number(item.amount);
    } else {
      expenses += Number(item.amount);
    }
  });

  return { income, expenses };
}
