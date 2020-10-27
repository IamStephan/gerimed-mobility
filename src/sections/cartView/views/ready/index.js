import React from 'react'

// Material
import {
  Divider,
  ButtonGroup,
  Button
} from '@material-ui/core'
import {
  EditOutlined,
  ChevronRightOutlined,
} from '@material-ui/icons'

// Local Molecules
import CartItem from '../../molecules/cart_item'

// Styles
import styles from '../../styles.module.scss'

const ReadyView = props => {
  const {
    products,
    setIsEditing = () => {}
  } = props

  return (
    <div
      className={styles['cartView']}
      onClick={() => {}}
    >
      <div
        className={styles['left']}
      >
        <div
          className={styles['content']}
        >
          {
            products.map((product, i) => (
              <>
                <CartItem
                  key={i + 'ready'}
                  product={product}
                  isEditing={false}
                />
              </>
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
              startIcon={<EditOutlined />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant='contained'
              endIcon={<ChevronRightOutlined />}
            >
              Checkout
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

export default ReadyView
