import React from 'react'

// Templates
import { Section } from '../../templates/content_layout'

// Molecules
import ShopItemGrid from '../../molecules/shop_item_grid'
import ShopFilter from '../../molecules/shop_filter'

// Styles
import styles from './styles.module.scss'

const ShopGrid = () => {
  return (
    <Section
      className={styles['shopGrid']}
      isClamped={false}
    >
      <ShopFilter/>
      <ShopItemGrid/>
    </Section>
  )
}

export default ShopGrid
