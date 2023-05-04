import { Request, Response } from "express"
import prisma from "../prisma";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class LoginController {
    static logar = async (req: Request, res: Response) => {
        try {
            const jwtSecret = process.env.JWT_SECRET

            const { email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            const token = jwt.sign({userId: user.id}, jwtSecret!, { expiresIn: '1d' });
            res.json( token );
        } catch(err){
            console.log(err)
            res.status(500).send({message: 'Erro com o servidor'})
        }
    }
}

export default LoginController