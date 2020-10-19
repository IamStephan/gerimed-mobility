import React, { useState, useEffect, useCallback } from 'react'

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
  ExpandLessOutlined,
} from '@material-ui/icons'
import {
  TreeView,
  TreeItem
} from '@material-ui/lab'

// Hooks
import { useMachine } from '@xstate/react'
import { useForm, Controller } from 'react-hook-form'
import { useLocation } from '@reach/router'

// Controller
import { LocalController } from './controller'

// utils
import { set, get, flatMapDeep } from 'lodash'

// Styles
import styles from './styles.module.scss'

const STATIC_QUERY = graphql`
  query {
    strapiCategories {
      categories {
        name
        id
        parent {
          id
        }
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
      <div
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
  const { strapiCategories: { categories } } = useStaticQuery(STATIC_QUERY)

  const location = useLocation()

  const { handleSubmit, register, setValue, getValues, reset, control } = useForm()

  const [, send] = useMachine(LocalController, {
    context: {
      setValue,
      getValues,
      categories
    }
  })

  useEffect(() => {
    send('CHECK_FILTERS')
  }, [location.search])

  const [showPrice, setShowPrice] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [showAvailability, setShowAvailability] = useState(false)
  const [categoryList, setCategoryList] = useState([])

  const categoriesBuilder = () => {
    
    // The categories are static and do not rerun when called again since the data will NOT change
    if(categoryList.length) return

    function swap(input, index_A, index_B) {
      let temp = input[index_A];
  
      input[index_A] = input[index_B];
      input[index_B] = temp;
    }

    // Mutation array of all the nodes that have not been worked on
    let categoryHistory = [...categories]

    // Used for path lookup on nodes that have been handled
    let categoriesLookUp = {
      /**
       * id: path: String
       */
    }

    // The actual list to use
    let categoryListMap = []

    /**
     * NOTE:
     * ====
     * This confused me at first but when setting a path
     * for the lookup an then placing it according to that
     * path in the list works with just specifying the length
     * 
     * This is because the length represents one index above
     * an index that does not exist. Therefore when setting the
     * node to that index it creates a new entry. When subtracting 1 
     * from the length the node that exists there will get replaced
     */
    let limit = 0
    while (categoryHistory.length > 0 || limit > 1000) {
      limit += 1

      for(let i = 0; i < categoryHistory.length; i++) {
        if(categoryHistory[i].parent) {
          /**
           * loop through the lookup to find the path
           */
          const entries = Object.entries(categoriesLookUp) || []

          let foundParent = false

          // look in the look up if the parent is already added 
          for (let j = 0; j < entries.length; j++) {
            const [key] = entries[j]
            
            if(key === categoryHistory[i].parent.id) {
              /**
               * Found a match
               */
              foundParent = true
              // Get the array path based on the length
              const index = get(categoryListMap, `${categoriesLookUp[categoryHistory[i].parent.id]}.children.length`, 0)
              
              const path = `${categoriesLookUp[categoryHistory[i].parent.id]}.children[${index}]`

              // Set the look up path
              categoriesLookUp[categoryHistory[i].id] = path

              // Add it to the list
              set(categoryListMap, path, {
                name: categoryHistory[i].name,
                id: categoryHistory[i].id,
                children: []
              })

              // Remove the item from the history
              categoryHistory.splice(i, 1)

              // Break and restart the loop
              break
            }
          }

          if(!foundParent) {
            /**
             * Swap the item with the next one
             * 
             * This is to perserve the sorting of the
             * original query (alphabetically)
             * 
             * This reason i do not have to check for the last
             * index is because all the items has to be sorted
             * into an category (The server implicitly forces this data structure)
             * 
             * so when the item is swapped to the last index it will allways
             * have a place to go
             */
            swap(categoryHistory, i, i + 1)
            break
          }

          break

        } else {
          /**
           * These are the roots
           */

          // Set the look up path
          const path = `[${categoryListMap.length}]`

          categoriesLookUp[categoryHistory[i].id] = path

          // Add it to the list
          categoryListMap.push({
            name: categoryHistory[i].name,
            id: categoryHistory[i].id,
            children: []
          })

          // Remove the item from the history
          categoryHistory.splice(i, 1)

          // Break and restart the loop
          break
        }
      }
    }

    setCategoryList(categoryListMap)
  }

  useEffect(() => categoriesBuilder(), [categoryList])

  function _applyFilters(data) {
    send('APPLY_FILTERS', {
      data
    })
  }

  const renderTree = (nodes) => {
    if(Array.isArray(nodes)) {
      return (
        <TreeItem
          key='nodes.id'
          nodeId='categories'
          classes={{
            selected: {
              backgroundColor: 'none'
            }
          }}
          label={(
            <Typography
              variant='overline'
              color='secondary'
            >
              <b>Categories</b>
            </Typography>
          )}
        >
          {nodes.map((node) => renderTree(node))}
        </TreeItem>
      )
    } else if (Array.isArray(nodes.children)) {
      return (
        <TreeItem
          key={nodes.id}
          nodeId={nodes.id}
          label={nodes.name}
        >
          {nodes.children.map((node) => renderTree(node))}
        </TreeItem>
      )
    } else {
      return (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} />
      )
    }
    
  };

  /**
   * Optimize This
   */
  function flatCategories(nodes, level) {
    const data = flatMapDeep(nodes, (value) => {
      if(value.children.length > 0) {
        return [
          {
            ...value,
            level: level
          },
          flatCategories(value.children, level + 1)
        ]
      } else {
        return {
          ...value,
          level: level
        }
      }
    })

    return data
  }

  const categoriesFlat = flatCategories(categoryList, 0)

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
                categoriesFlat.map((category) => (
                  <Controller
                    key={category.id}
                    control={control}
                    defaultValue={false}
                    name={'categories.' + category.name}
                    render={({ onChange, onBlur, value, name }) => (
                      <FormControlLabel
                        key={category.id}
                        style={{
                          marginLeft: category.level * 24
                        }}
                        control={(
                          <Checkbox
                            onBlur={onBlur}
                            onChange={e => onChange(e.target.checked)}
                            checked={value}
                            name={name}
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
