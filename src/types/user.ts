export interface UserInfo {
  id: number
  username: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface LoginResponse {
  token: string
  userInfo: UserInfo
}
