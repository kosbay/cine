const request = require('request');
const btoa = require('btoa');
const Configs = require('../config/payment');

// 'https://api.cloudpayments.ru/payments/cards/charge'

module.exports.pay = (req, res) => {
  request.post({
    url: 'https://api.cloudpayments.ru/payments/cards/charge',
    headers: {
      'Authorization': 'Basic ' + btoa(`${Configs.id}:${Configs.password}`)
    },
    body: {
        'Amount': '50',
        'Currency': 'USD',
        'InvoiceId': '1234567',
        'Description': `Оплата заявки`,
        'AccountId': 'user_x',
        'Name': req.body.cardData.cardName,
        'Email': req.body.cardData.email,
        'CardCryptogramPacket': req.body.cryptogram
    },
    json: true
  }, (err, response, body) => {
    if (err) {
      res.status(400).json({ error: body.Model.CardHolderMessage }).end()
    } else {
      if (body.Success) res.status(200).send({ done: true })
      else res.status(200).json(body.Model)
    }
  })
}

module.exports.finish = (req, res) => {
  request.post({
    url: 'https://api.cloudpayments.ru/payments/cards/post3ds',
    headers: {
      'Authorization': 'Basic ' + btoa(`${Configs.id}:${Configs.password}`)
    },
    body: {
      'TransactionId': req.body.MD,
      'PaRes': req.body.PaRes
    },
    json: true
  }, (err, response, body) => {
    if (err) {
      const query = querystring.stringify({
        'message': body.Model.CardHolderMessage
      })
      res.status(400).json({ error: "Ошибка оплаты" })
    } else {
      if (body.Success) {
        res.redirect(`/student/done`)
      } else {
        const query = querystring.stringify({
          'message': body.Model.CardHolderMessage
        })
        res.status(400).json({ error: "Ошибка оплаты" })
      }
    }
  })
}
