export function totalcalculet(data, categories, userId) {
  let income = 0;
  let expenses = 0;
  const categoryDetails = [];

  const userTransactions = data.filter((item) => item.userId === userId);

  userTransactions.forEach((item) => {
    const cat = categories.find((c) => c.id === item.categoryId);
    if (!cat) return;

    categoryDetails.push({
      name: cat.categoryName,
      amount: Number(item.amount),
      type: cat.categoryType
    });


    if (cat.categoryType === "income") {
      income += Number(item.amount);
    } else if (cat.categoryType === "expense") {
      expenses += Number(item.amount);
    }
  });

  return { income, expenses, categories: categoryDetails };
}
