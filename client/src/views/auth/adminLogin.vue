<template>
    <div class="login-container">
        <h1>Admin Login</h1>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="form.username" placeholder="Enter your email" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="form.password" placeholder="Enter your password" required />
            </div>
            <button type="submit" class="btn">Login</button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import authService from '../../services/auth.service';
import { toast } from 'vue3-toastify';

export default {
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            errorMessage: "",
        };
    },
    methods: {
        async handleLogin() {
            // Reset error message
            this.errorMessage = "";

            try {
                // Simulate an API call to authenticate the user
                const response = await authService.login(this.form);
                console.log(response)
                console.log("Login successful!");
                toast.success('Login successful!', {
                    autoClose: 1000,
                })
                setTimeout(() => {
                    this.$router.push({name: 'Admin'});
                }, 1500);

            } catch (error) {
                this.errorMessage = "An error occurred. Please try again.";
                console.log(error)
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn {
    width: 100%;
    padding: 10px;
    background-color: #e67337; 
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn:hover {
    background-color: #c55f5f;
}

.error {
    color: red;
    margin-top: 10px;
    text-align: center;
}
</style>