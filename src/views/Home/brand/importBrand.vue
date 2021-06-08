<template>
  <div class="containerTable">
    <div class="upload">
      <input class="input-file" type="file" @change="exportData"
             ref="referenceUpload"
             accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
      <el-button  type="success" @click="btnClick">导入EXCEL</el-button>
      <el-tag
        v-show="tableData!==null"
        closable
        type="info"
        :disable-transitions="false"
        @close="deleteTable"
        style="margin-left: 20px">
        {{currentFileName}}
      </el-tag>
    </div>
  </div>
</template>

<script>
  import XLSX from 'xlsx'
    export default {
        name: 'importBrand',
        data(){
            return{
                currentFileName:'暂时没有选择',
                tableData:null,
                table:null,//保存的是xlsx生成的table对象
                keys:null,//保存表头
            }
        },
        methods:{
            btnClick () {
                document.querySelector('.input-file').click()
            },
            exportData(event){
                if (!event.currentTarget.files.length) {
                    return
                }
                this.currentFileName=event.target.files[0].name
                const that = this
                // 拿取文件对象
                var f = event.currentTarget.files[0]
                // 用FileReader来读取
                var reader = new FileReader()
                // 重写FileReader上的readAsBinaryString方法
                FileReader.prototype.readAsBinaryString = function (f) {
                    var binary = ''
                    var wb // 读取完成的数据
                    var outdata // 你需要的数据
                    var reader = new FileReader()
                    reader.onload = function (e) {
                        // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
                        var bytes = new Uint8Array(reader.result)
                        var length = bytes.byteLength
                        for (var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i])
                        }
                        // 接下来就是xlsx了，具体可看api
                        wb = XLSX.read(binary, {
                            type: 'binary'
                        })
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
                        // 自定义方法向父组件传递数据
                        that.tableData=outdata
                        console.log(that.tableData)
                        that.keys=Object.keys(that.tableData[0])
                        that.renderTable()
                    }
                    reader.readAsArrayBuffer(f)
                }
                reader.readAsBinaryString(f)
            },
            renderTable(){
                let tableNode = document.createElement('div')
                tableNode.setAttribute('id', 'excel')
                let container = document.querySelector('.containerTable')
                container.appendChild(tableNode)
                let tableWidth = container.clientWidth-60
                // let tableHeight = container.clientHeight - 60
                let table = jspreadsheet(document.getElementById('excel'), {
                    //表格的数据
                    data: this.tableData,
                    //使用拖角时的自动增量操作
                    autoIncrement: true,
                    //工具栏内容
                    toolbar: [
                        {
                            type: 'i',
                            content: '↩',
                            onclick: function () {
                                table.undo();
                            }
                        },
                        {
                            type: 'i',
                            content: '↪',
                            onclick: function () {
                                table.redo();
                            }
                        },
                        {
                            type: 'select',
                            k: 'font-size',
                            v: ['9px', '10px', '11px', '12px', '13px', '14px', '15px', '16px', '17px', '18px', '19px', '20px']
                        },
                        {
                            type: 'i',
                            content: '🌗',
                            k: 'text-align',
                            v: 'left'
                        },
                        {
                            type: 'i',
                            content: `🌕`,
                            k: 'text-align',
                            v: 'center'
                        },
                        {
                            type: 'i',
                            content: '🌓',
                            k: 'text-align',
                            v: 'right'
                        },
                        {
                            type: 'color',
                            content: '🌈',
                            k: 'color'
                        },
                        {
                            type: 'color',
                            content: '🔳',
                            k: 'background-color'
                        },
                    ],
                    // 下载表格时是否包含表头
                    includeHeadersOnDownload: true,
                    //默认每列宽度
                    defaultColWidth: 100,
                    tableOverflow: true,
                    tableWidth: `${tableWidth}px`,
                    // tableHeight: `${tableHeight}px`,
                })
                //进行表头设置
                for (let index in this.keys) {
                    table.setHeader(index, this.keys[index])
                }
                //保存生成的table对象
                this.table = table
            },
            deleteTable(){
                let table = document.querySelector('[tabindex="1"]')
                this.$refs.referenceUpload.value = null;
                table.remove()
                this.tableData=null
                // this.referenceUpload()
            },
            // referenceUpload(){
            //     this.$refs.referenceUpload.value = null;
            // }
        }
    }
</script>

<style scoped>
  .containerTable{
    display: flex;
    flex-direction: column;
  }
  .input-file {
    display: none;
  }
  .upload{
    display: flex;
    padding: 10px 20px;
    justify-content: flex-start;
    align-items: center;
  }
  #excel{
    padding: 10px 20px;
  }
</style>
