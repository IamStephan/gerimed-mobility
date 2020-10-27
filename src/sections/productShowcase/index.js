import React, { useEffect, useCallback, useState } from 'react'

// Template
import { Section } from '../../templates/content_layout'

// Material
import { Typography, Divider, Button, Tab, Chip, TextField, LinearProgress } from '@material-ui/core'
import { Rating, TabContext, TabList, TabPanel, Alert, Skeleton, AlertTitle } from '@material-ui/lab'

// Gatsby
import { navigate } from 'gatsby'

// URL
import { stringify } from 'qs'

// Hooks
import { useMachine, useService } from '@xstate/react'

// Controller
import { FetchGraphqlData } from '../../controllers/fetchGraphqlData'
import { CarouselController } from './controller'

// Global Controller
import { CartService } from '../../organisms/provider'

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

// Utils
import { Rand } from '../../utils/js'

// Router
import { useLocation } from '@reach/router'

// Styles
import styles from './styles.module.scss'

const ShopOnlyBadge = () => (
  <Chip
    className={`${styles['badge']} ${styles['dangerOutline']}`}
    label='Shop Only'
    size='small'
    variant='outlined'
  />
)

const OutOfStockBadge = () => (
  <Chip
    className={`${styles['badge']} ${styles['danger']}`}
    label='Out of Stock'
    size='small'
  />
)

const OnSaleBadge = ({ discountAmount = 0 }) => (
  <div
    className={styles['salesBadge']}
  >
    <Typography
      className={styles['text']}
    >
      -<b>{discountAmount}%</b>
    </Typography>
  </div>
)

/**
 * TODO:
 * =====
 *  - Split components
 */

const ProductShowcase = () => {
  const location = useLocation()

  const qsParams = parse(location.search, {
    ignoreQueryPrefix: true
  })

  function _categoryFilter(category) {
    let filter = {
      categories: [category]
    }

    let queryString = stringify(filter)
    console.log(queryString)

    navigate(`/shop?${queryString}`)
  }

  // Global Controller
  const [currentGlobal, sendGlobal] = useService(CartService)

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

  

  // States
  const loading = currentData.matches('loading') || currentData.matches('retry') || currentData.matches('idle')
  const error = currentData.matches({fail: 'idle'}) || currentData.matches({fail: 'reset'})
  const success = currentData.matches('success') || currentData.matches('success_final')
  const addingProduct = currentGlobal.matches({ loading: 'addProduct' })

  // Form Data
  const [quantity, setQuantity] = useState(1)

  // Data
  const product = currentData?.context?.data?.product
  const images = product?.showcase
  const index = currentCarousel.context.index

  // availability
  const availability = () => {
    if (!product) return
    
    const {
      quantity = 0,
      shopOnly = false,
      isLimited = false
    } = product

    let testQuantity = 0

    if(quantity) testQuantity = Number(quantity)

    if(shopOnly) {
      return 'shopOnly'
    }

    if(isLimited) {
      if(testQuantity < 1) {
        return 'outStock'
      }
      return 'inStock'
    } else {
      return 'available'
    }

  }

  const availabilityRes = availability()

  function displaySpecialBadge() {
    if(!product) return

    const shopOnlyI = product.shopOnly
    const isLimitedI = product.isLimited
    const outOfStockI = (Number(quantity) < 1)
    const onSaleI = !!product.product_discount?.discounted_price

    const SaleBadge = ({ discountedPrice, price }) => {
      const discount = Math.floor((discountedPrice - price ) / price * 100) + 1

      return (
        <div
          className={styles['salesBadge']}
        >
          <Typography
            className={styles['text']}
          >
            <b>{discount}%</b>
          </Typography>
        </div>
      )
    }

    if(shopOnlyI) {
      return null
    } else {
      if(isLimitedI) {
        if(outOfStockI) {
          return null
        } else if(onSaleI) {
          return (
            <SaleBadge
              discountedPrice={product.product_discount.discounted_price}
              price={product.price}
            />
          )
        } else {
          return null
        }
      } else {
        if(onSaleI) {
          return (
            <SaleBadge
              discountedPrice={product.product_discount.discounted_price}
              price={product.price}
            />
          )
        } else {
          return null
        }
      }
    }
  }

  function priceToDisplay() {
    const shopOnlyI = product.shopOnly
    const isLimitedI = product.isLimited
    const outOfStockI = (Number(quantity) < 1)
    const onSaleI = !!product.product_discount?.discounted_price

    const SalePrice = () => (
      <>
        <strike
          className={styles['strike']}
        >
          {Rand(product.price).format()}  
        </strike>
        {' '}
        <b
          className={styles['normal']}
        >
          {Rand(product.product_discount?.discounted_price).format()}
        </b>
      </>
    )

    const NormalPrice = () => (
      <b>
        {Rand(product.price).format()}
      </b>
    )

    if(shopOnlyI) {
      return '-'
    } else {
      if(isLimitedI) {
        if(outOfStockI) {
          return <NormalPrice />
        } else if(onSaleI) {
          return <SalePrice />
        } else {
          return <NormalPrice />
        }
      } else {
        if(onSaleI) {
          return <SalePrice />
        } else {
          return <NormalPrice />
        }
      }
    }
  }

  function showAvailibility(availabilityEnum) {
    switch(availabilityEnum) {
      case 'shopOnly': {
        return <ShopOnlyBadge />
      }

      case 'outStock': {
        return <OutOfStockBadge />
      }

      case 'available': {
        return (
          <Chip
            variant='default'
            color='secondary'
            size='small'
            label='Available'
          />
        )
      }

      case 'inStock': {
        return (
          <Chip
            variant='default'
            color='secondary'
            size='small'
            label='In Stock'
          />
        )
      }

      default: {
        return null
      }
    }
  }

  function showMessage(availabilityEnum) {
    switch(availabilityEnum) {
      case 'shopOnly': {
        return (
          <Alert severity='error'>
            This item is only sold on-premise and <b>NOT</b> online.
          </Alert>
        )
      }
      
      case 'outStock': {
        return (
          <Alert severity='error'>
            This item is currently <b>OUT OF STOCK</b>
          </Alert>
        )
      }

      default: {
        return null
      }
    }
  }

  function showCartActions(availabilityEnum) {
    switch(availabilityEnum) {
      case 'shopOnly': {
        return false
      }

      case 'outStock': {
        return false
      }

      default: {
        return true
      }
    }
  }

  function _handleQuantityChange(event) {
    const { target: { value } } = event

    if(Number(value) < 1) return

    setQuantity(Number(value))
  }

  function _handleAddToCart() {
    sendGlobal('ADD_PRODUCT', {
      id: product.id,
      quantity: quantity
    })
  }

  const Carousel = useCallback(() => {
    switch(true) {
      case loading: {
        return (
          <div
            className={styles['carousel']}
          >
            <ProductCarouselSkeleton />
            <ProductCarouselThumbSkeleton />
          </div>
        )
      }
      case success: {
        return (
          <div
            className={styles['carousel']}
          >
            <ProductCarousel
              images={images}
              index={index}
              setIndex={setIndex}
            />

            <div>
              <Divider />
            </div>
            

            <ProductCarouselThumb
              images={images}
              index={index}
              setIndex={setIndex}
            />

            <div>
              <Divider />
            </div>
          </div>
        )
      }

      case error: {
        return null
      }
      // Dummy
      default: {
        return null
      }
    }
  }, [currentData.value, currentData.matches, index])

  const Details = () => {
    switch(true) {
      case loading: {
        return (
          <>
            <Skeleton>
              <Typography
                className={styles['title']}
                variant='h4'
              >
                <b>Dummy Name</b>
              </Typography>
            </Skeleton>

            <div
              className={styles['categoryContainer']}
            >
              <Skeleton
                className={styles['category']}
              >
                <Chip
                  className={styles['category']}
                  label='Dummy Data'
                  size='small'
                />
              </Skeleton>

              <Skeleton
                className={styles['category']}
              >
                <Chip
                  className={styles['category']}
                  label='Dummy Data'
                  size='small'
                />
              </Skeleton>
            </div>

            <div
              className={styles['priceContainer']}
            >
              <Skeleton>
                <Typography
                  className={styles['price']}
                  variant='h5'
                >
                  <b>R 70000</b>
                </Typography>
              </Skeleton>
              

              <Skeleton>
                <Chip
                  variant='default'
                  color='secondary'
                  size='small'
                  label='Available'
                />
              </Skeleton>
            </div>

            <div>
              <Divider
                className={styles['divider']}
              />
            </div>
            

            <div
              className={styles['cartActions']}
            >
              <Skeleton
                className={styles['input']}
              >
                <TextField
                  label='Quantity'
                  variant='outlined'
                  size='small'
                  className={styles['input']}
                />
              </Skeleton>
              
              <Skeleton
                className={styles['button']}
              >
                <Button
                  variant='contained'
                  color='secondary'
                  disableElevation
                  className={styles['button']}
                >
                  Add To Cart
                </Button>
              </Skeleton>
            </div>

            <TabContext
              value='desc'
            >
              <TabList
              >
                <Tab label='Details' value='desc' />
              </TabList>

              <div>
                <Divider />
              </div>
              

              <TabPanel value='desc'>
                <Skeleton>
                  <Typography>
                    Lorem ipsum dolor sit aman commodo ligula eget do
                  </Typography>
                </Skeleton>
                <Skeleton>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget do
                  </Typography>
                </Skeleton>
                <Skeleton>
                  <Typography>ctetuer adipiscing elit. Aenean commodo ligula eget do
                  </Typography>
                </Skeleton>
                <Skeleton>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget do
                  </Typography>
                </Skeleton>
                <Skeleton>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.enean commodo ligula eget do
                  </Typography>
                </Skeleton>
                <Skeleton>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean cot do
                  </Typography>
                </Skeleton>
                <Skeleton>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo l
                  </Typography>
                </Skeleton>
              </TabPanel>
            </TabContext>
            
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
                    onClick={() => _categoryFilter(category.name)}
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
                { priceToDisplay() }
              </Typography>

              <div>
                {
                  showAvailibility(availabilityRes)
                }
              </div>
            </div>

            { showMessage(availabilityRes) }

            <div>
              <Divider
                className={styles['divider']}
              />
            </div>

            {
              showCartActions(availabilityRes) && (
                <div
                  className={styles['cartActions']}
                >
                  {
                    addingProduct && (
                      <div
                        className={`${styles['row']} ${styles['loader']}`}
                      >
                        <LinearProgress
                          color='secondary'
                        />
                      </div>
                    )
                  }
                  
                  <div
                    className={styles['row']}
                  >
                    
                    <TextField
                      label='Quantity'
                      color='secondary'
                      variant='outlined'
                      size='small'
                      type='number'
                      value={quantity}
                      onChange={_handleQuantityChange}
                      className={styles['input']}
                    />

                    <Button
                      variant='contained'
                      color='secondary'
                      disableElevation
                      className={styles['button']}
                      onClick={_handleAddToCart}
                    >
                      Add To Cart
                    </Button>
                  </div>
                  
                </div>
              )
            }

            <TabContext
              value='desc'
            >
              <TabList
              >
                <Tab label='Details' value='desc' />
                {/* <Tab label='Reviews' value='review' /> */}
              </TabList>

              <div>
                <Divider />
              </div>
              

              <TabPanel value='desc'>
                <section dangerouslySetInnerHTML={{
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
            <Alert
              severity='error'
            >
              <AlertTitle>
                <b>Product Not Found</b>
              </AlertTitle>

              The product you are looking for does not seem to exist. Please make sure the product appears in the shop page.
            </Alert>
          </div>
        )
      }

      default: {
        // Dummy
        return <div />
      }
    }
  }

  return (
    <Section
      className={styles['productSection']}
      gutter='none'
    >
      <div
        className={styles['carouselContainer']}
      >
      { displaySpecialBadge() }
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
