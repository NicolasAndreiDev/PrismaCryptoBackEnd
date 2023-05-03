import app from "./src/app";

const port = process.env.PORT || 4000;

app.listen(4000, () => {
    console.log(`Servidor rodando em http://localhost:${port}/users`)
})