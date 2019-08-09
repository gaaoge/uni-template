<template>
  <view
    v-if="isShow"
    class="base-modal"
    :class="{ enter: isEnter, leave: isLeave }"
    @animationend="animationEnd"
    @webkitAnimationEnd="animationEnd"
  >
    <slot></slot>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'base-modal',
  props: {
    dialog: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShow: false,
      isEnter: false,
      isLeave: false
    }
  },
  computed: {
    _isShow() {
      return !!this.dialogConfig[this.dialog]
    },
    ...mapState('app', ['dialogConfig'])
  },
  watch: {
    _isShow(val) {
      if (val) this.isShow = val
      this.isEnter = val
      this.isLeave = !val
    }
  },
  methods: {
    animationEnd() {
      this.isShow = this._isShow
    }
  }
}
</script>

<style lang="postcss" scoped>
.base-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;

  &.enter {
    animation: base-modal-enter 0.3s both;
  }

  &.leave {
    animation: base-modal-leave 0.3s both;
  }
}

@keyframes base-modal-enter {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes base-modal-leave {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
