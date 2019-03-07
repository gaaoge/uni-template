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
      padding: 150upx 0;
      font-size: 100upx;
      font-weight: bold;
      line-height: 200upx;
      text-align: center;
    }
  }
</style>
