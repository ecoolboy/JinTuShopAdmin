<template>
    <div>
      <div class="show">
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
        <el-card class="box-card">
          <div v-for="o in 3" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'HomeShow'
  }
</script>

<style scoped>
  .show{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20px;
    flex-wrap: wrap;
  }
  .box-card{
    min-width: 300px;
    margin-top: 10px;
  }
</style>
