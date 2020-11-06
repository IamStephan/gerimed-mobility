import React, { useState, useEffect } from 'react'

// Material
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  LinearProgress,
  Button
} from '@material-ui/core'
import {
  Alert,
  AlertTitle,
  Pagination
} from '@material-ui/lab'
import {
  InfoOutlined,
  VisibilityOutlined
} from '@material-ui/icons'

// Controller
import { FetchGraphqlData } from '../../../../controllers/fetchGraphqlData'

// Model
import { GET_MY_ORDERS } from './model'

// Hooks
import { useMachine } from '@xstate/react'

// Template
import TabTemplate from '../../components/tabTemplate'

// Utils
import { getAuthToken } from '../../../../utils/js/authToken'

// Styles
import styles from './styles.module.scss'

const OFFSET_AMOUNT = 5

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
      size='small'
    />
  )
}

const Months = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

function _formatDate(date) {
  const dateObj = new Date(date)

  const day = dateObj.getDate()
  const month = dateObj.getMonth()
  const year = dateObj.getFullYear()

  return `${day} ${Months[month]} ${year}`
}

/**
 * NOTE:
 * =====
 * 
 * This Tab is very inefficient in that it
 * fetches all the orders in one call. To change this
 * behaviour i have to either write an api for GetMyOrders
 * or make a custom controller for handling this. (Probably going to write
 * a custom API)
 * 
 * It also does not show all the information of that order and the reason for this
 * is that I did not yet implement a manner for which one can view these information
 * 
 * TODO:
 * ======
 * - Custom API for GetMyOrders
 * - Showcase more detail about these orders
 */

const PurchasesTab = () => {
  const authToken = getAuthToken()

  const [current, send] = useMachine(FetchGraphqlData, {
    context: {
      runOnce: false,
      graphqlQuery: GET_MY_ORDERS,
      options: {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      }
    }
  })

  function _retryFetch() {
    send('RESET')
  }

  const orders = current.context.data?.getMe?.orders
  const loading = current.matches('loading') || current.matches('idle') || current.matches('retry')
  const fail = current.matches('fail')

  return (
    <TabTemplate
      title='Purchase History'
    >
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                variant='head'
              >
                <b>Order Reference</b>
              </TableCell>

              <TableCell
                variant='head'
              >
                <b>Order Date</b>
              </TableCell>

              <TableCell
                variant='head'
                align='center'
              >
                <b>Current State</b>
              </TableCell>
            </TableRow>
          </TableBody>

          <TableBody>
            {
              loading && (
                <TableCell
                  colSpan={3}
                >
                  <LinearProgress
                    color='secondary'
                  />
                </TableCell>
              )
            }
            {
              fail ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                  >
                    <Alert
                      severity='error'
                      action={(
                        <Button
                          onClick={_retryFetch}
                        >
                          Retry
                        </Button>
                      )}
                    >
                      <AlertTitle>
                        <b>Could Not Load History</b>
                      </AlertTitle>
                    </Alert>
                  </TableCell>
                </TableRow>
              ) : orders?.length > 0 ? orders.map((order) => (
                <TableRow
                  key={order.id}
                >
                  <TableCell>
                    {order.reference}
                  </TableCell>

                  <TableCell>
                    {_formatDate(order.createdAt)}
                  </TableCell>

                  <TableCell
                    align='center'
                  >
                    {OrderStateTag(order.state)}
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                  >
                    <Alert
                      iconMapping={{
                        success: <InfoOutlined />
                      }}
                    >
                      <AlertTitle>
                        <b>No purchase History</b>
                      </AlertTitle>
                    </Alert>
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </TabTemplate>
  )
}

export default PurchasesTab
