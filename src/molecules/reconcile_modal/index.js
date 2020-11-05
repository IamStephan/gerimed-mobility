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

  function _handleClose() {
    /**
     * Note:
     * =====
     * When the user closes the tab merge the two carts
     * The user can accidentally close the cart and if that
     * happens there will be no lost data. It might make sense that the
     * user would in this case wanted to delete the anonymous cart
     * but in both scenarios the merging of both carts would seem
     * the least destructive and frustrating.
     * 
     * Also this would allow for better sale conversions, since it forces
     * the user to explicitly remove the unwanted items in the cart page.
     * This then in turn causes the user revaluate their initial decision.
     * (Basically a second wind for the site)
     * 
     */
    send('RECONCILE', {
      mode: 'merge'
    })
  }

  return (
    <Dialog
      open={current.context.reconcileCart || false}
      fullWidth
      maxWidth='xs'
      onClose={_handleClose}
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
