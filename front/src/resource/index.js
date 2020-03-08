import UserProvider from './UserProvider'
import AuthProvider from './AuthProvider'

// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const UserService = new UserProvider('users')
export const AuthService = new AuthProvider('auth')
