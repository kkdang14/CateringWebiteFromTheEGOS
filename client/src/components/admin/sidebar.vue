<template>
    <header class="admin-dashboard-taskbar">
        <p><strong>Admin Dashboard</strong></p>
        <div class="sidebar-container">
            <router-link to="/admin/dashboard">Dashboard</router-link>
            <router-link to="/admin/user-management">Users</router-link>
            <router-link to="/admin/product-management">Products</router-link>
            <router-link to="/admin/order-management">Orders</router-link>
            <router-link to="/">Chat</router-link>
            <router-link to="/">Contact</router-link>
        </div>
        <div class="account-container">
            <router-link class="profile">
                <i class="fa-solid fa-circle-user"></i>
                <span>Profile</span>
            </router-link>
            <router-link class="setting">
                <i class="fa-solid fa-gear"></i> 
                <span>Setting</span>
            </router-link>
            <button @click="logout">LOGOUT</button>
        </div>
    </header>
</template>

<script>
import authService from '../../services/auth.service';
import { toast } from 'vue3-toastify';
export default {
    name: 'AdminDashboardHeader',
    data() {
        return {
            
        }
    },
    methods: {
        async logout() {
            try {
                await authService.logout()
                toast.success('Logout successful!', {
                    autoClose: 1000,
                })
                setTimeout(() => {
                    this.$router.push({name: 'AdminLogin'});
                }, 1500);
            } catch (error) {
                console.error("Logout Error:", error);
            }
        },
    },

}
</script>

<style lang="css" scoped>
.admin-dashboard-taskbar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    text-align: center;
    width: 250px;
    height: 100vh; 
    border-radius: 15px;
    background: #fffaf5; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
}

.admin-dashboard-taskbar p {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    /* color: #e67337;  */
    color: #000;
    padding-bottom: 15px;
    border-bottom: 2px solid #ffd9b3; 
}


.sidebar-container {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    font-size: 18px;
    flex: 1;
}

.sidebar-container a {
    text-decoration: none;
    /* color: #e67337; */
    color: #000;
    margin: 10px 0;
    padding: 10px 15px;
    border-radius: 8px;
    transition: background 0.3s ease, color 0.3s ease;
    background: #fff0e6; 
    border: 1px solid #ffd9b3; 
}

.sidebar-container a:hover {
    background: #ff8c42; 
    color: #000; 
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.account-container {
    margin-top: auto; 
}

.account-container .profile {
    display: flex;
    margin: 0 0 8px 0;
    padding: 8px;
    text-decoration: none;
    gap: 8px;
}

.account-container .profile:hover {
    background: #fff0e6; 
    border-radius: 8px;
    cursor: pointer;
}

.account-container .profile i {
    font-size: 2rem;
    color: #e67337;
}

.account-container .profile span {
    font-size: 1.2rem;
    font-weight: bold;
    color: #e67337;
}

.account-container .setting {
    display: flex;
    margin: 0 0 8px 0;
    padding: 8px;
    text-decoration: none;
    gap: 8px;
}

.account-container .setting:hover {
    background: #fff0e6; 
    border-radius: 8px;
    cursor: pointer;
}

.account-container .setting i {
    font-size: 2rem;
    color: #e67337;
}

.account-container .setting span {
    font-size: 1.2rem;
    font-weight: bold;
    color: #e67337;
}


.account-container button {
    margin-top: 10px;
    padding: 8px 16px;
    font-size: 0.9rem;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(135deg, #ffa366, #ff8c42);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.account-container button:hover {
    background: linear-gradient(135deg, #ff8c42, #e67337); 
}


.sidebar-container a:hover,
.account-container button:hover {
    transform: translateY(-2px);
}


.sidebar-container a.router-link-active {
    background: #ff8c42; 
    color: var(--font-color);
    font-weight: bold;
}

.account-container .profile{
    display: flex;
    align-items: center;
    gap: 5px;
}
</style>
