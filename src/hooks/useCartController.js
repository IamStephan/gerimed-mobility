import { useContext } from 'react'

import { useService } from '@xstate/react'

import { GlobalContext } from '../organisms/provider'

export function useCartController() {
  const { CartController } = useContext(GlobalContext)

  return useService(CartController) // <= should be an array [current, send]
}