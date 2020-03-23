import { AuthService, UserService } from '../../resource'

export async function login (context, data) {
  try {
    const responseToken = await AuthService.create('login', {
      username: data.email,
      password: data.password
    })
    context.commit('setToken', responseToken.data.access_token)

    AuthService.setHeader({
      key: 'Authorization',
      value: `bearer ${responseToken.data.access_token}`
    })

    const responseUser = await UserService.fetch(`email/?email=${data.email}`)
    context.commit('setId', responseUser.data._id)
    context.commit('setName', responseUser.data.name)
    return responseToken.data.access_token
  } catch (err) {
    const message = {
      message: 'Can not make logout',
      status: false
    }
    throw message
  }
}

export async function logout (context) {
  try {
    context.commit('setToken', null)
    AuthService.setHeader({
      key: 'Authorization',
      value: null
    })
  } catch (err) {
    const message = {
      message: 'Can not make logout',
      status: false
    }
    throw message
  }
}
