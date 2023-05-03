import express, { Application } from 'express';
import users from './userRoute'
import coins from './cryptoRoute'

const routes = (app: Application) => {
    app.use(
        express.json(),
        users,
        coins
    )
}

export default routes