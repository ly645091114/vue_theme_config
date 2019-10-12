import PageMain from './main'
let components = {}
components.install = Vue => {
  Vue.component(PageMain.name, PageMain)
}
export default components
