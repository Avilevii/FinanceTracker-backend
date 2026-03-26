import {
  getHistoryByMonth,
  getHistoryByRangeDates,
  getLastweekHistory,
} from "../services/transactionsService.js";

export async function getDataOfPeriod(req, res) {
  try {
    const userId = Number(req.params.userId);
    const { period, month, year, startDate, endDate } = req.query;
    if (period === "week") {
      const dataOfWeek = await getLastweekHistory(id);
      res.status(200).json(dataOfWeek);
    } else if (period === "month") {
      if (!month || !year || !userId) {
        return res.status(400).json({
          msg: "month and year are required",
        });
      }

      const data = await getHistoryByMonth(userId, Number(month), Number(year));
      if (!data)
        return res.status(400).json({ msg: "month or year is not found" });

      return res.status(200).json(data);
    } else if (period === "all") {


    } else if (period === "rangeDates") {
      if (!userId || !startDate || !endDate)
        return res
          .status(400)
          .json({
            msg: "start date and end date and user ID musb be required",
          });

        const data = await getHistoryByRangeDates(startDate, endDate, userId);
        if(!data) return res.status(400).json({msg: 'cannot found data'});

        res.status(200).json(data);

    } else {
      res.status(404).json({ msg: `cannot name ${period}` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error from server" });
  }
}
