import express, { Application } from 'express';
import cors from 'cors';
import router from './src/router/router';

const app: Application = express();
const PORT: number = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});