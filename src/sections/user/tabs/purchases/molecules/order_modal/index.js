import React from 'react'

// Material
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,

  List,
  ListItem,
  ListItemText,
  ListItemIcon,

  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,

  Chip
} from '@material-ui/core'
import {
  MailOutline,
  PhoneOutlined
} from '@material-ui/icons'

// Utils
import { Rand } from '../../../../../../utils/js/currency'

// Styles
import styles from './style.module.scss'

const provinces = {
  'EC': 'Eastern Cape',
  'FS': 'Free State',
  'GP': 'Gauteng',
  'KZN': 'Kwazulu Natal',
  'LP': 'Limpopo',
  'MP': 'Mpumlanga',
  'NC': 'Northern Cape',
  'NW': 'North West',
  'WC': 'Western Cape',
}

const countries = {
  'ZA': 'South Africa'
}

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
      component='span'
      label={label}
      className={`${styles['chip']} ${styles[color]}`}
      size='small'
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

const OrderModal = props => {
  const {
    isOpen,
    toggleModal,
    order
  } = props

  const products = order?.products || []

  console.log(products)

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={toggleModal}
      maxWidth='md'
      scroll='body'
    > 
      <DialogTitle>
        Order Reference: <b>{order.reference}</b>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          {OrderStateTag(order.state)}: {MessageToDispay(order.state)}
        </DialogContentText>
      </DialogContent>

      <br/>

      <DialogContent>
        <DialogContentText>
          <b>Products</b>
        </DialogContentText>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  variant='head'
                >
                  <b>Product Name</b>
                </TableCell>

                <TableCell
                  variant='head'
                  align='right'
                >
                  <b>Price</b>
                </TableCell>

                <TableCell
                  variant='head'
                  align='center'
                >
                  <b>Quantity</b>
                </TableCell>

                <TableCell
                  variant='head'
                  align='right'
                >
                  <b>Total</b>
                </TableCell>
              </TableRow>
            </TableBody>

            <TableBody>
              {
                products.map(product => (
                  <TableRow
                    key={product.id}
                  >
                    <TableCell>
                      {product.product_name}
                    </TableCell>

                    <TableCell
                      align='right'
                    >
                      {Rand(product.price).format()}
                    </TableCell>

                    <TableCell
                      align='center'
                    >
                      {product.quantity}
                    </TableCell>

                    <TableCell
                      align='right'
                    >
                      {Rand(product.price * product.quantity).format()}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <br/>

      <DialogContent>
        <DialogContentText>
          <b>Shipping Address</b>
        </DialogContentText>

        <List>
          <ListItem>
            <ListItemText
              primary={order?.address?.addressLineOne}
              secondary='Address Line'
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={order?.address?.addressLineTwo || '-'}
              secondary='Address Line'
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={order?.address?.suburb}
              secondary='Suburb'
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={order?.address?.['post_code']}
              secondary='Postal Code'
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={provinces[order?.address?.province]}
              secondary='Province'
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={countries[order?.address?.country]}
              secondary='Country'
            />
          </ListItem>
        </List>
      </DialogContent>

      <br/>

      <DialogContent>
        <DialogContentText>
          <b>Prefered Contact Information</b>
        </DialogContentText>

        <List>
          <ListItem>
            <ListItemIcon>
              <MailOutline
                color='secondary'
              />
            </ListItemIcon>
            <ListItemText
              primary={order?.contact?.email}
              secondary='Email'
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <PhoneOutlined
                color='secondary'
              />
            </ListItemIcon>
            <ListItemText
              primary={order?.contact?.phone || '-'}
              secondary='Phone'
            />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default OrderModal
