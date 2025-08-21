<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" v-model="form.username" :class="{ 'error': errors.username }" @blur="validateUsername" />
          <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" :class="{ 'error': errors.password }"
            @blur="validatePassword" />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <button type="submit" :disabled="isLoading" class="submit-btn">
            <span v-if="isLoading">Logging in...</span>
            <span v-else>Login</span>
          </button>
        </div>

        <div v-if="generalError" class="error-message general-error">
          {{ generalError }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useUserAuth from '../composables/useUserAuth'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const { login } = useUserAuth()

    const form = reactive({
      username: '',
      password: ''
    })

    const errors = reactive({
      username: '',
      password: ''
    })

    const generalError = ref('')
    const isLoading = ref(false)

    const validateUsername = () => {
      if (!form.username) {
        errors.username = 'Username is required'
        return false
      }

      // Optionally add username format validation here
      errors.username = ''
      return true
    }

    const validatePassword = () => {
      if (!form.password) {
        errors.password = 'Password is required'
        return false
      }

      if (form.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
        return false
      }

      errors.password = ''
      return true
    }

    const validateForm = () => {
      const isUsernameValid = validateUsername()
      const isPasswordValid = validatePassword()

      return isUsernameValid && isPasswordValid
    }

    const handleSubmit = async () => {
      generalError.value = ''

      if (!validateForm()) {
        return
      }

      isLoading.value = true

      try {
        await login(form)

        // Redirect to dashboard after successful login
        router.push('/dashboard')
      } catch (error) {
        console.error('Login error:', error)

        // jika ada response dari server, gunakan isian dari API
        if (error.response) {
          const data = error.response.data

          // Jika ada validation errors (Laravel: errors -> { field: [msg] })
          if (data && data.errors) {
            // reset field errors first
            errors.username = ''
            errors.password = ''

            for (const key in data.errors) {
              if (!Object.prototype.hasOwnProperty.call(data.errors, key)) continue
              const msg = Array.isArray(data.errors[key]) ? data.errors[key][0] : data.errors[key]
              if (key === 'username') errors.username = msg
              else if (key === 'password') errors.password = msg
              else generalError.value = msg
            }
          } else if (data && data.message) {
            generalError.value = data.message
          } else {
            generalError.value = 'Login failed. Please check your credentials and try again.'
          }
        } else {
          // no response, likely network error
          generalError.value = 'Network error. Please check your connection and try again.'
        }
      } finally {
        isLoading.value = false
      }
    }

    return {
      form,
      errors,
      generalError,
      isLoading,
      validateUsername,
      validatePassword,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.login-form {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
}

.form-group input.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
  display: block;
}

.general-error {
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.submit-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>