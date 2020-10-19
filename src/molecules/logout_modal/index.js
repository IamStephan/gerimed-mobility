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
import { AuthService } from '../../organisms/provider'

const ReconcileModal = () => {
  const [currentCart, sendCart] = useService(CartService)
  const [, sendAuth] = useService(AuthService)

  const loading = currentCart.matches({ loading: 'setAsUserCart' })

  function _handleKeepCart(){
    sendAuth('LOGOUT')
  }

  function _handleSetAsUserCart() {
    sendCart('SET_AS_USER_CART')
  }

  return (
    <Dialog
      open={currentCart.context.setAsUserCart || false}
      fullWidth
      onClose={_handleKeepCart}
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
        Cart Inconsistency
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Your current device has an anonymous cart associated with it.
        </DialogContentText>

        <DialogContentText>
          How would you like to handle this?
        </DialogContentText>
        
      </DialogContent>

      <List>
      <ListItem
          button
          disabled={loading}
          onClick={_handleKeepCart}
        >
          <ListItemIcon>
            <CheckCircleOutline />
          </ListItemIcon>

          <ListItemText
            primary='Keep anonymous cart.'
            secondary='Keep on using the anonymous cart without setting it as mine. Logout required. (Default)'
          />
        </ListItem>

        <ListItem
          button
          disabled={loading}
          onClick={_handleSetAsUserCart}
        >
          <ListItemIcon>
            <CheckCircleOutline />
          </ListItemIcon>

          <ListItemText
            primary='Set as my cart.'
            secondary='Set the anonymous cart as my logged in cart.'
          />
        </ListItem>
      </List>
    </Dialog>
  )
}

export default ReconcileModal
