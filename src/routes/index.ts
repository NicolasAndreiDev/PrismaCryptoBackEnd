import express, { Application } from 'express';
import users from './userRoute'
import coins from './cryptoRoute'
import login from './loginRoute'

const routes = (app: Application) => {
    app.use(
        express.json(),
        users,
        coins,
        login
    )
}

export default routes