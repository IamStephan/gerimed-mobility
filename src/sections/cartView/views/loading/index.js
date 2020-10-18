import React from 'react'

// Material
import {
  Divider,
  Typography,
  IconButton,
  Chip,
  TextField,
  ButtonGroup,
  Button
} from '@material-ui/core'
import {
  CloseOutlined,
  EditOutlined,
  ChevronRightOutlined
} from '@material-ui/icons'
import {
  Skeleton
} from '@material-ui/lab'

// Styles
import styles from '../../styles.module.scss'

// Constants
const CHIP_ARRAY_LENGTH = 3

const CartItemSkeleton = () => {
  const dummyChips = Array(CHIP_ARRAY_LENGTH).fill(1)

  return (
    <div
      className={styles['cartItem']}
    >
      <div
        className={styles['img']}
      >
        <Skeleton
          variant='rect'
          width={75}
          height={75}
        />
        
      </div>

      <div
        className={styles['data']}
      >
        <Skeleton>
          <Typography
            className={styles['title']}
          >
            Deluxe adult wheelchair -18″ with drop back
          </Typography>
        </Skeleton>
        
        <Skeleton>
          <Typography
            className={styles['price']}
          >
            R 500.00
          </Typography>
        </Skeleton>
        

        <div
          className={styles['categoryContainer']}
        >
          {
          dummyChips.map((key, i) => (
            <Skeleton
              key={key + i}
              className={styles['category']}
            >
              <Chip
                label='Dummy Data'
                color='secondary'
                variant='outlined'
                size='small'
              />
            </Skeleton>
          ))
        }
        </div>
      </div>

      <div
        className={styles['input']}
      >
        <Skeleton>
          <TextField
            disabled
            variant='outlined'
            color='secondary'
            value={5}
          />
        </Skeleton>
        
      </div>

      <div
        className={styles['remove']}
      >
        <Skeleton>
          <IconButton>
            <CloseOutlined />
          </IconButton>
        </Skeleton>
      </div>
    </div>
  )
}

const LoadingView = () => {
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
          <CartItemSkeleton />
          <CartItemSkeleton />
        </div>
        
        <Divider />

        <div
          className={styles['actions']}
        >
          <Skeleton>
            <ButtonGroup
              color='secondary'
              disableElevation
            >
              <Button
                variant='outlined'
                startIcon={<EditOutlined />}
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
          </Skeleton>
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

export default LoadingView
