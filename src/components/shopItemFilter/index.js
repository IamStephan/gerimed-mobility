import React from 'react'

// Material
import { TextField, InputAdornment } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'

// State
import { useGlobalState } from '../../state/navbar'

// Styles
import styles from './styles.module.scss'

/**
 * Flters:
 * =======
 *  - category
 *  - price
 *  - name
 */

const ShopItemFilter = () => {
  const [peeking] = useGlobalState('navbarPeek')

  return (
    <div
      className={`${styles['filter']} ${peeking ? '' : styles['peek']}`}
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
