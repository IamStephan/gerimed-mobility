import React, { useState, useEffect } from 'react'

// Gatsby
import { useStaticQuery, graphql, Link } from 'gatsby'

// Material
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  Divider,
  ButtonGroup,
  Button,
  Collapse,
  IconButton,
} from '@material-ui/core'
import {
  SearchOutlined,
  ExpandMoreOutlined,
} from '@material-ui/icons'

// Hooks
import { useMachine } from '@xstate/react'
import { useForm, Controller } from 'react-hook-form'
import { useLocation } from '@reach/router'

// Controller
import { LocalController } from './controller'

// Styles
import styles from './styles.module.scss'

const STATIC_QUERY = graphql`
  query {
    categoriesExtended {
      categoriesMod {
        id
        level
        name
      }
    }
  }
`

const SideTrackSection = props => {
  const {
    isOpen,
    setOpen,
    title,
    children
  } = props

  return (
    <div
      className={styles['sideTrackSection']}
    >
      <div // eslint-disable-line
        className={styles['sectionHeader']}
        onClick={setOpen}
      >
        <Typography
          variant='overline'
          color='secondary'
        >
          <b>{title}</b>
        </Typography>

        <IconButton
          size='small'
          color='secondary'
        >
          <ExpandMoreOutlined
            className={`${styles['dropdown']} ${styles[isOpen ? 'open' : 'close']}`}
          />
        </IconButton>
      </div>
      
      <div
        className={styles['sectionContent']}
      >
        <Collapse
          in={isOpen}
        >
          {children}
        </Collapse>
      </div>
      
    </div>
  )
}

const Split = ({ divide }) => (
  <>
    <br />
    {divide && (
        <>
          <Divider />
          <br />
        </>
      )}
  </>
)

const SearchBar = props => {
  return (
    <div
      className={styles['roundedInput']}
    >
      <TextField
        InputProps={{
          classes: {
            root: styles['inputBox']
          },
          startAdornment: (
            <InputAdornment
              position='start'
            >
              <SearchOutlined />
            </InputAdornment>
          )
        }}
        fullWidth
        variant='outlined'
        size='small'
        color='secondary'
        label='Search Products'
        {...props}
      />
    </div>
  )
}

const PriceInput = props => {
  return (
    <div
      className={`${styles['roundedInput']} ${styles['price']}`}
    >
      <TextField
        InputProps={{
          classes: {
            root: styles['inputBox']
          }
        }}
        variant='outlined'
        size='small'
        type='number'
        color='secondary'
        {...props}
      />
    </div>
  )
}

const ShopFilter = () => {
  const { categoriesExtended: { categoriesMod: categories } } = useStaticQuery(STATIC_QUERY)

  const location = useLocation()

  const { handleSubmit, register, setValue, getValues, control } = useForm()

  const [, send] = useMachine(LocalController, {
    context: {
      setValue,
      getValues,
      categories
    }
  })

  useEffect(() => {
    send('CHECK_FILTERS')
  }, [location.search]) // eslint-disable-line react-hooks/exhaustive-deps

  const [showPrice, setShowPrice] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [showAvailability, setShowAvailability] = useState(false)

  function _applyFilters(data) {
    send('APPLY_FILTERS', {
      data
    })
  }

  return (
    <div
      className={styles['shopFilterContainer']}
    >
      <form
        onSubmit={handleSubmit(_applyFilters)}
        className={styles['sideTrackFilter']}
      >
        <div>
          <Typography
            color='secondary'
            variant='h4'
          >
            <b>Filters</b>
          </Typography>
        </div>

        <Split />

        <Controller
          control={control}
          defaultValue=''
          name={'search'}
          render={({ onChange, onBlur, value, name }) => (
            <SearchBar
              onBlur={onBlur}
              onChange={e => onChange(e.target.value)}
              value={value}
              name={name}
            />
          )}
        />

        <Split divide />

        <SideTrackSection
          title='Price'
          isOpen={showPrice}
          setOpen={() => setShowPrice((prev) => !prev)}
        > 
          <PriceInput
            name='min_price'
            inputRef={register}
            label='Min Price'
          />
          <PriceInput
            name='max_price'
            inputRef={register}
            label='Max Price'
          />
        </SideTrackSection>

        <SideTrackSection
          title='Categories'
          isOpen={showCategories}
          setOpen={() => setShowCategories((prev) => !prev)}
        >
          <FormGroup>
              {
                categories.map((category) => (
                  <Controller
                    key={category.id}
                    control={control}
                    defaultValue={false}
                    name={'categories.' + category.name}
                    render={({ onChange, onBlur, value, name }) => (
                      <FormControlLabel
                        key={category.id}
                        style={{
                          marginLeft: category.level * 16
                        }}
                        control={(
                          <Checkbox
                            onBlur={onBlur}
                            onChange={e => onChange(e.target.checked)}
                            checked={value}
                            name={name}
                            size='small'
                          />
                        )}
                        label={category.name}
                      />
                    )}
                  />

                ))
              }
          </FormGroup>
        </SideTrackSection>

        <SideTrackSection
          title='Availability'
          isOpen={showAvailability}
          setOpen={() => setShowAvailability((prev) => !prev)}
        >
          <FormGroup>
            <Controller
              control={control}
              defaultValue={false}
              name='availability.available'
              render={({ onChange, onBlur, value, name }) => (
                <FormControlLabel
                  control={(
                    <Checkbox
                      onBlur={onBlur}
                      onChange={e => onChange(e.target.checked)}
                      checked={value}
                      name={name}
                      size='small'
                    />
                  )}
                  label='Available'
                />
              )}
            />

            <Controller
              control={control}
              defaultValue={false}
              name='availability.instock'
              render={({ onChange, onBlur, value, name }) => (
                <FormControlLabel
                  control={(
                    <Checkbox
                      onBlur={onBlur}
                      onChange={e => onChange(e.target.checked)}
                      checked={value}
                      name={name}
                      size='small'
                    />
                  )}
                  label='In Stock'
                />
              )}
            />
          </FormGroup>
        </SideTrackSection>

        <div>
          <ButtonGroup
            color='secondary'
            disableElevation
            fullWidth
          >
            <Button
              variant='contained'
              type='submit'
            >
              Apply
            </Button>

            <Button
              component={Link}
              to='?'
            >
              Clear
            </Button>
          </ButtonGroup>
          
        </div>

        
      </form>
    </div>
  )
}

export default ShopFilter
