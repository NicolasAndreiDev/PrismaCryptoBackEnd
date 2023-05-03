import express from 'express';
import routes from './routes';
import cors from 'cors';
import { url } from 'inspector';

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}))
routes(app);

export default app;