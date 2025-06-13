import request from '@/utils/request'
import type { LoginResponse } from '@/types/user'

interface RegisterData {
  username: string
  password: string
}

interface LoginData {
  username: string
  password: string
}

export const register = (data: RegisterData) => {
  return request({
    url: '/api/user/register',
    method: 'post',
    data,
  })
}

export const login = (data: LoginData) => {
  return request({
    url: '/api/user/login',
    method: 'post',
    data,
  }).then((res) => res.data as LoginResponse)
}
