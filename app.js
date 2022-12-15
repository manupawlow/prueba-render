const { Spot } = require('@binance/connector');

const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World! 3')
})

app.get('/wallet', async (req, res) => {
  try {
    const client = new Spot(req.query.apiKey,  req.query.secretKey, { baseURL: 'https://api.binance.com' });
    const walletResponse = await client.account();
    // console.log('wallet data', walletResponse.data.balances)
    res.json(walletResponse.data.balances)
  } catch(err) {
    // console.log('err', err.response.data)
    res.status(500).send(err.response.data)
  }
})

app.post('/newOrder', async (req, res) => {
  try {

    console.log('body request: ', req.body.symbol, req.body.side, req.body.type, req.body.options)

    const client = new Spot(req.body.apiKey, req.body.secretKey, { baseURL: req.body.url });
    
    let order = await client.newOrder(req.body.symbol, req.body.side, req.body.type, req.body.options)
    
    console.log(order.data)

    res.status(200).send(order.data)
  } catch(err) {
    console.log('err', err.response.data)
    res.status(500).send(err.response.data)
  }
})

/*
const client = new Spot(user.apiKey, decryptedApiSecret, { baseURL: 'https://api.binance.com' });
            // const walletResponse = await client.account();
*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})