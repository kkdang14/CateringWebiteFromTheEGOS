<template>
    <div class="auth-layout">
        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
export default {};
</script>

<style>
.auth-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f7f7f7;
}
</style>