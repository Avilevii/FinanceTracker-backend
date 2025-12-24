import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../services/usersService.js";
import { getFormattedDate } from "../utils/getFormDate.js";
import { getNextId } from "../utils/nextIdInDB.js";

const fileName = "users.json";

export async function getAllUsersCtrl(req, res) {
  try {
    const users = await getAllUsersService();
    if (users.length === 0)
      return res.status(400).json({ msg: "Don't exist users in the system" });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function getUserByIdCtrl(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ msg: "You must enter vlaue" });
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ msg: "User is not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function createUserCtrl(req, res) {
  try {
    const { userName, password } = req.body;
    if (!userName || !password)
      return res.status(400).json({ msg: "You must enter all fields" });

    const allowedKeys = ["userName", "password"];
    const bodyKeys = Object.keys(req.body);

    const isValid = bodyKeys.every((key) => allowedKeys.includes(key));
    if (!isValid) {
      return res.status(400).json({ msg: "Invalid fields in request body" });
    }

    const id = await getNextId(fileName);
    const date = getFormattedDate();
    const newUser = {
      id,
      userName,
      password,
      date
    };
    await createUserService(newUser);
    res.status(200).json({ msg: "user added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function updateUserCtrl(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ msg: "You must enter an id value " });
    const { userName, password } = req.body;
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ msg: "user is not found" });
    const updateUser = {
      ...user,
      ...(userName && { userName }),
      ...(password && { password }),
    };
    await updateUserService(id, updateUser);
    res.status(200).json({ msg: "user updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}

export async function deleteUserCtrl(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ msg: "You must enter an id value" });
    const deleteUser = await deleteUserService(id);
    if (!deleteUser) return res.status(400).json({ msg: "user is not found" });
    res.status(200).json({ msg: "user deleted succssfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}
