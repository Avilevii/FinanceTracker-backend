import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function writeDB(fileName, data) {
  const filePath = path.join(__dirname, '..', "DB", fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
