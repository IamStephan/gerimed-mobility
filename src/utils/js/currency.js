import * as currency from 'currency.js'

export const Rand = value => currency(value, {
  symbol: 'R ',
  separator: ' ',
  decimal: '.',
  precision: 2,
  increment: 0.5
})