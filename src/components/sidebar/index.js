import PageNav from './sidebar'
let components = {}
components.install = Vue => {
  Vue.component(PageNav.name, PageNav)
}
export default components
