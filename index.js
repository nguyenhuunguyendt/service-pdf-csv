const express = require('express')
const app = express()
const router = require('./src/routers')
const { verifyToken } =require('./src/middlewares')

app.use(express.json())
app.use(verifyToken)

router(app)
app.get('/', (req, res) => {
  res.send(`${new Date()} Server is runing at port ${port}`)
})

const port = process.env.PORT || 6969
console.log(port)
app.listen(port, () => {
  console.log(`${new Date()} Server is runing at port ${port}`)
})
