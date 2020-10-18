import React from 'react'

// Material
import {
  Divider,
  ButtonGroup,
  Button
} from '@material-ui/core'
import {
  CancelOutlined,
  SaveOutlined,
} from '@material-ui/icons'

// Local Molecules
import CartItem from '../../molecules/cart_item'

// Styles
import styles from '../../styles.module.scss'

const EditView = props => {
  const {
    products = [],
    setIsEditing = () => {}
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
                key={i}
                name={product.product.name}
                categories={product.product.categories}
                quantity={product.quantity}
                showcase={product.product.showcase}
                price={product.product.price}
                isEditing={true}
              />
            ))
          }
        </div>
        
        <Divider />

        <div
          className={styles['actions']}
        >
          <ButtonGroup
            color='secondary'
            disableElevation
          >
            <Button
              variant='outlined'
              startIcon={<CancelOutlined />}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              endIcon={<SaveOutlined />}
            >
              Save
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <Divider
        orientation='vertical'
        flexItem
      />

      <div
        className={styles['right']}
      >
        
      </div>
    </div>
  )
}

export default EditView
