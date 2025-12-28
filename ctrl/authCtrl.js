import { getAllUsersService } from "../services/usersService.js";

export async function loginCtrl({body}, res) {
  try {
    const { userName, password } = body;
    if (!userName || !password)
      return res.status(400).json({ msg: "you must enter all fields" });
    const users = await getAllUsersService();
    if (users.length === 0) return res.status(404).json({ msg: "You need to signUp" });
    const user = users.find(
      u => u.userName === userName && u.password === password
    );
    if(!user) return res.status(401).json({msg: "userName or password is error"});
    res.status(200).json({msg: "you conected successfully",user: user.id})
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "בקשתך נכשלה !" });
  }
}
