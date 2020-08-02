import React from 'react'

// Material
import { TextField, InputAdornment } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'

// Styles
import styles from './styles.module.scss'

const ShopItemFilter = () => {
  return (
    <div
      className={styles['filter']}
    >
      <TextField
        label='Search Products...'
        color='secondary'
        InputProps={{
          startAdornment: (
            <InputAdornment
              position='start'
            >
              <SearchOutlined />
            </InputAdornment>
          )
        }}
      />
    </div>
  )
}

export default ShopItemFilter
