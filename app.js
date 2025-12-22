import express from "express";
import userRoute from "./routes/usersRoute.js";
import categoriesRoute from "./routes/categoriesRoute.js";
import historyRoute from "./routes/historyRoute.js";
import recurringrRoute from "./routes/recurringRoute.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/users", userRoute);
app.use("/categories", categoriesRoute);
app.use("/history", historyRoute);
app.use("/recurring", recurringrRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
