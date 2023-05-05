import prisma from "../prisma"
import { Request, Response } from 'express'

class UserController {
    static listaUsers = async (_: Request, res: Response) => {
        try {
            const users = await prisma.user.findMany();
            res.status(200).json(users);
        } catch {
            res.status(400).json({ message: 'Erro ao buscar pelos usuários' })
        }
    }

    static userById = async (req: Request, res: Response) => {
        try{
            const id = req.params
            const user = await prisma.user.findFirst({
                where: id
            })
            res.status(200).json(user);
        }catch{
            res.status(400).json({message: 'Usuário não encontrado'})
        }
    }

    static createUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            const user = await prisma.user.create({
                data: {
                    email,
                    password,
                }
            })

            res.status(201).json(user)
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: 'Erro na criação do usuário' })
        }
    }

    static updateUser = async (req: Request, res: Response) => {
        try {
            const { email, password, coin } = req.body
            const { id } = req.params

            const coinExist = await prisma.favCoin.findFirst({
                where: {
                    coin: coin,
                    userId: id
                }
            });

            if (coinExist?.coin === coin) {
                res.status(400).json({ message: 'Esse usuário já tem essa moeda como favorita' })
                return
            }

            await prisma.user.update({
                where: req.params,
                data: {
                    email,
                    password,
                    favcoins: {
                        create: {
                            coin
                        }
                    }
                },
            })

        } catch {
            res.status(400).json({ message: 'Erro ao atualizar o usuário' })
        }
        res.status(200).send({ message: 'Usuário atualizado com sucesso!' })
    }

    static deleteUser = async (req: Request, res: Response) => {
        try {
            await prisma.user.delete({
                where: req.params
            })
            res.status(200).send({ message: 'Usuário deletado com sucesso!' })
        } catch {
            res.status(400).json({ message: 'Erro ao buscar pelos usuários' })
        }
    }
}

export default UserController;