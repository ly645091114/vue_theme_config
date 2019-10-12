import PageHeader from './header'
let components = {}
components.install = Vue => {
  Vue.component(PageHeader.name, PageHeader)
}
export default components
