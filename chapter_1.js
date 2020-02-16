function amountFor(aPerformance, play) {
  let result = 0

  switch (play.type) {
  case 'tragedy':
    result = 40000
    if (aPerformance.audience > 30) {
      result += 1000 * (aPerformance.audience - 30)
    }
    break
  case 'comedy':
    result = 30000
    if (aPerformance.audience > 20) {
      result += 10000 + (500 * (aPerformance.audience - 20))
    }
    result += 300 * aPerformance.audience
    break
  default:
    throw new Error(`unknown type: ${play.type}`)
  }

  return result
}

function statement(invoice, plays) {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `Statement for ${invoice.customer}\n`
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  for (const perf of invoice.performances) {
    let thisAmount = amountFor(perf, playFor(perf))

    // 加入 volume credit
    volumeCredits += Math.max(perf.audience - 30, 0)
    // 每十名喜劇觀眾可獲得額外分數
    if (playFor(perf).type === 'comedy') volumeCredits += Math.floor(perf.audience / 5)

    // 印出這筆訂單
    result += `${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`
    totalAmount += thisAmount
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`
  result += `You earned ${volumeCredits} credits\n`

  return result
}

module.exports = { statement }
