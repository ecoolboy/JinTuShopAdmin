<template>
    <div class="container">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search">
      </el-input>
      <el-button type="danger" icon="el-icon-delete" ></el-button>
      <el-button type="success" icon="el-icon-plus"></el-button>
    </div>
</template>

<script>
    export default {
        name: "searchBar"
    }
</script>

<style scoped>
  .container{
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
  }
  .container>*{
    margin-right: 20px;
  }
  .el-input{
    width: 200px;
  }
</style>
