<template>
    <div class="default-layout">
        <Header></Header>
        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
import Header from '../components/default/header.vue';
export default {
    components: {
        Header
    }
};
</script>

<style scoped>
.default-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f8f9fa; 
}

main {
    margin-top: 60px;
    background-color: #ffffff; 
}

/* @media (max-width: 768px) {
    main {
        padding: 10px;
    }
} */
</style>
