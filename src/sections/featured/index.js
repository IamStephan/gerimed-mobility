import React, { useEffect, useState } from 'react'

// Gatsby
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

// Hooks
import { useFetch } from 'use-http'

// Components
import ShopItemRow from '../../components/shopItemRow'

// Styles
import styles from './styles.module.scss'

const QUERY = `
  query {
    featured {
      products {
        id
        name
        price
        showcase {
          formats
          url
        }
        categories {
          id
          name
        }
      }
    }
  }
`

const Featured = () => {
  const [products, setProducts] = useState([])
  const { query, response, loading } = useFetch('/graphql')

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  async function loadFeaturedProducts() {
    const { data } = await query(QUERY)

    if(response.ok) {
      // The loading state gets updated here with the rerender
      console.log(data)
      setProducts(data.featured.products)
    } else {
      /**
       * If this fails instead of showing an error message instead
       * just use fallback data
       */
    }
  }

  return (
    <section
      className={styles['featuredSection']}
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


      <div
        className={styles['featuredContainer']}
      >
        <ShopItemRow
          title='Our Featured Products'
          products={products}
          loading={loading}
        />
      </div>

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
    </section>
  )
}

export default Featured
