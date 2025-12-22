import { readDB } from "../utils/readFileDb.js";
import { writeDB } from "../utils/writeFileDb.js";

const fileName = 'history.json';

export async function getAllHistoryService() {
  const data = await readDB(fileName);
  return data || [];
}

export async function getHistoryByIdService(id) {
  const data = await readDB(fileName);
  const item = data.find(obj => obj.id === id);
  return item || null;
}

export async function createHistoryService(newHistory) {
  const data = await readDB(fileName);
  data.push(newHistory);
  await writeDB(fileName, data);
  return true;
}

export async function updateHistoryService(id, newHistory) {
  const data = await readDB(fileName);
  const index = data.findIndex(obj => obj.id === id);
  if (index === -1) return false;
  data[index] = newHistory;
  await writeDB(fileName, data);
  return true;
}

export async function deleteHistoryService(id) {
  const data = await readDB(fileName);
  const index = data.findIndex(obj => obj.id === id);
  if (index === -1) return false;
  data.splice(index, 1);
  await writeDB(fileName, data);
  return true;
}
