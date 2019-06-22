<template>
    <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">发布公告</span>
        </div> 
        <div class="contain-footer">
            <div class="contain-footer-top">
                    <div class="contain-footer-topl">                    
                      <el-button class="sys-Btn" @click="dialogPublish = true"  type="primary">发布公告</el-button>
                    </div>
                    <div class="contain-footer-topr">  
                      <el-input v-model="condition.keyword" class="searchTool">
                            <i
                             class="el-icon-search el-input__icon"
                             slot="suffix"
                             @click="handleSearchClick">
                            </i>
                      </el-input>                                          
                    </div> 
            </div> 
            <div class="contain-footer-bottom">
                                <el-table
                                  :data="noticeArr"
                                  size="medium"
                                  :fit="true"
                                  border
                                  style="width: 100%">
                                  <el-table-column
                                    align="center"
                                    prop="title"
                                    label="标题"
                                    min-width="180">
                                  </el-table-column>
                                  <el-table-column
                                    align="center"
                                    prop="platformName"
                                    label="发布平台"
                                     min-width="150">
                                  </el-table-column>
                                  <el-table-column
                                    align="center"
                                    prop="time"
                                    label="发布时间"
                                    min-width="180">
                                  </el-table-column>
                                  <el-table-column
                                    align="center"
                                    label="操作"
                                    min-width="120"
                                     >
                                      <template  slot-scope="scope">
                                        <el-button class="sys-text-Btn"  type="text" @click="handleNoticeDetail(scope.row.id)" size="small">详情</el-button>
                                        <el-button class="sys-text-Btn" type="text" @click="handleDelete(scope.row.id)" size="small">删除</el-button>
                                      </template>                                    
                                  </el-table-column>                                                                                                       
                                </el-table>                
            </div>                                      
        </div>
       <el-dialog class="dialog"
           title="发布公告"
           :visible.sync="dialogPublish"
           width="40%"
           
           >
             <el-form :model="publishForm" :rules="publishRules" ref="publishForm" label-width="8rem" size="medium" label-position="right" class="demo-ruleForm">
               <el-form-item label="标题：" id="title-input" prop="title">
                 <el-input v-model="publishForm.title"></el-input>
               </el-form-item>
               <el-form-item label="发布平台：" prop="platform">
                    <el-select v-model="publishForm.platform" placeholder="请选择平台">
                      <el-option label="全部" value="0"></el-option>
                      <el-option label="stark" value="1"></el-option>
                      <el-option label="承兑管理平台" value="2"></el-option>
                      <el-option label="商户管理平台" value="3"></el-option>
                      <el-option label="渠道商管理平台" value="4"></el-option>
                    </el-select> 
               </el-form-item>
                <el-form-item label="正文：" prop="content">
                 <el-input
                    type="textarea"
                    :rows="10"
                    v-model="publishForm.content">
                 </el-input>     
               </el-form-item>
               <el-form-item label="图片：" prop="content">
              <el-upload
                 class="upload-demo"
                 :action="`${common.basePath}/notice/uploadNoticeImage`"
                 name="image"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :file-list="fileList"
                 :on-success="fileUploadSuccess"
                 :on-error="errorUploadSuccess"
                 list-type="picture">
                <el-button size="small" class="sys-Btn" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>     
               </el-form-item>                 
             </el-form>
           <span slot="footer" class="dialog-footer">
             <el-button class="sys-Btn" type="primary" @click="handleConfirmPublish">确 定</el-button>               
             <el-button @click="dialogPublish = false">取 消</el-button>
           </span>
        </el-dialog> 

       <el-dialog class="dialog notice-dialog"
           title="公告详情"
           :visible.sync="dialogNoticeDetail"
           width="75%"
           >
           <div id="notice-wrap">
             <!-- 关于本月平台维护系统关闭的 -->
               <h2 id="notice-title">{{noticeDetail.title}}的通知</h2>
               <div id="notice-subTitle">
                   <span id="notice-platform">发布平台：{{noticeDetail.platformName}}</span>
                   <span id="notice-time">发布时间：{{noticeDetail.time}}</span>
               </div>
               <span id="notice-content">
                 {{noticeDetail.content}}
             <!-- 各位：<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由于平台服务器扩容和部分平台特色功能升级对接需要，10月28日（星期天）下午1点到29日（下周一）上午8点，“币速数字支付”平台将关闭，届时不能管理数据或查阅，请知悉并通知各承销商和商户。<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了清除系统运行中发生的故障和错误，软、硬件维护人员要对系统进行必要的修改与完善；为了使系统适应用户环境的变化，满足新提出的需要，也要对原系统做些局部的更新，这些工作称为系统维护。 系统维护的任务是改正软件系统在使用过程中发现的隐含错误，扩充在使用过程中用户提出的新的功能及性能要求，其目的是维护软件系统的"正常运作"    -->
               </span> 
          <div id="errorImg">
          </div>     
          <span slot="footer" class="dialog-footer ">
             <el-button class="sys-Btn" type="primary" @click="dialogNoticeDetail = false">确 定</el-button>               
          </span>
           </div>

        </el-dialog>                   
    </div>
</template>
<script>
import { async } from 'q';
export default {
    data() {
        return {
            dialogPublish: false,
            dialogNoticeDetail: false,
            condition: {
              keyword: ''
            },
            tableData: [{
               title: '关于本月维护的通知',
               platform: '币速数字支付',
               publishTime: '2018-10-26 09:20:30',
             }, {
               title: '关于本月维护的通知',
               platform: '币速数字支付',
               publishTime: '2018-10-26 09:20:30',
             }],
             noticeArr:[],
             publishForm: {
                 title: '',
                 platform: '',
                 content: '',
                 image: ''
             },
             noticeDetail: {},
             publishRules: {
              title: [
                  { required: true, message: '请输入标题', trigger: 'blur' },
              ],
              platform: [
                  { required: true, message: '请选择平台', trigger: 'blur' },
              ],   
              content:[
                  { required: true, message: '请输入正文', trigger: 'blur' },                  
              ],                          
             },
             fileList: []                           
        }
    },
    methods: {
        async handleSearchClick(){
          await this._getNoticeList(this.condition)
        },
        handlePreview(file){

        },
        handleRemove(file, fileList){

        },
        async handleNoticeDetail(id){
            let _id = id
            this.dialogNoticeDetail = true
            let resData = await this.http.get('/notice/noticeDetail', {id: _id})
            this.noticeDetail = resData
        },
        /*
        *获取公告列表
        */
       async _getNoticeList(condition){
         let resData = await this.http.get('/notice/noticeLists', condition)
         if(resData.code === 200){
           this.noticeArr = resData.data.data
         }
          
       },
        /*
        *确认发布公告
        */
        async handleConfirmPublish(){
          let data = {
            title: this.publishForm.title,
            noticePlatform: this.publishForm.platform,
            content: this.publishForm.content,
            image:  this.publishForm.image
          }
          let resData = await this.http.post('/notice/addNotice', data)
          if(resData.code === 200)
          {
            this.$message.success(resData.msg)
          }
        },
        /*
        *删除公告
        */
       handleDelete(id) {
         let _id = id
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let resData =  await this.http.get('/notice/deleteNotice', {id: _id})
          if(resData.code === 200){
            await this._getNoticeList(this.condition)
            this.$message.success(resData.msg)
          }
        }).catch(() => {          
        });
       },
        /*
        *文件上传成功
        */
        fileUploadSuccess(response,file,fileList){
          if(response.code === 200){
             this.$message.success(response.msg)
             this.publishForm.image = response.data.path
             console.log(this.publishForm.image)
          }
        },
        errorUploadSuccess(err,file,fileList) {
          console.log(err)
        }

    },
    async mounted() {
      await this._getNoticeList(this.condition)
    },
    
}
</script>
<style lang="less" scoped>
.contain-footer-topr{
    .searchTool{
        margin-right: 0;
    }
}
#title-input{
    width: 45%;
}
#notice-wrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    #notice-subTitle{
        display: flex;
        justify-content: space-between;
        width: 26vw;
        font-size: .875rem;
        color: #B3B3B3;
    }
    #notice-content{
        margin-top: 43px;
        letter-spacing: 3px;
        line-height:30px;
        font-size: 1rem;
        color: #333333;
    }
    #errorImg{
      width: 20vw;
      height: 20vw;
      background: url(../../assets/imgs/main/xitongweihu.png) no-repeat;
      background-size: 100% 100%;
    }
    .dialog-footer{
      margin-bottom: 20px;
    }
}


</style>