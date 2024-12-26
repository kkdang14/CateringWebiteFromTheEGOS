<template>
    <div class="dashboard-container">
        <h1 class="dasboard-title">THIS IS DASHBOARD</h1>
        <h4>Comming soon...</h4>
    </div>
</template>

<script>
export default {
    name: "DashboardPage",
};
</script>

<style scoped>
.dashboard-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #e67337; 
    height: 100%; /* Full viewport height */
    background: #f7f7f7; /* Light gray background for a clean look */
    padding: 20px;
    box-sizing: border-box;
    text-align: center; /* Ensures content is centered horizontally */
}

.dashboard-title {
    font-size: 2.5rem; 
    color: #333; 
    font-weight: 700; 
    margin: 0;
}
</style>
