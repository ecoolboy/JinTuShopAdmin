<template>
    <div>
      <h1>login</h1>
      <el-button type="success" @click="login">Login</el-button>
    </div>
</template>

<script>
  export default {
    name: 'Login',
    methods:{
      login(){
        this.$router.push('/home')
      }
    }
  }
</script>

<style scoped>

</style>
