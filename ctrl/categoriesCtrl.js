import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
} from "../services/categoriesService.js";
import { getNextId } from "../utils/nextIdInDB.js";

const fileName = "categories.json";

export async function getAllCategoriesCtrl(req, res) {
  try {
    const categories = await getAllCategoriesService();
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error from catch getAllUsers", err);
    res.status(500).json({ Error: "בקשתך נכשלה!" });
  }
}

export async function getCategoryByIdCtrl(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ msg: "You must enter vlaue" });
    const data = await getCategoryByIdService(id);
    if (!data) {
      res.status(404).json({ msg: "Category is not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function createCategoryCtrl(req, res) {
  try {
    const { uId, categoryName, categoryType } = req.body;
    if (!uId || !categoryName || !categoryType) {
      return res.status(400).json({
        msg: "All fields are required: uId, categoryName, categoryType",
      });
    }

    const allowedKeys = ["uId", "categoryName", "categoryType"];
    const bodyKeys = Object.keys(req.body);

    const isValid = bodyKeys.every((key) => allowedKeys.includes(key));
    if (!isValid) {
      return res.status(400).json({ msg: "Invalid fields in request body" });
    }

    const userId = Number(uId);
    if (isNaN(userId)) {
      return res.status(400).json({ msg: "uId must be a number" });
    }
    const id = await getNextId(fileName);
    const newCategory = {
      id,
      uId,
      categoryName,
      categoryType,
    };
    await createCategoryService(newCategory);
    res.status(200).json({ msg: "Category added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function updateCategoryCtrl(req, res) {
  try {
    const id = Number(req.params.id);
    const { categoryName, categoryType } = req.body;
    if (!id)
      return res.status(400).json({ msg: "You must enter an id value " });
    const category = await getCategoryByIdService(id);
    if (!category)
      return res.status(400).json({ msg: "category is not found" });
    const updateCategory = {
      ...category,
      ...(categoryName && { categoryName }),
      ...(categoryType && { categoryType }),
    };
    await updateCategoryService(id, updateCategory);
    res.status(200).json({ msg: "Category updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function deleteCategoryCtrl(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id)
      return res.status(400).json({ msg: "You must enter an id value " });
   const isDeleted =  await deleteCategoryService(id);
   if(!isDeleted) res.status(400).json({msg: "category is not exist"})
    res.status(200).json({msg: "category delted successfully"})
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}
