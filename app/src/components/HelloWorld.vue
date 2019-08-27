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
  </div>
</template>

<script>

import KForm from './KForm/'
import KFormItem from './KFormItem/'
import KInput from './KInput/'

export default {
  name: 'HelloWorld',
  components: { 
    KInput,
    KFormItem,
    KForm,
  },
  props: {
    msg: String
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
