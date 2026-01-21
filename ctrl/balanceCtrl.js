import { getBalanceService } from "../services/balanceService.js";

export async function getBalanceCtrl(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ msg: "You must enter vlaue" });
    const balance = await getBalanceService(id);
    res.status(200).json( {msg: "Success", balance})
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
}
