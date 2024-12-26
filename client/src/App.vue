<template>
  <div class="page">
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>


export default {
  components: {

  },
};
</script>

<style >
    .page{
      height: auto;
      width: 100%;
      /* background: var(--black); */
    }
    
    .router-view {
      width: 100%; 
    }
</style>