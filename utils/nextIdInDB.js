import { readDB } from "./readFileDb.js";

export async function getNextId(fileName){
    const categories = await readDB(fileName);
    if(!categories || categories.length === 0) return 1;
    let maxId = 0;
    for(const item of categories){
        if(item.id > maxId){
            maxId = item.id
        }
    }
    return maxId + 1;
}