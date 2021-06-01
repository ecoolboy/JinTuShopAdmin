<template>
  <div class="aside">
    <el-menu router collapse-transition background-color="#304156" active-text-color="#0652DD" text-color="#B1B4BB"
             default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse">
      <div class="logo">
        <i class="el-icon-apple"></i>
        <span v-show="!isCollapse"> JinTu-Admin</span>
      </div>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">用户信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="userAll">用户管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="userOrders">订单信息</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="userHistory">历史订单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-shop"></i>
          <span slot="title">商品信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="GoodsAll">商品管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="importGoods">导入商品</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-info"></i>
          <span slot="title">品牌信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="BrandAll">品牌管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="importBrand">导入品牌</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <div class="toggle">
      <i v-if="isCollapse" @click="isCollapse=!isCollapse" class="el-icon-s-unfold"></i>
      <i v-else @click="isCollapse=!isCollapse" class="el-icon-s-fold"></i>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'AsideNav',
        data() {
            return {
                isCollapse: true,
                test:null,
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
  .aside {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #304156;
    color: #B1B4BB;
  }

  .logo {
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: #304156;
    font-size: 20px;
    border-bottom: 1px solid #B1B4BB;
  }

  .el-menu {
    /*background-color: #304156;*/
    cursor: pointer;
    overflow: hidden;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }

  .toggle {
    border-top: 1px solid #B1B4BB;
    background-color: #304156;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
    box-sizing: border-box;
  }

  .el-menu-item-group {
    background-color: #304156;
  }
</style>
