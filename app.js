import express from "express";
import userRoute from "./routes/usersRoute.js";
import categoriesRoute from "./routes/categoriesRoute.js";
import historyRoute from "./routes/historyRoute.js";
import recurringrRoute from "./routes/recurringRoute.js";
import authRoute from "./routes/authRoute.js";
import transaction from "./routes/transactions.js"
import balanceRout from './routes/balanceRout.js';
import cors from "cors";


const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());
app.use("/users", userRoute);
app.use("/categories", categoriesRoute);
app.use("/history", historyRoute);
app.use("/recurring", recurringrRoute);
app.use("/auth", authRoute);
app.use("/",transaction );
app.use("/balance", balanceRout)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
