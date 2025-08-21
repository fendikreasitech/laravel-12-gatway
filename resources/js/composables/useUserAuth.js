import { ref } from "vue"
import api from "../plugins/axios"

export default function useUserAuth() {
  const isLoggedIn = ref(!!localStorage.getItem('token'))

  const login = async (credentials) => {
    try {
      const response = await api.post('/v1/auth/login', credentials)

      // token mungkin berada di response.data.token atau response.data.data.token
      const token = response.data?.access_token ?? response.data?.data?.access_token
      if (token) {
        localStorage.setItem('token', token)
        isLoggedIn.value = true
      }

      // kembalikan response agar caller bisa memakai data bila perlu
      return response
    } catch (error) {
      // log kemudian teruskan error supaya komponen pemanggil bisa menangani
      console.error("Login failed:", error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    isLoggedIn.value = false
  }

  return {
    isLoggedIn,
    login,
    logout
  }
}
