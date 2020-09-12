import React from 'react'

// Templates
import { Section } from '../../templates/content_layout'

// Hooks
import { useMachine } from '@xstate/react'

// Controller
import { FetchGraphqlData } from '../../controllers/fetchGraphqlData'

// Model
import { FeaturedProducts } from './model'

// Components
import ShopItemRow from '../../molecules/shop_item_row'

// Styles
import styles from './styles.module.scss'


const Featured = () => {
  const [current, send] = useMachine(FetchGraphqlData, {
    id: 'FeaturedProducts',
    context: {
      graphqlQuery: FeaturedProducts,
      graphqlVariables: {
        limit: 5
      }
    }
  })

  const loading = current.matches('loading') || current.matches('retry')

  const products = current.context.data?.products

  console.log(products)

  return (
    <Section
      className={styles['featuredSection']}
      isClamped={false}
    >
      <div
        className={styles['topDivider']}
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
            className={styles['shapeFill']}
          />
        </svg>
      </div>

      {
        loading && (
          <div>
            Loading
          </div>
        )
      }


      {/* <div
        className={styles['featuredContainer']}
      >
        <ShopItemRow
          title='Our Featured Products'
          products={products}
          loading={current.matches('loading')}
        />
      </div> */}

      <div
        className={styles['bottomDivider']}
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
            className={styles['shapeFill']}
          />
        </svg>
      </div>
    </Section>
  )
}

export default Featured
