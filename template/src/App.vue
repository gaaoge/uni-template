<script>
import { trackInit } from '@/utils/track'
import { shareCallback } from '@/utils/share'

export default {
  mpType: 'app',
  onLaunch(options) {
    // App Launch
    trackInit(options)
  },
  onShow() {
    // App Show
    shareCallback()
  },
  onHide() {
    // App Hide
  },
}
</script>

<style lang="postcss">
page {
  font: 28px/1.5 sans-serif;
}
</style>
