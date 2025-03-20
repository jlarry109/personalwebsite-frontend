<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
          email: this.email,
          password: this.password
        });

        const { token, role } = response.data; // Expecting role in response
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        // ✅ Set Authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // ✅ Redirect based on role
        if (role === 'ADMIN') {
          this.$router.push('/admin');
        } else {
          this.$router.push('/dashboard');
        }
      } catch (error) {
        this.errorMessage = 'Invalid email or password';
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.input-group {
  margin-bottom: 15px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
