import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function readDB(fileName) {
  const filePath = path.join(__dirname, '..', "DB", fileName);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}
