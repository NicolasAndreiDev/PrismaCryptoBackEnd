import express from 'express';
import UserController from '../controllers/userController';
import FavCoinsController from '../controllers/favCoinsController';

const router = express.Router();

router
    .get("/users", UserController.listaUsers)
    .get("/users/:id", UserController.userById)
    .get("/users/favcoins/:id", FavCoinsController.listaFavCoinsPorId)
    .post("/users", UserController.createUser)
    .put("/users/:id", UserController.updateUser)
    .delete("/users/:id", UserController.deleteUser)
    .delete("/users/favcoins/:id/:id", FavCoinsController.deleteFavCoin)

export default router;