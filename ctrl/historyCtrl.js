import {
  getAllHistoryService,
  createHistoryService,
  updateHistoryService,
  deleteHistoryService,
  getHistoryByUserIdService,
  getHistoryByIdService,
} from "../services/historyService.js";
import { getFormattedDate } from "../utils/getFormDate.js";
import { getNextId } from "../utils/nextIdInDB.js";

const fileName = "history.json";

export async function getAllHistoryCtrl(req, res) {
  try {
    const history = await getAllHistoryService();
    if (history.length === 0)
      return res.status(404).json({ msg: "history is not exist" });
    res.status(200).json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function getHistoryByUserIdCtrl(req, res) {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ msg: "ID must be a number" });
    }

    const history = await getHistoryByUserIdService(userId);
    if (!history) {
      return res.status(404).json({ msg: "History not found" });
    }

    res.status(200).json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function createHistoryCtrl(req, res) {
  try {
    const { userId, amount, categoryId, description, clientDate} = req.body;
    if (
      userId === undefined ||
      amount === undefined ||
      categoryId === undefined ||
      !description
    ) {
      return res.status(400).json({
        msg: "All fields are required: userId, amount, categoryId, description",
      });
    }

    if (
      isNaN(Number(userId)) ||
      isNaN(Number(amount)) ||
      isNaN(Number(categoryId))
    ) {
      return res.status(400).json({
        msg: "userId, amount and categoryId must be numbers",
      });
    }

    const allowedKeys = ["userId", "amount", "categoryId", "description", 'clientDate'];
    const bodyKeys = Object.keys(req.body);
    const isValid = bodyKeys.every((key) => allowedKeys.includes(key));
    if (!isValid) {
      return res.status(400).json({ msg: "Invalid fields in request body" });
    }

    const id = await getNextId(fileName);
    const date = clientDate ? clientDate : getFormattedDate();

    const newHistory = {
      id,
      userId: Number(userId),
      amount: Number(amount),
      categoryId: Number(categoryId),
      description,
      date
    };
    await createHistoryService(newHistory);
    res.status(200).json({ msg: "History added successfully", createdHistory: newHistory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function updateHistoryCtrl(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ msg: "ID must be a number" });
    }

    const history = await getHistoryByIdService(id);
    if (!history) {
      return res.status(404).json({ msg: "History not found" , history});
    }

    const { userId, amount, categoryId, description, date } = req.body;

    const updatedHistory = {
      ...history,
      ...(userId !== undefined && { userId: Number(userId) }),
      ...(amount !== undefined && { amount: Number(amount) }),
      ...(categoryId !== undefined && { categoryId: Number(categoryId) }),
      ...(description && { description })
    };

    await updateHistoryService(id, updatedHistory);
    res.status(200).json({ msg: "History updated successfully", updatedHistory  });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function deleteHistoryCtrl(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ msg: "ID must be a number" });
    }

    const isDeleted = await deleteHistoryService(id);
    if (!isDeleted) {
      return res.status(404).json({ msg: "History not found" });
    }

    res.status(200).json({ msg: "History deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}
