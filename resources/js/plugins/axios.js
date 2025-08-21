import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
})

// Tambahkan interceptor request (misalnya untuk Auth Token)
api.interceptors.request.use(
  (config) => {
    // Contoh kalau pakai token simpan di localStorage
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Tambahkan interceptor response (untuk error handling global)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data)
    } else {
      console.error("Network Error:", error.message)
    }
    return Promise.reject(error)
  }
)

export default api
