<template>
  <view class="home-main">
    <text @click="sayHello">Hello Uni!</text>
    <home-logo></home-logo>
  </view>
</template>

<script>
  import HomeLogo from './components/Logo'

  export default {
    name: 'home-main',
    components: {
      HomeLogo
    },
    methods: {
      sayHello () {
        uni.showToast({
          title: 'Hello Uni!',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
</script>

<style>
  .home-main {

    & > text {
      display: block;
      padding: 150px 0;
      font-size: 100px;
      font-weight: bold;
      line-height: 200px;
      text-align: center;
    }
  }
</style>
