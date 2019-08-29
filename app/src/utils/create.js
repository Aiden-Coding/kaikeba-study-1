import Vue from 'vue';
export default (component, props) => {
    const vm = new Vue({
        render: h => h(component, {props})
    }).$mount();

    document.body.appendChild(vm.$el);

    const comp = vm.$children[0];
    comp.remove = () => {
        document.body.removeChild(vm.$el);
        comp.$destroy();
    }
    return comp;
}