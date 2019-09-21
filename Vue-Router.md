#### Vue-Router 分析

```
component: () => import(/* webpackChunkName: "about" */ './view/about/about.vue')
会单独请求了组件的内容

动态路由：传参数使用
	{
		path: '/detail/:id', ---> id会在参数中显示 获取时： $route.params.id
		name: 'detail',
		component: Detail
	}
```

##### 原理-凡是Vue插件都会use一下，install被调用，vue被传入install中

- 实现插件 use了一下

- routes的解析  匹配path和component对应

- 监控url的hash变化：响应hash变化，获取并显示对应的组件

- 挂载$router

- 实现全局组件 router-view router-link

     ```
  // 插件
  let Vue; 传入vue
  export default class VueRouter {
  	constructor(options) {
  		this.$options = options;
  		// 声明map, 将path和component映射
  		this.routeMap = {}
  		// 当前的current响应化
  		// this.current = '/'
  		this.app = new Vue({
  			data: {current: '/'}
  		})
  	}
  	
  	init() {
  		// 1.事件监听
  		this.bindRvents();
  		// 创建路由映射
  		this.createRouteMap();
  		// 3. 声明两个全局组件
  		this.initComponent();
  	}
  	
  	bindEvents() {
  		window.addEventListener('hashchange', this.onHashChange.bind(this));
  		window.addEvenetListener('load', this.onHashChange.bind(this));
  	}
  	
  	onHashChange() {
		this.app.current = window.location.hash.slice(1) || '/';
  	}
  	
  	createRouteMap() {
  		this.$options.routes.forEach(item = > {
  			this.routerMap[item.path] = item.component;
  		})
  	}
  	
  	initComponent() {
  		Vue.component('route-link', {
  			props: {to: {type: String. required: true}},
  			render(h) {
  				// 生成虚拟dom
  				// 描述渲染dom结构
  				// h(tag, data, children)
  				return h('a', {attrs: {href: this.to}}, [this.$slots.default])
  				// return <a href={this.to}>{this.$slots.default}</a> jsx语法
  			}
  		})
  		Vue.component('router-view', {
  			render: h => {
  				const component = this.routeMap[this.app.current];
  				return h(component);
  			}
  		})
  	}
  	
  }
  
  VueRouter.install = function(_Vue) {
  	Vue = _Vue;
  	// 混入
  	Vue.mixin({
  		beforeCreate() {
  			// 目的是？希望接下来的代码在每个组件创建时都执行一次
  			if (this.$options.router) {
  				Vue.prototype.$router = this.$options.router;
  				this.$options.router.init();
  			}
  		}
  	})
  }
  具体的内容还需要查阅源码的实现
  比如 多层嵌套路由，路由守卫，参数配置等等
  ```
  
  ### 除去前后空白字符正则表达式
  
  ```
  Str.replace(/(^\s*)|(\s*$)/g, '')
  ```
  
  #### 判断一个数是整数
  
  ```
  1. 使用取余运算符
  function isInteger(val) {
  	return val % 1 === 0
  }
  增强版
  isInteger = (val) => (typeof val === 'number' && val % 1 === 0)
  
  2. 使用Math.round Math.ceil Math.floor判断
  isInteger = (val) => (Math.floor(val) === val)
  
  3.通过parseInt判断
  function isInteger(val) {
  	return parseInt(val, 10) === val
  }
  4. 通过位运算判断
  const isInteger = val => (val | 0 === val)
  5. 使用es6的Number.isInteger
  ```
  
  ### Vuex原理
  
  ```
  let Vue;
  class Store {
  	constructor(options) {
  		this.state = new Vue({
  			data: options.state
  		});
  		// mutations : {add: function(){}}
  		this.mutations = options.mutations || {}
  		
  		this.actions = options.actions || {}
  		
  		this.handleGetters(options.getters);
  	}
  	handleGetters(getters) {
  		this.getters = {};
  		// 只读属性
  		Object.keys(getters).forEach(key => {
  			Object.defineProperty(this.getters. key, {
  				get: () => {
  					return getters[key](this.state)
  				}
  			})
  		})
  	}
  	commit = (type, arg) => {
  		this.mutation[type](this.state, arg)
  	}
  	dispatch = (type, arg) => {
  		this.actions[type]({
  			commit: this.commit,
  			state: this.state,
  			getters: this.getters
  		}, arg)
  	}
  }
  function install(_Vue) {
  	Vue = _Vue;
  	Vue.minin({
  		beforeCreate() {
  			if (this.$options.store) {
  				Vue.prototype.$store = this.$options.store;
  			}
  		}
  	})
  }
  expport default { Store, install }
  ```
  
  