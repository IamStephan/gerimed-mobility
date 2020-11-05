import React from 'react'

// Material
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, ButtonGroup, Button } from '@material-ui/core'

// Utils
import { Rand } from '../../../../utils/js/currency'
import { shipping } from '../../../../utils/js/calculateShipping'

// Styles
import styles from './styles.module.scss'

const Summary = props => {
  const {
    handleNext,
    handlePrev,
    cart
  } = props

  const [currentCart] = cart

  const products = currentCart.context?.cartData?.cart?.products || []

  function _calculateTotal(price, discount, quantity) {
    let discountTemp = price
    let quantityTemp = 1
    let priceTemp = 0

    console.log(typeof quantity)

    if(typeof price === 'number') {
      priceTemp = price
    }

    if(typeof discount === 'number') {
      discountTemp = discount
    }

    if(typeof quantity === 'number') {
      quantityTemp = quantity
    }

    const total = (priceTemp - (priceTemp - discountTemp)) * quantityTemp

    return Rand(total).format()
  }

  function _cartInfoBuilder() {
    const productsTemp = currentCart.context?.cartData?.cart?.products || []
    let newProducts = []
    let totalAll = 0
    let totalSavings = 0
    let totalWeight = 0

    productsTemp.forEach((item) => {
      newProducts.push({
        id: item.product.id,
        name: item.product.name,
        price: Rand(item.product.price).format(),
        quantity: item.quantity,
        discount: item.product?.product_discount?.discounted_price ? (
          Rand(item.product.price - item.product.product_discount.discounted_price).format()
        ) : '-',
        total: _calculateTotal(item.product.price, item.product?.product_discount?.discounted_price, item.quantity)
      })

      totalAll += item.product.price * item.quantity

      if(item.product.weight) {
        totalWeight += item.product.weight * item.quantity
      } else {
        totalWeight += 1 * item.quantity
      }
      
      if(item.product?.product_discount?.discounted_price) {
        totalSavings += (item.product.price - item.product.product_discount.discounted_price) * item.quantity
      }
    })

    const shippingCost = shipping.courierGuy(totalWeight)

    return {
      products: newProducts,
      totalAll: Rand(totalAll - totalSavings).format(),
      shipping: Rand(shippingCost).format(),
      total: Rand(totalAll + shippingCost - totalSavings).format()
    }
  }

  const cartInfo = _cartInfoBuilder()

  return (
    <div
      className={styles['summary']}
    >
      <TableContainer
        className={styles['table']}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                variant='head'
              >
                <b>Name</b>
              </TableCell>

              <TableCell align='right' variant='head'>
                <b>Price</b>
              </TableCell>

              <TableCell align='right' variant='head'>
                <b>Discount</b>
              </TableCell>

              <TableCell align='center' variant='head'>
                <b>Quantity</b>
              </TableCell>

              <TableCell align='right' variant='head'>
                <b>Total</b>
              </TableCell>
            </TableRow>
          </TableBody>

          <TableBody>
            {
              cartInfo.products.map(product => (
                <TableRow
                  key={product.id}
                >
                  <TableCell>
                    {product.name}
                  </TableCell>

                  <TableCell align='right'>
                    {product.price}
                  </TableCell>

                  <TableCell align='right'>
                    {product.discount}
                  </TableCell>

                  <TableCell align='center'>
                    {product.quantity}
                  </TableCell>  

                  <TableCell align='right'>
                    {product.total}
                  </TableCell>
                </TableRow>
              ))
            }

            <TableRow>
              <TableCell rowSpan={3} colSpan={3} />
              <TableCell>
                <b>Sub Total</b>
              </TableCell>
              <TableCell align='right'>
                {cartInfo.totalAll}
              </TableCell>
            </TableRow>


            <TableRow>
              <TableCell>
                <b>Shipping</b>
              </TableCell>
              <TableCell align='right'>
                {cartInfo.shipping}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <b>Total</b>
              </TableCell>
              <TableCell align='right'>
                <b>{cartInfo.total}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div
        className={styles['actions']}
      >
        <ButtonGroup
          color='secondary'
          disableElevation
          variant='outlined'
        >
          <Button
            onClick={handlePrev}
          >
            Back
          </Button>

          <Button
            onClick={handleNext}
            variant='contained'
          >
            Next
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default Summary
