import axios from 'axios';
import { Request, Response } from 'express';

const ApiDaApi = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,EUR,DOGE,LTC,DOT,BNB,USD,SOL&tsyms=BRL&api_key=46365058241ada39c394eac5f0169c15f30f1b0172a937c54e8e2f48063cfb0a"
const ApiDaApiHistorico = (moeda: string) => `https://min-api.cryptocompare.com/data/v2/histominute?fsym=${moeda}&tsym=BRL&limit=10&api_key=46365058241ada39c394eac5f0169c15f30f1b0172a937c54e8e2f48063cfb0a`

class GetCoins {
    static listaCoins = async ( _: Request, res: Response ) => {
        try {
            const coins = await axios.get(ApiDaApi) 
            res.status(200).json(coins.data)
        } catch {
            res.status(500).send({ message: 'Servidor das crypto moedas fora do ar' })
        }
    }

    static historicoCoins = async ( req: Request, res: Response ) => {
        try{
            const obj = req.params
            const moeda = obj.id
            const historico = await axios.get(ApiDaApiHistorico(moeda))
            const openValues = historico.data.Data.Data.map((obj: {time: number, open: number}) => [new Date(obj.time * 1000), obj.open])
            res.status(200).json(openValues)
        }catch{
            res.status(500).send({ message: 'Servidor das crypto moedas fora do ar' })
        }
    }
}

export default GetCoins;