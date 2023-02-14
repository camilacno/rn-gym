import { createContext, ReactNode, useEffect, useState } from 'react'

import { api } from '@services/api'
import { UserDTO } from '@dtos/UserDTO'
import {
  storageUserSave,
  storageUserRemove,
  storageUserget,
} from '@storage/storageUser'

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}
export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })
      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    const userLogged = await storageUserget()
    if (userLogged) {
      setUser(userLogged)
    }
  }

  async function signOut() {
    try {
      setUser({} as UserDTO)
      await storageUserRemove()
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
