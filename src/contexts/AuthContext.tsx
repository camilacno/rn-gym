import { createContext, ReactNode } from 'react'

import { UserDTO } from '@dtos/UserDTO'

export type AuthContextDataProps = {
  user: UserDTO
}

type AuthContextProviderProps = {
  children: ReactNode
}
export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: '4',
          name: 'Camila Nepomuceno',
          email: 'camila1@gmail.com',
          avatar: 'camila.png',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
