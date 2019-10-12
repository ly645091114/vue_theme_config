import ThemePicker from './theme-picker'
let components = {}
components.install = Vue => {
  Vue.component(ThemePicker.name, ThemePicker)
}

export default components
