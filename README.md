# 动态主题更改的实现

## 业务场景

用户可以通过颜色选择器，随意更改站点的主题色，某个颗粒的颜色等等

## 项目描述

该项目以 [Element-UI](https://element.eleme.cn/#/zh-CN) 作为例子进行 (好吧其实是偷懒不想配 webpack， 写组件)

功能实现来自于 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 看了大佬的实现后再去理解，详细的讲解实现过程

## 项目启动

```
npm install

npm run serve
```

## 功能目录

- `src`
  - `components` 组件目录
    - `theme-picker` 主题选择组件（功能组件封装）
    - `header` 头部样式组件（功能组件调用）

## 关于功能点

- 首先我们要有个大概的思路，要实现主题色的修改我们应该做什么

  1. 当然是获取色值啦（想什么呢）

  2. 然后用新色值替换样式中的旧色值

- 好的第一步其实很简单了不多说，随便找个颜色选择器搞搞。

- 这个难点就出在第二步了，我们要怎么做才能替换旧样式呢？

- 其实这一点解释清楚后就不是难点了：
  1. 我们通过 XHR 请求去获取组件模块的 `.css` 文件，这个时候我们拿到 `responseText` 就是样式文本，然后我们通过正则匹配的方式将原有文本中的 `@font-face` 去掉（防止同名字库覆盖）；

  ```
  if (!self.chalk) { // 第一次加载时，获取样式文件
    const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
    await self.getCSSString(url, 'chalk')
  }
  
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
  }
  ```

  2. 通过动态创建 `style` 节点的方式 `document.createElement('style')` 将样式文本加入 dom 中；

  ```
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
  ```

  3. 通过 `querySelectorAll('style')` 方法查找所有样式节点, 获得一个 `NodeList` 类数组对象，通过 `[].slice.call()` 将 `NodeList` 转变成数组, 筛选元素 `innerText` 中包含旧数值的元素
  
  ```
  const styles = [].slice.call(document.querySelectorAll('style'))
    .filter(style => {
      const text = style.innerText
      return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
    })
  ```

  4. 遍历数组, 将元素中的 `innerText` 通过正则的形式将旧数值, 替换成新数值, 并重新赋值
  
  ```
  styles.forEach(style => {
    const { innerText } = style
    if (typeof innerText !== 'string') return
    style.innerText = self.updateStyle(innerText, originalCluster, themeCluster)
  })

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
  }
  ```
- 以上就是大致的思路了

## 功能拓展

关于如何将色值配置保存, Vue 的项目我们可以通过 Vuex 保存他的全局状态
