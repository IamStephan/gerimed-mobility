import { Shipping, ShippingOptions } from './calculateShipping'

/**
 * 
 * @param {[Object]} products 
 * 
 * @returns {{
 *    productsTotal: number
 *    shippingTotal: number
 *    savingsTotal: number
 *    total: number
 * }}
 */
function CalculateCartTotals(products, shippingOption) {
  const productsTotal = products.reduce((acc, curr) => {
    return acc + (curr.product.price * curr.quantity) 
  }, 0)

  const shippingWeight = products.reduce((acc, curr) => {
    let weight = 1

    if(curr.product.weight) {
      weight = curr.product.weight
    }

    return acc + (weight * curr.quantity)
  }, 0) 

  let shippingTotal

  switch(shippingOption) {
    case ShippingOptions.courierGuy: {
      shippingTotal = Shipping.courierGuy(shippingWeight)
      break
    }

    case ShippingOptions.store: {
      shippingTotal = 0
      break
    }

    default: {
      shippingTotal = Shipping.courierGuy(shippingWeight)
    }
  }

  if(products.length < 1) {
    shippingTotal = 0
  }

  const savingsTotal = products.reduce((acc, curr) => {
    let discount = 0

    if(curr.product.product_discount?.discounted_price) {
      discount = curr.product.price - curr.product.product_discount?.discounted_price
    }

    return acc + (discount * curr.quantity)
  }, 0)

  const total = productsTotal + shippingTotal - savingsTotal

  return {
    productsTotal,
    shippingTotal,
    savingsTotal,
    total
  }
}

export {
  CalculateCartTotals
}