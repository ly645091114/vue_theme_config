<template>
  <el-color-picker
    v-model="theme"
    :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]" />
</template>
<script>
import { mapGetters } from 'vuex'
const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color

export default {
  name: 'ThemePicker',
  data () {
    return {
      chalk: '',
      theme: ''
    }
  },
  computed: {
    ...mapGetters({
      stateTheme: 'theme'
    }),
    defaultTheme () {
      let self = this
      return self.stateTheme
    }
  },
  watch: {
    defaultTheme: {
      handler: function (val, oldVal) {
        let self = this
        self.theme = val
      },
      immediate: true
    },
    async theme (val) {
      let self = this
      const oldVal = self.chalk ? self.theme : ORIGINAL_THEME
      if (typeof val !== 'string') return
      const themeCluster = self.getThemeCluster(val.replace('#', ''))
      const originalCluster = self.getThemeCluster(oldVal.replace('#', ''))

      /**
       * @description 通过动态创建 `style` 节点的方式 `document.createElement('style')` 将样式文本加入 dom 中
       * @param { String } variable 取值变量
       * @param { String } id 样式节点 id
       */
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = self.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
          const newStyle = self.updateStyle(self[variable], originalCluster, themeCluster)

          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerText = newStyle
        }
      }

      if (!self.chalk) { // 第一次加载时，获取样式文件
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        await self.getCSSString(url, 'chalk')
      }

      const chalkHandler = getHandler('chalk', 'chalk-style')

      chalkHandler()

      const styles = [].slice.call(document.querySelectorAll('style')) // 查找所有样式节点, 将 NodeList 转变成数组, 筛选元素 innerText 中包含旧数值的元素
        .filter(style => {
          const text = style.innerText
          return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        })
      styles.forEach(style => { // 遍历数组, 将元素中的 innerText 通过正则的形式将旧数值,替换成新数值, 并重新赋值
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = self.updateStyle(innerText, originalCluster, themeCluster)
      })

      self.$emit('change', val)
    }
  },
  methods: {
    /**
     * @description 将文本中的旧数值替换成新数值
     * @param { String } style 样式文本
     * @param { String } oldCluster 旧数值
     * @param { String } newCluster 新数值
     * @returns { String } 替换值
     */
    updateStyle (style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },

    /**
     * @description 获取 .css 文件，并将其保存在变量中
     * @param { String } url 文件路径
     * @param { String } variable 文本保存变量
     */
    getCSSString (url, variable) {
      let self = this
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            self[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '') // 通过正则匹配的方式将原有文本中的 `@font-face` 去掉（防止同名字库覆盖）
            resolve()
          }
        }
        xhr.open('GET', url)
        xhr.send()
      })
    },

    /**
     * @description 将主题色淡化，深化
     * @param { String } theme 色值
     * @returns { Array } 色值数组
     */
    getThemeCluster (theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        if (tint === 0) { // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }

      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    }
  }
}
</script>
