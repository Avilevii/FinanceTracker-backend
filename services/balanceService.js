import { getAllCategoriesService } from "./categoriesService.js";
import { getAllHistoryService } from "./historyService.js";

export async function getBalanceService(targetId) {
  let income = 0;
  let expenses = 0;

  const history = await getAllHistoryService();
  const categories = await getAllCategoriesService();

  const userHistory = history.filter(h => h.userId === targetId);
  const userCategories = categories.filter(c => c.userId === targetId);

  userHistory.forEach(({ amount, categoryId }) => {
    const category = userCategories.find(c => c.id === categoryId);
    if (!category) return;

    if (category.categoryType === 'income') {
      income += amount;
    } else if (category.categoryType === 'expenses') {
      expenses += amount;
    }
  });
  const balance = income - expenses;
  return balance ;
}
