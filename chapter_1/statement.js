const createStatementData = require('./createStatementData')

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100)
  }


  for (const perf of data.performances) {
    // 印出這筆訂單
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`
  result += `You earned ${data.totalVolumeCredits} credits\n`

  return result
}

module.exports = { statement }
