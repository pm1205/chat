import { defineStore } from 'pinia'
import { ref } from 'vue'
import { register, login as loginApi } from '@/api/user'
import type { UserInfo } from '@/types/user'

interface LoginParams {
  username: string
  password: string
}

interface RegisterParams {
  username: string
  password: string
}

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref<UserInfo | null>(null)

  const registerUser = async (params: RegisterParams) => {
    try {
      await register(params)
    } catch (error) {
      console.error('注册失败:', error)
      throw error
    }
  }

  const login = async (params: LoginParams) => {
    try {
      const { token: newToken, userInfo: newUserInfo } = await loginApi(params)
      token.value = newToken
      userInfo.value = newUserInfo
      localStorage.setItem('token', newToken)
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  const logout = () => {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  const isLoggedIn = () => {
    return !!token.value
  }

  return {
    token,
    userInfo,
    registerUser,
    login,
    logout,
    isLoggedIn,
  }
})
