function statement(invoice, plays) {
  const statementData = {}
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances.map(enrichPerformance)

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result)
    result.amount = amountFor(result)
    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  function amountFor(aPerformance) {
    let result = 0

    switch (aPerformance.play.type) {
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
      throw new Error(`unknown type: ${aPerformance.play.type}`)
    }

    return result
  }

  return renderPlainText(statementData)
}

function renderPlainText(data) {
  let totalAmount = 0
  let result = `Statement for ${data.customer}\n`

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100)
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0
    result += Math.max(aPerformance.audience - 30, 0)
    if (aPerformance.play.type === 'comedy') result += Math.floor(aPerformance.audience / 5)
    return result
  }

  function totalVolumeCredits() {
    let result = 0
    for (const perf of data.performances) {
      result += volumeCreditsFor(perf)
    }

    return result
  }

  for (const perf of data.performances) {
    // 印出這筆訂單
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`
    totalAmount += perf.amount
  }

  result += `Amount owed is ${usd(totalAmount)}\n`
  result += `You earned ${totalVolumeCredits()} credits\n`

  return result
}

module.exports = { statement }
