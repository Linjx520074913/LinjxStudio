<template>
<div id="login_root">
  <div id="login_container">
    <el-row>
        <el-col :span="8">
        <el-input id="account" v-model="account" placeholder="请输入帐号">
            <template slot="prepend">帐号</template>
        </el-input>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="8">
        <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
            <template slot="prepend">密码</template>
        </el-input>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="8">
        <el-button id="login" v-on:click="submit" style="width:100%" type="primary">登录</el-button>
        </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import '../assets/css/reset.css'
export default {
  name: 'LoginPage',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    submit () {
      // TODO : vscode 报 Property '$router' does not exist on type 错误，但实际运行效果没问题，主要因为 vscode
      // 会根据声明文件自动进行类型推断，这里不知道 $router 类型
      this.$router.push('/MainWindow')
    }
  }
}
</script>

<style>
/* #login_root {
  height: 100%;
  background: url(/imgs/login_cover.jpg) no-repeat;
  background-size:cover;
} */
#login_container {
  margin-top:25%;
  margin-left:40%;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
