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

  LinearProgress
} from '@material-ui/core'
import { CheckCircleOutline } from '@material-ui/icons'

// Hooks
import { useService } from '@xstate/react'

// Global Controllers
import { CartService } from '../../organisms/provider'

const ReconcileModal = () => {
  const [current, send] = useService(CartService)

  const loading = current.matches({ loading: 'cartReconcile' })

  function _handleCartRecon(mode){
    send('RECONCILE', {
      mode
    })
  }

  function _handleCancel() {
    send('CANCEL_RECONCILE')
  }

  return (
    <Dialog
      open={current.context.reconcileCart || false}
      fullWidth
      maxWidth='xs'
    >
      {
        loading && (
          <LinearProgress
            color='secondary'
          />
        )
      }
      
      <DialogTitle>
        Cart Conflict
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Your current account already has a cart, but there seems to be an anonymous cart associated with this device.
        </DialogContentText>

        <DialogContentText>
          How would you like to handle this?
        </DialogContentText>
        
      </DialogContent>

      <List>
        <ListItem
          button
          disabled={loading}
          onClick={() => _handleCartRecon('user')}
        >
          <ListItemIcon>
            <CheckCircleOutline />
          </ListItemIcon>

          <ListItemText
            primary='Keep my cart. (Default)'
            secondary='Your logged in cart will be kept and the anonymous cart will be discarded.'
          />
        </ListItem>

        <ListItem
          button
          disabled={loading}
          onClick={() => _handleCartRecon('anon')}
        >
          <ListItemIcon>
            <CheckCircleOutline />
          </ListItemIcon>

          <ListItemText
            primary='Keep anonymous cart.'
            secondary='The anonymous cart will now become your logged in cart.'
          />
        </ListItem>

        <ListItem
          button
          disabled={loading}
          onClick={() => _handleCartRecon('merge')}
        >
          <ListItemIcon>
            <CheckCircleOutline />
          </ListItemIcon>

          <ListItemText
            primary='Merge both carts.'
            secondary='Keep both carts but merge them into one cart.'
          />
        </ListItem>
      </List>
    </Dialog>
  )
}

export default ReconcileModal
