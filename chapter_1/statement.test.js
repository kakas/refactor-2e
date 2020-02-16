const { statement } = require('./statement')
const createStatementData = require('./createStatementData')

const plays = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' }
}

const invoice = {
  customer: "BigCo",
  performances: [
    {
      playID: "hamlet",
      audience: 55,
    },
    {
      playID: "as-like",
      audience: 35,
    },
    {
      playID: "othello",
      audience: 40,
    }
  ]
}

describe('createStatementData', () => {
  test('basic test', () => {
    const expectedResult = {
      customer: "BigCo",
      performances: [
        { amount: 65000, audience: 55, play: { name: "Hamlet", type: "tragedy" }, playID: "hamlet", volumeCredits: 25 },
        { amount: 58000, audience: 35, play: { name: "As You Like It", type: "comedy" }, playID: "as-like", volumeCredits: 12 },
        { amount: 50000, audience: 40, play: { name: "Othello", type: "tragedy" }, playID: "othello", volumeCredits: 10 },
      ],
      totalAmount: 173000,
      totalVolumeCredits: 47,
    }

    expect(createStatementData(invoice, plays)).toStrictEqual(expectedResult)
  })
})

describe('statement', () => {
  test('basic test', () => {
    const expectedResult = [
      'Statement for BigCo',
      'Hamlet: $650.00 (55 seats)',
      'As You Like It: $580.00 (35 seats)',
      'Othello: $500.00 (40 seats)',
      'Amount owed is $1,730.00',
      "You earned 47 credits\n",
    ].join("\n")
    expect(statement(invoice, plays)).toBe(expectedResult)
  })
})

