<template>

  <a-drawer placement="right" :closable="true" @close="onClose" :visible="showVisible" width="700px">
		<span slot="title">
			<a-icon :type="iconType"/>&nbsp; {{ dialogTypeMap[dialogType] }}

		</span>

    <a-form class="ant-advanced-search-form" style="border:none;" :form="form">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="流水号" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-input placeholder="请输入流水号" :disabled="disabled1" v-decorator="['id',rule.id]"/>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="员工编号" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-input placeholder="请输入员工编号" :disabled="disabled" v-decorator="['empId',rule.empId]"/>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="员工姓名" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-input  placeholder="请输入员工姓名" :disabled="disabled" v-decorator="['empName',rule.empName]"/>
          </a-form-item>
        </a-col>


        <a-col :span="24">
          <a-form-item label="发送时间" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-date-picker
                placeholder="请输入发送时间"
                style="width:100%"
                :disabled="disabled"
                v-decorator="['sendDate',rule.sendDate]"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="员工邮箱" :label-col="{ span: 4}" :wrapper-col="{ span: 20 }">
            <a-input placeholder="请输入员工邮箱" :disabled="disabled"
                     v-decorator="['empEmail',rule.empEmail]"/>
          </a-form-item>
        </a-col>
        <!--        <a-col :span="24">
                  <a-form-item label="模板内容" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                    <a-input type="textarea"  placeholder="请输入模板内容" :disabled="disabled" v-decorator="['modelContent',rule.modelContent]"/>
                  </a-form-item>
                </a-col>-->

        <a-col :span="24">
          <a-form-item label="发送状态" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <template>
              <a-radio-group name='status' :disabled="disabled" v-decorator="['status',rule.status]">
                <a-radio value="0">发送失败</a-radio>
                <a-radio value="1">发送成功</a-radio>
              </a-radio-group>
            </template>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="邮件内容" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <template>
              <a-upload
                  list-type="picture-card"
                  :file-list="fileList"
                  :showUploadList=showUploadList
                  @preview="handlePreview"
                  :customRequest="downloadFilesCustomRequest">
                <div v-if="showUpload">
                  <a-icon type="plus"/>
                  <div class="ant-upload-text">
                    上传背景图片
                  </div>
                </div>
              </a-upload>
            </template>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="邮件类型" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <template>
              <a-radio-group name='status' :disabled="disabled" v-decorator="['mailType',rule.mailType]">
                <a-radio value="0">生日祝福</a-radio>
                <a-radio value="1">感谢信</a-radio>
              </a-radio-group>
            </template>
          </a-form-item>
        </a-col>
      </a-row>


    </a-form>


    <div class="clearfix">

      <a-modal width="800px"  :visible="previewVisible" :footer="null" @cancel="handleCancel" >
        <img alt="example" style="width: 100%" :src="previewImage"/>
      </a-modal>
    </div>


    <div :style="{
                 position: 'absolute',
                 left: 0,
                 bottom: 0,
                 width: '100%',
                 borderTop: '1px solid #e9e9e9',
                 padding: '10px 16px',
                 background: '#fff',
                 textAlign: 'right',
               }">
      <a-button :style="{marginRight: '8px'}" @click="onClose" v-if="showCanel"> 取消</a-button>
      <a-button @click="onSubmit" type="primary">{{ SubmitTypeMap[dialogType] }}</a-button>
    </div>

  </a-drawer>

</template>

<script>
import {
  getImgById
} from '@/api/mailLogInfo.js';

import moment from 'moment'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default {
  data() {
    return {
      showUploadList: {
        showRemoveIcon: false
      },
      showUpload: false,

      disabled: '',
      disabled1: '',
      showVisible: false,
      form: this.$form.createForm(this),
      hackRest: false,
      dialogType: '',
      dialogTypeMap: {
        show: '邮件详情',
        create: '邮件新增',
        update: '邮件修改',
        updateImg: '修改背景图片'
      },
      SubmitTypeMap: {
        show: '关闭',
        create: '确认新增',
        update: '确认修改',
        updateImg: '关闭'
      },
      showCanel: true,
      rule: {
      },
      previewVisible: false,
      previewImage: '',
      fileList: [],
    }
  },
  methods: {
    moment,
    //查看
    ShowDialog(query) {
      this.disabled = true
      this.disabled1 = true
      this.showUpload = false
      this.showCanel = false
      this.showVisible = true
      this.iconType = "copy";
      this.dialogType = 'show'
      this.timeTask = query
      this.$nextTick(() => {
        this.hackRest = true;
        this.form.setFieldsValue(query);
        this.fileFormatter();
      });
    },

    UpdateImgDialog(query) {
      this.disabled = true
      this.disabled1 = true
      this.showUpload = true
      this.showCanel = false
      this.showVisible = true
      this.iconType = "copy";
      this.dialogType = 'updateImg'
      this.timeTask = query
      this.$nextTick(() => {
        this.hackRest = true;
        this.form.setFieldsValue(query);
        this.fileFormatter();
      });
    },

    //
    CreateDialog() {
      this.iconType = "form";
      this.showCanel = true
      this.disabled = false
      this.disabled1 = false
      this.showVisible = true
      this.dialogType = 'create'
      this.form.resetFields(); //清除缓存数据
    },
    //修改
    UpdateDialog(query) {
      this.iconType = "form";
      this.showCanel = true
      this.disabled = false
      this.disabled1 = true
      this.showUpload = false
      this.showVisible = true
      this.dialogType = 'update'
      this.timeTask = query
      this.$nextTick(() => {
        this.hackRest = true;
        this.form.setFieldsValue(query)
      });

    },
    //关闭
    onClose() {
      this.showVisible = false;
      this.form.resetFields();
    },
    //提交按钮
    onSubmit() {
      if (this.dialogType == 'show' || this.dialogType == 'updateImg') {
        this.showVisible = false
      }
      if (this.dialogType == 'create') {
        this.create();
      }
      if (this.dialogType == 'update') {
        this.update();
      }
    },

    //修改
    /*    update() {
          this.form.validateFields((err, values) => {
            if (!err) {
              updateMailCfgInfo(values).then(res => {
                //console.log(res)
                if (res.data.code == '0000') {
                  this.$message.success(res.data.message)
                  this.$emit('fresh')
                } else {
                  this.$message.error(res.data.message)
                }
              })
              this.showVisible = false
            }
          });
        },*/

    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({fileList}) {
      this.fileList = fileList;
    },

    downloadFilesCustomRequest(data) {
      const formData = new FormData()
      formData.append('file', data.file);
      formData.append('id', this.form.getFieldValue("id"));

      /*    updateMailCfgImg(formData).then(res => {
            if (res.data.code == '0000') {
              this.$message.success(res.data.message)
              this.fileFormatter()
            } else {
              this.$message.error(res.data.message)
            }



          })*/
      return;
    },

    fileFormatter() {
      //下载文件
      getImgById({id: this.form.getFieldValue("id")}).then(res => {
        let file = {
          uid: '1',    // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
          name: '背景图片',   // 文件名
          status: 'done', // 状态有：uploading done error removed
        }
        const blob = new Blob([res.data]);
        var href = window.URL.createObjectURL(blob);
        file.url = href;
        this.fileList = [];
        this.fileList.push(file);
      })
    },

  }
}
</script>
