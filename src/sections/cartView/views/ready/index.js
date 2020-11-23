import React from 'react'

// Material
import {
  ButtonGroup,
  Button
} from '@material-ui/core'
import {
  EditOutlined
} from '@material-ui/icons'

// Local Molecules
import CartItem from '../../molecules/cart_item'
import CartInfo from '../../molecules/cart_info'

// Styles
import styles from '../../styles.module.scss'

const ReadyView = props => {
  const {
    products,
    setIsEditing = () => {},
    shippingOption,
    setShippingOption,
    saveShippingOption
  } = props

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
            products.map((product, i) => (
              <CartItem
                key={i + 'ready'}
                product={product}
                isEditing={false}
              />
            ))
          }
        </div>
        
        {/* <Divider /> */}

        <div
          className={styles['actions']}
        >
          <ButtonGroup
            color='secondary'
            disableElevation
          >
            <Button
              variant='outlined'
              startIcon={<EditOutlined />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {/* <Divider
        orientation='vertical'
        flexItem
      /> */}

      <div
        className={styles['right']}
      >
        <CartInfo
          products={products}
          shippingOption={shippingOption}
          setShippingOption={setShippingOption}
          saveShippingOption={saveShippingOption}
        />
      </div>
    </div>
  )
}

export default ReadyView
