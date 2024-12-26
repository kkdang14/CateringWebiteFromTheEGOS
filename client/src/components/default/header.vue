<template>
    <div class="page">
        <nav class="nav">
            <div class="nav-bar">
                <router-link to="/" class="logo">Mother Fooding</router-link>
                <router-link to="/" class="nav-bar__item">Home</router-link>
                <router-link to="/catering" class="nav-bar__item">Catering</router-link>
            </div>
            <div class="other">
                <router-link to="/favorite" class="favorite">
                    <i class="fa-solid fa-heart"></i>
                </router-link>
                <router-link to="/cart" class="cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span v-if="updateCartCount" class="cart-count">({{ countCart }})</span>
                </router-link>
                <div v-if="!isLoggedIn">
                    <router-link to="/auth/login" class="login">Login</router-link>
                </div>
                <div v-else>
                    <div class="profile">
                        <i class="fa-solid fa-circle-user"></i>
                        <button @click="logout">LOGOUT</button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import authService from '../../services/auth.service';
export default {
    components: {
        
    },
    props: {

    },

    data() {
        return {
            isLoggedIn: false,
        }
    },

    created() {
        this.checkLoginStatus();
    },
    methods: {
        async checkLoginStatus() {
            try {
                const user = await authService.checkLogin();
                console.log("API Response User:", user); 
                this.isLoggedIn = !!user; 
                console.log("Login Status Updated:", this.isLoggedIn);
            } catch (error) {
                this.isLoggedIn = false;
                console.error("Error during login check:", error.response?.data || error.message);
            }
        },

        async logout() {
            try {
                await authService.logout()
                confirm("Logout successful!");
                this.$router.push({ name: "Login" });
            } catch (error) {
                console.error("Logout Error:", error);
            }
        },
    },
};
</script>

<style scoped>
.page {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #f8f9fa; /* Light background color */
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    background-color: #ffffff; /* White background for the nav */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    position: fixed;
    top: 0;
    z-index: 1000;
}

.nav-bar {
    display: flex;
    align-items: center;
    gap: 15px; /* Spacing between nav items */
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #333333; /* Dark text color */
}

.nav-bar__item {
    text-decoration: none;
    color: #555555; /* Medium gray text color */
    font-size: 1rem;
    padding: 5px 10px;
    transition: color 0.3s, background-color 0.3s;
}

.nav-bar__item:hover {
    color: #ffffff; /* White text on hover */
    background-color: #007bff; /* Blue background on hover */
    border-radius: 5px;
}

.other {
    display: flex;
    align-items: center;
    gap: 15px; /* Spacing between elements */
}

.favorite,
.cart,
.login {
    font-size: 1.2rem;
    text-decoration: none;
    color: #333333;
    position: relative;
}

.cart {
    display: flex;
    align-items: center;
    gap: 5px;
}

.cart-count {
    background-color: #ff5722; /* Orange background */
    color: #ffffff; /* White text */
    font-size: 0.8rem;
    padding: 2px 6px;
    border-radius: 50%;
    position: absolute;
    top: -5px;
    right: -10px;
}

.profile {
    display: flex;
    align-items: center;
    gap: 5px;
}

.profile i {
    font-size: 1.5rem;
    color: #007bff;
}

.profile button {
    background-color: #007bff; /* Blue background */
    color: #ffffff; /* White text */
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.profile button:hover {
    background-color: #0056b3; /* Darker blue on hover */
}
</style>
