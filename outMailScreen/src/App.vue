<template>
  <div id="app">
    <!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->

    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  height: 100%;
}
</style>
