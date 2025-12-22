import express from 'express';
import userRout from './routes/usersRout.js';
import categoriesRoutRout from './routes/categoriesRout.js';
import historyRout from './routes/historyRout.js';
import recurringrRout from './routes/recurringRout.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRout);
app.use('/categories', categoriesRoutRout);
app.use('/history', historyRout);
app.use('/recurring', recurringrRout)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})