import React, { useState, useEffect } from 'react'

// Material
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Typography,
  Button,
  IconButton
} from '@material-ui/core'
import {
  Alert,
  AlertTitle,
  Pagination,
  Skeleton
} from '@material-ui/lab'
import {
  InfoOutlined,
  VisibilityOutlined
} from '@material-ui/icons'

// Local Contoller
import { LocalController } from './controller'

// Local Molecules
import OrderModal from './molecules/order_modal'

// Hooks
import { useMachine } from '@xstate/react'

// Template
import TabTemplate from '../../components/tabTemplate'

// Styles
import styles from './styles.module.scss'

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

const PAGE_SIZE_LIMIT = 10

const PurchasesTab = () => {  
  const [current, send] = useMachine(LocalController, {
    context: {
      page_item_limit: PAGE_SIZE_LIMIT
    }
  })

  const loading = current.matches('ready') || current.matches('loading') || current.matches('retry')
  const show = current.matches('idle')
  const error = current.matches('fail')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  function _toggleModal(data) {
    if(isModalOpen) {
      setIsModalOpen(false)
    } else {
      setIsModalOpen(true)
      setModalData(data)
    }
    
  }
  
  function _retry() {
    send('RESET')
  }

  function _setPage(_e, value) {
    send('SET_PAGE', {
      page: value
    })
  }

  function OrdersTableRows() {
    if(loading) {
      return (
        <>
          {
            [1,2,3].map((key, i) => (
              <TableRow
                key={key + i}
              >
                <TableCell>
                  <Skeleton>
                    <Typography>
                      proud-couger-81
                    </Typography>
                  </Skeleton>
                </TableCell>
      
                <TableCell>
                  <Skeleton>
                    <Typography>
                      20 November 2020
                    </Typography>
                  </Skeleton>
                </TableCell>
      
                <TableCell
                  align='center'
                >
                  <Skeleton>
                    <Chip
                      label='paid'
                      size='small'
                    />
                  </Skeleton>
                </TableCell>
      
                <TableCell
                  align='center'
                >
                  <Skeleton>
                    <IconButton
                      color='secondary'
                      size='small'
                    >
                      <VisibilityOutlined />
                    </IconButton>
                  </Skeleton>
                </TableCell>
              </TableRow>
            ))
          }
        </>
      )
    }

    if(show) {
      if(current.context.ordersCount) {
        return (
          <>
            {
              current.context.orders.map((order) => (
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
        
                  <TableCell
                    align='center'
                  >
                    <IconButton
                      color='secondary'
                      size='small'
                      onClick={() => _toggleModal(order)}
                    >
                      <VisibilityOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </>
        )
      } else {
        return (
          <TableRow>
            <TableCell
              colSpan={4}
            >
              <Alert
                iconMapping={{
                  success: <InfoOutlined fontSize="inherit" />
                }}
              >
                <AlertTitle>
                  <b>No Orders were found</b>
                </AlertTitle>

                You have not yet purchased anything.
              </Alert>
            </TableCell>
          </TableRow>
        )
      }
    }

    if(error) {
      return (
        <TableRow>
          <TableCell
            colSpan={4}
          >
            <Alert
              severity='error'
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={_retry}
                >
                  Retry
                </Button>
              }
            >
              <AlertTitle>
                <b>Could not load Products</b>
              </AlertTitle>

              There seems to be a technical error. Please, retry or contact us.
            </Alert>
          </TableCell>
        </TableRow>

      )
    }

    return null
  }

  function PagePagination() {
    if(loading) {
      return (
        <div
          className={styles['paginationContainer']}
        >
          <Skeleton>
            <Pagination
              variant='outlined'
              color='secondary'
              siblingCount={0} boundaryCount={1}
              count={30}
            />
          </Skeleton>
        </div>
      )
    }

    if(show && current.context.ordersCount > PAGE_SIZE_LIMIT) {
      return (  
        <div
          className={styles['paginationContainer']}
        >
          <Pagination
            variant='outlined'
            color='secondary'
            siblingCount={0} boundaryCount={1}
            page={Number(current.context.page)}
            onChange={_setPage}
            count={Math.ceil(current.context.ordersCount / PAGE_SIZE_LIMIT)}
          />
        </div>
      )
    }

    return null
  }

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

              <TableCell />
            </TableRow>
          </TableBody>

          <TableBody>
            { OrdersTableRows() }
          </TableBody>
        </Table>
      </TableContainer>
      
      { PagePagination() }

      <OrderModal
        isOpen={isModalOpen}
        toggleModal={_toggleModal}
        order={modalData}
      />
    </TabTemplate>
  )
}

export default PurchasesTab
