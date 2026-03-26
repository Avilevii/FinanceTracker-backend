import {
  getAllRecurringService,
  getRecurringByIdService,
  createRecurringService,
  updateRecurringService,
  deleteRecurringService,
} from "../services/recurringService.js";
import { getFormattedDate } from "../utils/getFormDate.js";
import { getNextId } from "../utils/nextIdInDB.js";

const fileName = "recurring.json";

export async function getAllRecurringCtrl(req, res) {
  try {
    const recurring = await getAllRecurringService();
    if(recurring.length === 0) return res.status(404).json({msg: "recurring is not exist"});
    res.status(200).json(recurring);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function getRecurringByIdCtrl(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ msg: "ID must be a number" });
    }

    const recurring = await getRecurringByIdService(id);
    if (!recurring) {
      return res.status(404).json({ msg: "Recurring not found" });
    }

    res.status(200).json(recurring);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function createRecurringCtrl(req, res) {
  try {
    const { userId, categpryId, amaunt, startDate } = req.body;

    if (
      userId === undefined ||
      categpryId === undefined ||
      amaunt === undefined ||
      !startDate
    ) {
      return res.status(400).json({
        msg: "All fields are required: userId, categpryId, amaunt, startDate",
      });
    }

    if (
      isNaN(Number(userId)) ||
      isNaN(Number(categpryId)) ||
      isNaN(Number(amaunt))
    ) {
      return res.status(400).json({
        msg: "userId, categpryId and amaunt must be numbers",
      });
    }

    const allowedKeys = ["userId", "categpryId", "amaunt", "startDate"];
    const bodyKeys = Object.keys(req.body);
    const isValid = bodyKeys.every((key) => allowedKeys.includes(key));
    if (!isValid) {
      return res.status(400).json({ msg: "Invalid fields in request body" });
    }

    const id = await getNextId(fileName);
    const date = getFormattedDate();

    const newRecurring = {
      id,
      userId: Number(userId),
      categpryId: Number(categpryId),
      amaunt: Number(amaunt),
      startDate,
      date,
    };

    await createRecurringService(newRecurring);
    res.status(200).json({ msg: "Recurring created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function updateRecurringCtrl(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ msg: "ID must be a number" });
    }

    const recurring = await getRecurringByIdService(id);
    if (!recurring) {
      return res.status(404).json({ msg: "Recurring not found" });
    }

    const { userId, categpryId, amaunt, startDate } = req.body;

    const updatedRecurring = {
      ...recurring,
      ...(userId !== undefined && { userId: Number(userId) }),
      ...(categpryId !== undefined && { categpryId: Number(categpryId) }),
      ...(amaunt !== undefined && { amaunt: Number(amaunt) }),
      ...(startDate && { startDate }),
    };

    await updateRecurringService(id, updatedRecurring);
    res.status(200).json({ msg: "Recurring updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function deleteRecurringCtrl(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ msg: "ID must be a number" });
    }

    const isDeleted = await deleteRecurringService(id);
    if (!isDeleted) {
      return res.status(404).json({ msg: "Recurring not found" });
    }

    res.status(200).json({ msg: "Recurring deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}
