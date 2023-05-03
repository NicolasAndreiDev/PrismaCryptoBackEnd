import express from 'express';
import GetCoins from '../api';

const router = express.Router();

router
    .get("/coins", GetCoins.listaCoins)
    .get("/coins/historico/:id", GetCoins.historicoCoins)

export default router;