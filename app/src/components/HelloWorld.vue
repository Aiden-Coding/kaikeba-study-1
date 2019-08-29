<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <k-form :model="model" :rules="rules">
        <k-form-item prop="username" label="用户名">
            <k-input v-model="model.username" placeholder="input your name"></k-input>
        </k-form-item>
        <k-form-item prop="password" label="密码">
            <k-input v-model="model.password" placeholder="input your password"></k-input>
        </k-form-item>
    </k-form>
    <hr>
    <TreeNode :tree="treeData"/>  

    <button @click="openNotice">click me</button>

  </div>
</template>

<script>

import KForm from './KForm/'
import KFormItem from './KFormItem/'
import KInput from './KInput/'
import TreeNode from './KTree'
import create from '../utils/create'
import Notice from './KNotice/'

export default {
  name: 'HelloWorld',
  components: { 
    KInput,
    KFormItem,
    KForm,
    TreeNode
  },
  props: {
    msg: String
  },
  methods: {
    openNotice() {
      const notice = create(Notice, {title: '哈哈哈', message: 'Notice!!!'});
      notice.show();
    }
  },
  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: 'please input userame'},
        ],
        password: [
          {required: true, message: 'please input password'},
        ]
      },
      treeData: {
        title: "Web全栈架构师",
        children: [
          {
            title: "Java架构师"
          },
          {
            title: "JS高级",
            children: [
              {
                title: "ES6"
              },
              {
                title: "动效"
              }
            ]
          },
          {
            title: "Web全栈",
            children: [
              {
                title: "Vue训练营",
                expand: true,
                children: [
                  {
                    title: "组件化"
                  },
                  {
                    title: "源码"
                  },
                  {
                    title: "docker部署"
                  }
                ]
              },
              {
                title: "React",
                children: [
                  {
                    title: "JSX"
                  },
                  {
                    title: "虚拟DOM"
                  }
                ]
              },
              {
                title: "Node"
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
