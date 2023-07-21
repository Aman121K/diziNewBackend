
const CC = require('currency-converter-lt')

function retrieveCurrency(amount) {
    let currencyConverter = new CC({from:"AED", to:"USD", amount})
    currencyConverter.convert().then((response) => {
        console.log(response) //or do something else
        const cents = response * 100;
        return cents
    })
  }
  module.exports = { retrieveCurrency };