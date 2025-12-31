import { readDB } from "../utils/readFileDb.js";
import { writeDB } from "../utils/writeFileDb.js";

const fileName = "categories.json";

export async function getAllCategoriesService() {
  const data = await readDB(fileName);
  return data || [];
}

export async function getCategoryByUserIdService(id) {
  const data = await readDB(fileName);

  const item = data.filter((obj) => obj.userId === id);
  return item || null;
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
  return true;
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