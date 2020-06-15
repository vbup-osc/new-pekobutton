import Sbtn from './Sbtn/index.js'
const components = [
    Sbtn
]
const install = (Vue) => {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

export default {
    install,
    Sbtn
}