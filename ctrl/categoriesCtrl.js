import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
} from "../services/categoriesService.js";
import { getFormattedDate } from "../utils/getFormDate.js";
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
    const { userId, categoryName, categoryType, iconName } = req.body;
    if (!userId || !categoryName || !categoryType || ! iconName) {
      return res.status(400).json({
        msg: "All fields are required: userId, categoryName, categoryType, iconName",
      });
    }

    const allowedKeys = ["userId", "categoryName", "categoryType", "iconName"];
    const bodyKeys = Object.keys(req.body);

    const isValid = bodyKeys.every((key) => allowedKeys.includes(key));
    if (!isValid) {
      return res.status(400).json({ msg: "Invalid fields in request body" });
    }

    const uId = Number(userId);
    if (isNaN(uId)) {
      return res.status(400).json({ msg: "userId must be a number" });
    }
    const id = await getNextId(fileName);
    const date = getFormattedDate();
    const newCategory = {
      id,
      userId: uId,
      categoryName,
      categoryType,
      iconName,
      date
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
    const {userId, categoryName, categoryType, iconName } = req.body;
    if (!id)
      return res.status(400).json({ msg: "You must enter an id value " });
    const category = await getCategoryByIdService(id);
    if (!category)
      return res.status(400).json({ msg: "category is not found" });
    const updateCategory = {
      ...category,
      ...(userId && {userId}),
      ...(categoryName && { categoryName }),
      ...(categoryType && { categoryType }),
      ...(iconName && {iconName})
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
