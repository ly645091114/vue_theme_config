<template>
  <header>
    <a>
      <span class="site-name">Vue Theme Config</span>
    </a>
    <div class="tools">
      <theme-picker @change="themeChange"/>
    </div>
  </header>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PageHeader',
  data () {
    return {
      color1: '#409EFF'
    }
  },
  computed: {
    ...mapGetters({
      theme: 'theme'
    })
  },
  methods: {
    ...mapActions({
      changeSetting: 'changeSetting'
    }),

    /**
     * @description 主题色改变
     * @param { String } val 色值
     */
    themeChange (val) {
      let self = this
      self.changeSetting({
        key: 'theme',
        value: val
      })
    }
  }
}
</script>
