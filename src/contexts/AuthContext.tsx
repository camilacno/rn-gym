import { createContext, ReactNode, useEffect, useState } from 'react'

import { api } from '@services/api'
import { UserDTO } from '@dtos/UserDTO'
import {
  storageAuthTokenSave,
  storageAuthTokenRemove,
  storageAuthTokenGet,
} from '@storage/storageAuthToken'
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

  async function removeUserAndToken() {
    try {
      setIsLoadingUserStoredData(true)

      setUser({} as UserDTO)
      await storageUserRemove()
      await storageAuthTokenRemove()
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
        await storageUserAndToken(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStoredData(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStoredData(true)
      const userLogged = await storageUserget()
      const token = await storageAuthTokenGet()
      if (token && userLogged) {
        await storageUserAndToken(userLogged, token)
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
      await removeUserAndToken()
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
