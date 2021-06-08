<template>
  <div class="container">
    <div class="searchBar">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchText" @change="searchBrand">
      </el-input>
      <el-button type="danger" icon="el-icon-delete" @click="deleteBrands">批量删除</el-button>
      <el-button type="success" icon="el-icon-plus" @click="isShowAdd=!isShowAdd">添加品牌</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="ID"
        width="120">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="logo"
        label="Logo"
        width="120">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.logo"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="品牌名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="productCount"
        label="产品数量"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="primary" @click="updateBrandInformation(scope.row)">更新</el-button>
          <el-button type="danger" @click="deleteBrand(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;display: flex;justify-content:flex-start;align-items: center">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[6,12,18]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="brandsNum"
        style="margin-left: 10px">
      </el-pagination>
    </div>
    <el-dialog
      title="更新品牌"
      :visible.sync="isShowUpdate"
      width="30%">
      <el-input v-model="updateBrandData.name" ></el-input>
      <el-input v-model="updateBrandData.logo"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateBrand(updateBrandData.id)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加品牌"
      :visible.sync="isShowAdd"
      width="30%">
      <el-form :model="addBrandData" status-icon :rules="addRules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="品牌名称" prop="name">
          <el-input type="text" v-model="addBrandData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo" prop="logo">
          <el-input type="text" v-model="addBrandData.logo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌大图" prop="bigPic">
          <el-input type="text" v-model="addBrandData.bigPic"></el-input>
        </el-form-item>
        <el-form-item label="品牌历史" prop="brandStory">
          <el-input type="textarea" v-model="addBrandData.brandStory"></el-input>
        </el-form-item>
        <el-form-item>
<!--          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>-->
<!--          <el-button @click="resetForm('ruleForm')">重置</el-button>-->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAdd = false">取 消</el-button>
        <el-button @click="resetAddForm('ruleForm')">重置</el-button>
        <el-button id="addBrand" type="primary" @keyup.enter="addBrand('ruleForm')" @click="addBrand('ruleForm')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {getBrand,deleteBrand,updateBrand,addBrand,deleteBrands} from "../../../../util/api";
    export default {
        name: 'brandAll',
        inject:['reload'],
        data() {
            let validateName=(rule,value,callback)=>{
                if(!value){
                    return callback(new Error('logo名不能为空'))
                }else {
                    callback()
                }
            }
            let validateLogo=(rule,value,callback)=>{
                if(!value){
                    return callback(new Error('logo路径不能为空'))
                }else {
                    callback()
                }
            }
            return {
                tableData:null,
                multipleSelection: [],
                currentPage:null,
                pageSize:null,
                brandsNum:null,
                isShowUpdate:false,
                isShowAdd:false,
                updateBrandData:{
                    logo:'',
                    name:'',
                    id:null,
                },
                addBrandData:{
                    logo:'',
                    name:'',
                    bigPic:'',
                    brandStory:''
                },
                addRules:{
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    logo: [
                        { validator: validateLogo, trigger: 'blur' }
                    ],
                },
                searchText:''
            }
        },
        created(){
            this.keyupEnter()
        },
        mounted() {
            getBrand().then(res=>{
                console.log(res)
                this.pageSize=res.data.data.pageSize
                this.currentPage=res.data.data.pageNum
                this.brandsNum=res.data.data.total
                this.tableData=res.data.data.list
            }).catch(err=>{
                console.log(err)
            })
        },
        methods: {
            //回车添加品牌事件
            keyupEnter(){
                document.onkeydown = e =>{
                    let body = document.getElementById('addBrand')
                    if (e.keyCode === 13) {
                        console.log('enter')
                        this.addBrand('ruleForm')
                    }
                }
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                let ids=[]
                val.forEach(item=>{
                    ids.push(item.id)
                })
                this.multipleSelection=ids
            },
            handleCurrentChange(cpage){
                getBrand(cpage).then(res=>{
                    this.pageSize=res.data.data.pageSize
                    this.currentPage=res.data.data.pageNum
                    this.brandsNum=res.data.data.total
                    this.tableData=res.data.data.list
                }).catch(err=>{
                    console.log(err)
                })

            },
            //这是更新品牌信息前面的回显设置
            updateBrandInformation(row){
                this.updateBrandData.name=row.name
                this.updateBrandData.id=row.id
                this.updateBrandData.logo=row.logo
                this.isShowUpdate=!this.isShowUpdate
            },
            //提交更新
            updateBrand() {
                let param={
                    name:this.updateBrandData.name,
                    id:this.updateBrandData.id,
                    logo:this.updateBrandData.logo
                }
                updateBrand(param).then(res=>{
                    this.$notify({
                        title: '更新成功',
                        type: 'success'
                    });
                    this.reload()
                }).catch(err=>{
                    console.log(err)
                })
                this.isShowUpdate=!this.isShowUpdate
            },
            //删除品牌
            deleteBrand(row){
                deleteBrand(row.id).then(res=>{
                    this.$notify({
                        title: '删除成功',
                        type: 'success'
                    });
                    // this.tableData=this.tableData.filter(item=>item.id!==row.id)
                    this.reload()
                }).catch(err=>{
                    console.log(err)
                })
            },
            //批量删除品牌
            deleteBrands(){
                console.log(this.multipleSelection)
                deleteBrands(this.multipleSelection).then(res=>{
                    this.reload()
                    this.$notify({
                        title: '删除成功',
                        type: 'success'
                    });
                }).catch(err=>{
                    console.log(err)
                })
            },
            //添加品牌
            addBrand(formName){
                this.$refs[formName].validate(valid=>{
                    if(valid){
                        addBrand(this.addBrandData).then(res=>{
                            console.log(res)
                            this.$notify({
                                title: '添加成功',
                                type: 'success'
                            });
                            this.isShowAdd=!this.isShowAdd
                            this.reload()
                        }).catch(err=>{
                            console.log(err)
                            this.$notify.error({
                                title: '提交错误1',
                                message:err
                            });
                        })
                    }else{
                        this.$notify.error({
                            title: '提交错误2',
                        });
                        return false;
                    }
                })
            },
            //重置添加brand表单
            resetAddForm(formName){
                this.$refs[formName].resetFields();
            },
            searchBrand(){
                console.log(this.searchText)
            }
        }
    }
</script>

<style scoped>
  .container{
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    /*justify-content: flex-start;*/
    /*align-items: center;*/
    width: 100%;
    box-sizing: border-box;
  }
  .searchBar{
    display: flex;
    flex-direction: row;
    padding: 10px 0;
  }
  .searchBar> .el-input{
    width: 200px;
    margin-right: 10px;
  }
  .el-dialog__body>*,.el-dialog__body>.el-form>*{
    margin-top: 10px;
  }
</style>
