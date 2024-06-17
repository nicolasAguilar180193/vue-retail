<template>
  <div id="app">
    <h1>Welcome to Your Vue.js App</h1>
    <nav>
      <router-link to="/products">Products</router-link>
      <router-link to="/orders">Orders</router-link>
      <router-link to="/create-order">Create Order</router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  nav a {
    margin: 0 10px;
  }
</style>
