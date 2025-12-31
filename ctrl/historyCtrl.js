import {
  getAllHistoryService,
  getHistoryByIdService,
  createHistoryService,
  updateHistoryService,
  deleteHistoryService,
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

export async function getHistoryByIdCtrl(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ msg: "ID must be a number" });
    }

    const history = await getHistoryByIdService(id);
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
    const { userId, amount, categotyId, description} = req.body;

    if (
      userId === undefined ||
      amount === undefined ||
      categotyId === undefined ||
      !description
    ) {
      return res.status(400).json({
        msg: "All fields are required: userId, amount, categotyId, description",
      });
    }

    if (
      isNaN(Number(userId)) ||
      isNaN(Number(amount)) ||
      isNaN(Number(categotyId))
    ) {
      return res.status(400).json({
        msg: "userId, amount and categotyId must be numbers",
      });
    }

    const allowedKeys = ["userId", "amount", "categotyId", "description"];
    const bodyKeys = Object.keys(req.body);
    const isValid = bodyKeys.every((key) => allowedKeys.includes(key));
    if (!isValid) {
      return res.status(400).json({ msg: "Invalid fields in request body" });
    }

    const id = await getNextId(fileName);
    const date = getFormattedDate();

    const newHistory = {
      id,
      userId: Number(userId),
      amount: Number(amount),
      categoryId: Number(categotyId),
      description,
      date
    };

    await createHistoryService(newHistory);
    res.status(200).json({ msg: "History added successfully" });
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
      return res.status(404).json({ msg: "History not found" });
    }

    const { userId, amount, categotyId, description, date } = req.body;

    const updatedHistory = {
      ...history,
      ...(userId !== undefined && { userId: Number(userId) }),
      ...(amount !== undefined && { amount: Number(amount) }),
      ...(categotyId !== undefined && { categotyId: Number(categotyId) }),
      ...(description && { description })
    };

    await updateHistoryService(id, updatedHistory);
    res.status(200).json({ msg: "History updated successfully" });
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
