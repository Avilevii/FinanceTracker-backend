import { readDB } from "../utils/readFileDb.js";
import { writeDB } from "../utils/writeFileDb.js";

const fileName = 'recurring.json';

export async function getAllRecurringService() {
  const data = await readDB(fileName);
  return data || [];
}

export async function getRecurringByIdService(id) {
  const data = await readDB(fileName);
  const item = data.find(obj => obj.id === id);
  return item || null;
}

export async function createRecurringService(newRecurring) {
  const data = await readDB(fileName);
  data.push(newRecurring);
  await writeDB(fileName, data);
  return true;
}

export async function updateRecurringService(id, newRecurring) {
  const data = await readDB(fileName);
  const index = data.findIndex(obj => obj.id === id);
  if (index === -1) return false;
  data[index] = newRecurring;
  await writeDB(fileName, data);
  return true;
}

export async function deleteRecurringService(id) {
  const data = await readDB(fileName);
  const index = data.findIndex(obj => obj.id === id);
  if (index === -1) return false;
  data.splice(index, 1);
  await writeDB(fileName, data);
  return true;
}
