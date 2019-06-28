<template>
  <view class="home-page">
    <text @click="sayHello">Hello Uni!</text>
    <button open-type="share">
      <home-logo></home-logo>
    </button>
  </view>
</template>

<script>
import HomeLogo from './components/Logo'
import { getStaticPath } from '@/utils'

export default {
  name: 'home-page',
  components: {
    HomeLogo
  },
  methods: {
    sayHello() {
      uni.showToast({
        title: 'Hello Uni!',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onShareAppMessage() {
    return {
      title: 'Hello Uni!',
      path: 'pages/home/Page',
      imageUrl: getStaticPath('share-icon.png')
    }
  }
}
</script>

<style lang="postcss" scoped>
.home-page {
  position: relative;

  & > text {
    display: block;
    padding: 150px 0;
    font-size: 100px;
    font-weight: bold;
    line-height: 200px;
    text-align: center;
  }

  & > button {
    width: 400px;
    height: 400px;
    padding: 0;
    border: 0;
    margin: 0 auto;
    background: transparent;

    &:after {
      display: none;
    }
  }
}
</style>
