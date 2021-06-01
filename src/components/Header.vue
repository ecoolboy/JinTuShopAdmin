<template>
  <div class="header">
    <div class="left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="user">
      <div>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          搁浅<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu  slot="dropdown">
          <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="updateInformation">个人信息</el-dropdown-item>
          <el-dropdown-item command="exit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input placeholder="旧密码" v-model="updatePassword.oldPassword" show-password></el-input>
      <el-input style="margin-top: 20px" placeholder="新密码" v-model="updatePassword.newPassword" show-password></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data(){
      return{
        levelList:[],
        dialogVisible:false,
        updatePassword:{
          oldPassword:null,
          newPassword:null
        },
          test:null,
      }
    },
    watch:{
      $route(){
       this.getBreadcrumb()
      }
    },
    created(){
      this.getBreadcrumb()
    },
    methods:{
      getBreadcrumb(){
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0];
        let str=''
        if(first.path.indexOf('user')!==-1){
          str={meta:{title:'用户信息'}}
        }else if(first.path.indexOf('Goods')!==-1){
          str={meta:{title:'商品信息'}}
        }else if(first.path.indexOf('Brand')!==-1){
          str={meta:{title:'品牌信息'}}
        }
        let res=[]
        if (first && first.name.trim().toLocaleLowerCase() !== 'Home'.toLocaleLowerCase()) {
          res.push({ path: '/home', meta: { title: '首页' }})
          res.push(str)
          res.push(first)
        }
        this.levelList = res
      },
      handleClose(done) {
        this.$confirm('确认取消修改密码？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleCommand(command){
        if(command==='updatePassword'){
          this.dialogVisible=true
        }else if(command==='updateInformation'){

        }else {
          this.$router.replace('/')
        }
      }
    }
  }
</script>

<style scoped>

  .header {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    background-color: #1F293D;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    color: #B1B4BB;
  }
  .left{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .el-breadcrumb{
    transform: translateY(10px);
  }
  .user{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .user>*{
    margin-right: 10px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #B1B4BB;
  }
  .el-dropdown-menu{
    background-color: #1F293D;
  }
  .el-dropdown-menu__item{
    font-size: 16px;
  }
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
   background-color: #1F293D;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-breadcrumb  /deep/  .el-breadcrumb__inner {
    color: #ccc !important;
  }

</style>
