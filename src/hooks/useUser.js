import { useContext } from 'react'

// Context
import { UserInfo } from '../organisms/private_route'

export function useUser() {
  const user = useContext(UserInfo)

  return {info: user.info}
}