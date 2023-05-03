import { Request, Response } from "express"
import prisma from "../prisma"

class FavCoinsController {
    static listaFavCoinsPorId = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id
            const favCoins = await prisma.favCoin.findMany({
                where: {
                    userId
                }
            });
            res.status(200).json(favCoins);
        } catch {
            res.status(400).send({ message: 'Erro ao buscar pelas favCoins' })
        }
    }
    static deleteFavCoin = async (req: Request, res: Response) => {
        try{
            const coinIdUser = req.params
            const favCoins = await prisma.favCoin.delete({
                where: coinIdUser
            })

            res.status(200).json(favCoins)
        }catch{
            res.status(400).json({message: 'Erro ao deletar uma moeda'})
        }
    }
}

export default FavCoinsController