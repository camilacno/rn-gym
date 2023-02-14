import { createContext, ReactNode, useEffect, useState } from 'react'

import { api } from '@services/api'
import { UserDTO } from '@dtos/UserDTO'
import { storageAuthTokenSave } from '@storage/storageAuthToken'
import {
  storageUserSave,
  storageUserRemove,
  storageUserget,
} from '@storage/storageUser'

export type AuthContextDataProps = {
  user: UserDTO
  isLoadingUserStoredData: boolean
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
  const [isLoadingUserStoredData, setIsLoadingUserStoredData] = useState(false)

  async function storageUserAndToken(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStoredData(true)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      await storageUserSave(userData)
      await storageAuthTokenSave(token)
      setUser(userData)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStoredData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })
      if (data.user && data.token) {
        storageUserAndToken(data.user, data.token)
      }
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStoredData(true)
      const userLogged = await storageUserget()
      if (userLogged) {
        setUser(userLogged)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStoredData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStoredData(true)
      setUser({} as UserDTO)
      await storageUserRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStoredData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoadingUserStoredData, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
function storageUserAndToken(user: any, token: any) {
  throw new Error('Function not implemented.')
}

function setIsLoadingUserStoredData(arg0: boolean) {
  throw new Error('Function not implemented.')
}

function setUser(userLogged: UserDTO) {
  throw new Error('Function not implemented.')
}
