<template>
  <div id="app">
    <loading v-if="$store.state.loading"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
//   import mTabbar from './components/tabbar'
//   import mTabbarItem from './components/tabbar-item'
//   export default {
//     name: 'app',
//     components: {
//       mTabbar,
//       mTabbarItem
//     },
//     data() {
//       return {
//         select: "Index"
//       }
//     }
//   }
</script>

<style>
</style>