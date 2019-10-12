import Header from './header'
import Nav from './sidebar'
import Main from './main'
import ThemePicker from './theme-picker'

let components = {}
components.install = Vue => {
  Vue.use(Header)
  Vue.use(Nav)
  Vue.use(Main)
  Vue.use(ThemePicker)
}

export default components
