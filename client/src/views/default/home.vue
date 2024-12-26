<template>
    <div class="home-container">
        <h1 class="home-title">THIS IS HOME PAGE</h1>
    </div>
</template>

<script>
export default {
    name: "HomePage",
};
</script>

<style scoped>
.home-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Full viewport height */
    background: #f7f7f7; /* Light gray background for a clean look */
    padding: 20px;
    box-sizing: border-box;
    text-align: center; /* Ensures content is centered horizontally */
}

.home-title {
    font-size: 2.5rem; /* Larger font for emphasis */
    color: #333; /* Dark gray text for readability */
    font-weight: 700; /* Bold text */
    margin: 0;
}
</style>
