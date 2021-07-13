import app from "./app.js"
import dotenv from 'dotenv/config'

const localPort = process.env.PORT || 8080;

app.listen(localPort, (req, res) => {
    console.log(`Server is running at localhost:${localPort}`)
})