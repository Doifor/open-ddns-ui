<template>
  <div id="app">
    <el-menu mode='horizontal'>
      <el-menu-item @click="check(0)">域名</el-menu-item>
      <el-menu-item @click="check(1)">DDNS记录</el-menu-item>
      <el-menu-item @click="check(2)">账户信息维护</el-menu-item>
    </el-menu>
    <Domain v-if="checked[0]"></Domain>
    <DDnsRecord v-if="checked[1]"></DDnsRecord>
    <Account v-if="checked[2]"></Account>
  </div>
</template>

<script>
import Domain from './components/Domain'
import DDnsRecord from "@/components/DDnsRecord";
import Account from './components/Account'

export default {
  name: 'app',
  components: {
    Domain,DDnsRecord, Account
  },
  data(){
    return {
      checked:[true, false, false]
    }
  },
  methods:{
    check(i) {
      this.checked = [false, false, false]
      this.checked[i] = true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-menu{
  text-align: center;
}
.el-menu-item {
  float: none !important;
  display: inline-block;
}
</style>
