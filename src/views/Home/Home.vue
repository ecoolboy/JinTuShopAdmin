<template>
  <div class="home">
    <AsideNav/>
    <div class="content">
      <Header/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../../components/Header'
import AsideNav from '../../components/AsideNav'
export default {
  name: 'home',
    data(){
      return {

      }
    },
  components:{
    Header,AsideNav
  }
}
</script>
<style scoped>
  .home{
    display: flex;
    flex-direction: row;
    position: relative;
  }
  .content{
    width: 100%;
    background-color: #F0F2F5;
  }
</style>
