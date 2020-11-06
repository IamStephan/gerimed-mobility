import React, { useState, useEffect } from 'react'

// Material
import {
  Typography,
  TextField,
  InputAdornment,
  Divider,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@material-ui/core'
import {
  Alert,
  AlertTitle
} from '@material-ui/lab'
import {
  SearchOutlined,
  ChevronRightOutlined,
  InfoOutlined
} from '@material-ui/icons'

// Templates
import { Section } from '../../templates/content_layout'

// Hooks
import { useMachine } from '@xstate/react'

// Controller
import { TrackMyOrderController } from './controller'

// Styles
import styles from './styles.module.scss'
import { orderBy } from 'lodash'

function OrderStateTag(state) {
  let label
  let color

  switch(state) {
    case 'transfer': {
      label = 'Processing'
      color = 'orange'
      break
    }

    case 'paid': {
      label = 'Paid'
      color = 'orange'
      break
    }

    case 'package': {
      label = 'Packaged'
      color = 'green'
      break
    }

    case 'complete': {
      label = 'Shipped'
      color = 'green'
      break
    }

    case 'cancelled': {
      label = 'Cancelled'
      color = 'red'
      break
    }

    default: {
      label = 'Unknown'
      color = 'grey'
      break
    }
  }

  return (
    <Chip
      label={label}
      className={`${styles['chip']} ${styles[color]}`}
    />
  )
}

function MessageToDispay(state) {
  let message

  switch(state) {
    case 'transfer': {
      message = 'Order is currently being processed internally and a sale representative will be in contact with you very soon.'
      break
    }

    case 'paid': {
      message = 'Order has been paid for and is currently being packaged to be sent.'
      break
    }

    case 'package': {
      message = 'Order has been packaged and is waiting for the next shipping cycle.'
      break
    }

    case 'complete': {
      message = 'Order has been packaged and sent. It should haved arrived at the specified address or it is on its way.'
      break
    }

    case 'cancelled': {
      message = 'Order has been cancelled.'
      break
    }

    default: {
      message = 'Order does not have a known tracking state, please contact us for more information.'
      break
    }
  }

  return message
}

const TrackerSection = () => {
  const [searchInput, setSeachInput] = useState('')
  const [searchInputUsed, setSearchInputUsed] = useState('')
  const [current, send] = useMachine(TrackMyOrderController)

  const loading = current.matches('loading') || current.matches('retry')

  function StateToView() {
    const idle = current.matches('idle')
    const ready = current.matches('success') && current.context.data?.trackOrder?.length > 0
    const empty = current.matches('success')
    const error = current.matches('fail')

    switch(true) {
      case ready: {
        return (
          <List>
            {
              current.context.data.trackOrder.map(order => (
                <ListItem
                  key={order.id}
                >
                  <ListItemText
                    primary={(
                      <div>
                        <b>{order.email}:</b>
                        {' '}
                        {OrderStateTag(order.state)}
                      </div>
                    )}
                    secondary={(
                      <div>
                        {MessageToDispay(order.state)}
                      </div>
                    )}
                  />
                </ListItem>
              ))
            }
          </List>
        )
      }

      case idle: {
        return (
          <Alert
            iconMapping={{
              success: <InfoOutlined />
            }}
          >
            <AlertTitle>
              <b>Search for your order</b>
            </AlertTitle>
            You can find your order reference in your email inbox.<br/>
            If you <b>did not</b> receive one, please contact us and we will help you find it.
          </Alert>
        )
      }

      case error: {
        return (
          <Alert
            severity='error'
          >
            <AlertTitle>
              <b>Something went wrong</b>
            </AlertTitle>
            We could not search for your order.
          </Alert>
        )
      }

      case empty:
      default: {
        return (
          <Alert
            iconMapping={{
              success: <InfoOutlined />
            }}
          >
            <AlertTitle>
              Could not find order with the reference: <b>{searchInputUsed}</b>
            </AlertTitle>
            We could not find the order you are looking for.<br/>
            Please make sure the order reference is correct and that it is in the correct format<br/><br/>
            <i>adjective</i>-<i>noun</i>-<i>number</i>
          </Alert>
        )
      }
    }
  }

  console.log(current.context.data)

  function _handleChange(e) {
    // Sanitize search box
    const searchTerm = e.target.value.replace(/\s/g,'').toLowerCase()
    setSeachInput(searchTerm)
  }

  function _handleSubmit(e) {
    e.preventDefault()
    if(!searchInput || searchInput === searchInputUsed) return

    send('FETCH', {
      searchTerm: searchInput
    })
    setSearchInputUsed(searchInput)
  }

  return (
    <Section
      className={styles['trackerSection']}
      gutterSize='xs'
    >
      <div
        className={styles['titleContainer']}
      >
        <Typography
          variant='h3'
          color='secondary'
        >
          <b>Search By Reference</b>
        </Typography>
      </div>
      
      <div
        className={styles['searchBoxContainer']}
      >
        <form
          onSubmit={_handleSubmit}
        >
          <TextField
            autoFocus
            label='Order Reference'
            color='secondary'
            variant='outlined'
            onChange={_handleChange}
            value={searchInput}
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
              ),
              endAdornment: (
                <InputAdornment
                  position='end'
                >
                  {
                    loading ? (
                      <CircularProgress
                        color='secondary'
                        size='20px'
                      />
                    ) : (
                      <IconButton
                        size='small'
                        type='submit'
                      >
                        <ChevronRightOutlined />
                      </IconButton>
                    )
                  }
                </InputAdornment>
              )
            }}
          />
        </form>
      </div>

      <Divider />

      <div>
        {StateToView()}
      </div>
    </Section>
  )
}

export default TrackerSection
