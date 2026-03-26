import { readDB } from "../utils/readFileDb.js";
import { writeDB } from "../utils/writeFileDb.js";

const fileName = "categories.json";

export async function getAllCategoriesService() {
  const data = await readDB(fileName);
  return data || [];
}

export async function getCategoryByUserIdService(userId) {
  const data = await readDB(fileName);

  // 1. קטגוריות של המשתמש
  const userCategories = data.filter(
    c => c.userId === userId
  );

  // 2. דיפולטיביות שהמשתמש עדיין לא בחר
  const defaultCategories = data.filter(c => {
    if (c.userId !== 0) return false;

    const userHasIt = userCategories.some(
      uc => uc.iconName === c.iconName
    );

    return !userHasIt;
  });

  // 3. מחזירים הכל ביחד
  return [...defaultCategories, ...userCategories];
}

export async function getCategoryByIdService(id) {
  const data = await readDB(fileName);
  const category = data.find(obj => obj.id === id);
  return category || null;
}

export async function createCategoryService(newCategory) {
  const data = await readDB(fileName);

  data.push(newCategory);
  await writeDB(fileName, data);
  return true;
}

export async function updateCategoryService(id, updateCategory) {
  const data = await readDB(fileName);
  const index = data.findIndex((obj) => obj.id === id);
  if (index === -1) return false;
  data[index] = updateCategory;
  await writeDB(fileName, data);
  return data[index];
}

export async function deleteCategoryService(id) {
  const data = await readDB(fileName);
  const index = data.findIndex((obj) => obj.id === id);
  if (index === -1) return false;
  data.splice(index, 1);
  await writeDB(fileName, data);
  return true;
}

async function test(){
   const data =  await deleteCategoryService(2);
}

test()