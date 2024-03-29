import React, { useState, useLayoutEffect } from 'react'

// Material
import {
  ButtonGroup,
  Button,
  LinearProgress
} from '@material-ui/core'
import {
  CancelOutlined,
  SaveOutlined,
  InfoOutlined
} from '@material-ui/icons'
import {
  Alert,
  AlertTitle
} from '@material-ui/lab'

// Local Molecules
import CartItem from '../../molecules/cart_item'
import CartInfo from '../../molecules/cart_info'

// Styles
import styles from '../../styles.module.scss'

const EditView = props => {
  const {
    products = [],
    loading,
    setIsEditing = () => {},
    setProducts = () => {},
    shippingOption,
    setShippingOption
  } = props

  const [productList, setProductList] = useState([])

  useLayoutEffect(() => {
    /**
     * All the other methods of cloning are shallow clones
     * 
     * Since the array exists of objects its essentially only making
     * a new array reference but the objects reference stay
     * 
     * This way it creates a completely new set of arrays and objects
     */
    const stringValue = JSON.stringify(products)
    const cloneValue = JSON.parse(stringValue)

    setProductList(cloneValue)
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  function _handleProductQuantity(index, value) {
    const listClone = productList.slice()

    const itemToMod = listClone.splice(index, 1)[0]

    // Clamp
    //* This clamp is kind of annoying
    if(Number(value) < 1) {
      itemToMod.quantity = 1
    } else {
      itemToMod.quantity = Number(value)
    }

    listClone.splice(index, 0, itemToMod)

    setProductList(listClone)
  }

  function _handleClearCart() {
    setProductList([])
  }

  function _handleProductRemove(index) {
    const listClone = [...productList]

    listClone.splice(index, 1)

    setProductList(listClone)
  }

  function _handleSubmit() {
    // create the product list
    const reqProducts = productList.map((item) => {
      return {
        productID: item.product.id,
        quantity: item.quantity
      }
    })

    setProducts(reqProducts)
  }

  function cartToView() {
    if(productList < 1) {
      return (
        <Alert
          iconMapping={{
            success: <InfoOutlined fontSize="inherit" />
          }}
        >
          <AlertTitle>
            <b>Do you want to clear your cart?</b>
          </AlertTitle>
        </Alert>
      )
    } else {
      return productList.map((product, i) => (
        <CartItem
          key={i + 'edit'}
          product={product}
          isEditing={true}
          index={i}
          handleProductQuantity={_handleProductQuantity}
          handleProductRemove={_handleProductRemove}
        />
      ))
    }
  }

  return (
    <div
      className={styles['cartView']}
    >
      <div
        className={styles['left']}
      >
        <div
          className={styles['content']}
        >
          {
            loading && (
              <LinearProgress
                color='secondary'
              />
            )
          }

          { cartToView() }
        </div>

        <div
          className={styles['actions']}
        >
          <ButtonGroup
            color='secondary'
            disableElevation
          >
            <Button
              variant='outlined'
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              variant='outlined'
              startIcon={<CancelOutlined />}
              disabled={!productList.length}
              onClick={_handleClearCart}
            >
              Clear Cart
            </Button>
            <Button
              variant='contained'
              endIcon={<SaveOutlined />}
              onClick={_handleSubmit}
            >
              Save
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div
        className={styles['right']}
      >
        <CartInfo
          products={productList}
          isEditing={true}
          shippingOption={shippingOption}
          setShippingOption={setShippingOption}
        />
      </div>
    </div>
  )
}

export default EditView
