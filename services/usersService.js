import { readDB } from "../utils/readFileDb.js";
import { writeDB } from "../utils/writeFileDb.js";

const fileName = "users.json";

export async function getAllUsersService() {
  const data = await readDB(fileName);
  return data || [];
}

export async function getUserByIdService(id) {
  const data = await readDB(fileName);
  const item = data.find((obj) => obj.id === id);
  return item || null;
}

export async function createUserService(newUser) {
  const data = await readDB(fileName);
  data.push(newUser);
  await writeDB(fileName, data);
  return true;
}

export async function updateUserService(id, newUser) {
  const data = await readDB(fileName);
  const index = data.findIndex((obj) => obj.id === id);
  if (index === -1) return false;
  data[index] = newUser;
  await writeDB(fileName, data);
  return true;
}

export async function deleteUserService(id) {
  const data = await readDB(fileName);
  const index = data.findIndex((obj) => obj.id === id);
  console.log(index);
  if (index === -1) return false;
  data.splice(index, 1);
  await writeDB(fileName, data);
  return true;
}

// פונקציית בדיקה
async function test() {
  const result = await deleteUserService(1);
  console.log(result); // true אם נמחק, false אם לא מצא
}

test();
