import React, { useEffect, useCallback } from 'react'

// Template
import { Section } from '../../templates/content_layout'

// Material
import { Typography, Divider, Button, Tab, Chip, TextField } from '@material-ui/core'
import { Rating, TabContext, TabList, TabPanel, Alert } from '@material-ui/lab'

// Hooks
import { useMachine } from '@xstate/react'

// States
import { FetchGraphqlData } from '../../controllers/fetchGraphqlData'
import { CarouselController } from './controller'

// Molecules
import ProductCarousel from '../../molecules/product_carousel'
import ProductCarouselThumb from '../../molecules/product_carousel_thumb'

// Molecule Skeletons
import ProductCarouselSkeleton from '../../molecule_skeletons/product_carousel'
import ProductCarouselThumbSkeleton from '../../molecule_skeletons/product_carousel_thumb'

// Models
import { GET_PRODUCT } from './model'

// Query String
import { parse } from 'qs'

// Router
import { useLocation } from '@reach/router'

// Styles
import styles from './styles.module.scss'


const ProductShowcase = () => {
  const location = useLocation()
  const qsParams = parse(location.search, {
    ignoreQueryPrefix: true
  })

  // Data Controller
  const [currentData, sendDataEvent] = useMachine(FetchGraphqlData, {
    context: {
      runOnce: false,
      graphqlQuery: GET_PRODUCT,
      graphqlVariables: {
        id: qsParams.id
      }
    }
  })

  // Carousel contoller
  const [currentCarousel, sendCarouselEvent] = useMachine(CarouselController)

  const setIndex = useCallback((i) => {
    sendCarouselEvent('SET_INDEX', {
      index: i
    })
  }, [sendCarouselEvent])

  useEffect(() => {
    if(!qsParams.id) return

    sendDataEvent('SET_NEW_FETCH_CONTEXT', {
      context: {
        graphqlVariables: {
          id: qsParams.id
        }
      }
    })
    sendDataEvent('RESET_FETCHING')

    sendCarouselEvent('RESET_INDEX')
  }, [qsParams.id])

  const formatPrice = useCallback((price) => {
    const currency = new Intl.NumberFormat('en-UK', {
      style: 'currency',
      currency: 'ZAR',
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 2
    })

    return currency.format(price)
  }, [])

  // States
  const loading = currentData.matches('loading') || currentData.matches('retry') || currentData.matches('idle')
  const error = currentData.matches({fail: 'idle'}) || currentData.matches({fail: 'reset'})
  const success = currentData.matches('success') || currentData.matches('success_final')

  // Data
  const product = currentData?.context?.data?.product
  const images = product?.showcase
  const index = currentCarousel.context.index

  //console.log(product)

  const Carousel = useCallback(() => {
    switch(true) {
      case loading: {
        return (
          <>
            <ProductCarouselSkeleton />
            <ProductCarouselThumbSkeleton />
          </>
        )
      }
      case success: {
        return (
          <>
            <ProductCarousel
              images={images}
              index={index}
              setIndex={setIndex}
            />

            <Divider />

            <ProductCarouselThumb
              images={images}
              index={index}
              setIndex={setIndex}
            />

            <Divider />
          </>
        )
      }

      case error: {
        return (
          <div>
            Error
          </div>
        )
      }
      // Dummy
      default: {
        return <div />
      }
    }
  }, [currentData.value, currentData.matches, index])

  const Details = useCallback(() => {
    switch(true) {
      case loading: {
        return (
          <>

          </>
        )
      }

      case success: {
        return (
          <>
            <Typography
              className={styles['title']}
              variant='h4'
            >
              <b>{ product.name }</b>
            </Typography>

            <div
              className={styles['categoryContainer']}
            >
              {
                product.categories.length ? product.categories.map((category, i) => (
                  <Chip
                    key={category.id}
                    className={styles['category']}
                    label={category.name}
                    color='secondary'
                    variant='outlined'
                    size='small'
                    clickable
                  />
                )) : (
                  <Chip
                    className={styles['category']}
                    label={'Unsorted'}
                    color='secondary'
                    variant='outlined'
                    size='small'
                    clickable
                  />
                )
              }
            </div>
            
            {/* <Rating
              className={styles['rating']}
              name="pristine"
              precision={0.5}
              value={null}
            /> */}

            <div
              className={styles['priceContainer']}
            >
              <Typography
                className={styles['price']}
                variant='h5'
              >
                <b>{ formatPrice(product.price) }</b>
              </Typography>

              <div>
                <Chip
                  variant='default'
                  color='secondary'
                  size='small'
                  label={ !product.isLimited ? 'Available' : product.quantity ? 'In Stock' : 'Out of Stock' }
                />
              </div>
            </div>

            {
              !product.isLimited && (
                <Alert severity='info'>
                  This item is not held on-premise, therefore, shipping might take longer than expected.
                </Alert>
              )
            }

            <Divider
              className={styles['divider']}
            />

            <div
              className={styles['cartActions']}
            >
              <TextField
                label='Quantity'
                color='secondary'
                variant='outlined'
                size='small'
                type='number'
                value={1}
                className={styles['input']}
              />

              <Button
                variant='contained'
                color='secondary'
                disableElevation
                className={styles['button']}
              >
                Add To Cart
              </Button>
            </div>

            <TabContext
              value='desc'
            >
              <TabList
              >
                <Tab label='Details' value='desc' />
                {/* <Tab label='Reviews' value='review' /> */}
              </TabList>
              <Divider />

              <TabPanel value='desc'>
                <div dangerouslySetInnerHTML={{
                  __html: product.details
                }} />
              </TabPanel>
            </TabContext>

          </>
        )
      }

      case error: {
        return (
          <div>

          </div>
        )
      }

      default: {
        // Dummy
        return <div />
      }
    }
  }, [currentData.value, currentData.matches])

  return (
    <Section
      className={styles['productSection']}
      gutter='none'
    >
      <div
        className={styles['carouselContainer']}
      >
      { Carousel() }
      </div>

      <div
        className={styles['detailsContainer']}
      >
        <div
          className={styles['details']}
        >
          { Details() }
        </div>
      </div>
      
    </Section>
  )
}

export default ProductShowcase
