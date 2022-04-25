<template>

  <a-drawer placement="right" :closable="true" @close="onClose" :visible="showVisible" width="700px">
		<span slot="title">
			<a-icon :type="iconType"/>&nbsp; {{ dialogTypeMap[dialogType] }}

		</span>

    <a-form class="ant-advanced-search-form" style="border:none;" :form="form">

      <a-row :gutter="24">


        <a-col :span="12">
          <a-form-item label="id" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" >
            <a-input placeholder="id" :disabled="disabled1" v-decorator="['id',rule.id]"/>
          </a-form-item>
        </a-col>



        <a-col :span="12">
          <a-form-item label="邮件类型" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select
                default-value="邮件类型"
                style="width: 100%"
                placeholder="请输入邮件类型"
                :disabled="disabled1"
                @change="handleChange"
                v-decorator="['mailType',rule.mailType]">
              <a-select-option value="0">生日祝福</a-select-option>
              <a-select-option value="1">感谢信</a-select-option>

            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="主题类型" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select
                default-value="标题"
                style="width: 100%"
                placeholder="请输入主题类型"
                :disabled="disabled1"
                @change="handleChange"
                v-decorator="['setType',rule.setType]">
              <a-select-option value="0">标题</a-select-option>
              <a-select-option value="1"> 正文</a-select-option>
              <a-select-option value="2"> 落款</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="字体种类" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" >
            <a-input placeholder="请输入字体种类" :disabled="disabled" v-decorator="['fontFamily',rule.fontFamily]"/>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="字体大小" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input-number
                placeholder="请输入字体大小"
                :disabled="disabled"
                autocomplete="off"
                style="width: 100%"
                v-decorator="['fontSize',rule.fontSize]"/>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="字体样式" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select default-value="粗体"
                      style="width: 100%"
                      :disabled="disabled"
                      v-decorator="['fontStyle',rule.fontStyle]"
                      @change="handleChange">
              <a-select-option value="0">正常</a-select-option>
              <a-select-option value="1">粗体</a-select-option>
              <a-select-option value="2">斜体</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>


        <a-col :span="12">
          <a-form-item label="左边距" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="请输入左边距"
                            :disabled="disabled"
                            autocomplete="off"
                            style="width: 100%"
                            v-decorator="['xCoord',rule.xCoord]"/>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="上边距" :label-col="{ span: 8}" :wrapper-col="{ span: 16 }">
            <a-input placeholder="请输入上边距"

                            :disabled="disabled"
                            autocomplete="off"
                            style="width: 100%"
                            v-decorator="['yCoord',rule.yCoord]"/>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="行间距" :label-col="{ span: 8 }" :wrapper-col="{ span: 16}">
            <a-input placeholder="请输入行间距"
                            :disabled="disabled"
                            autocomplete="off"
                            style="width: 100%"
                            v-decorator="['lineSpace',rule.lineSpace]"/>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="行   宽" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" style="width: 100%">
            <a-input placeholder="请输入行宽"
                            :disabled="disabled"
                            style="width: 100%"
                            v-decorator="['lineWidth',rule.lineWidth]"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="颜色" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input type="color" placeholder="请选择颜色" :disabled="disabled"  v-decorator="['fontColor',rule.fontColor]"/>
            <a-input placeholder="请选择颜色" :disabled="disabled" v-decorator="['fontColor',rule.fontColor]"/>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="模板" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-input placeholder="请输入模板" type="textarea" :auto-size="{ minRows: 5}"  :disabled="disabled" v-decorator="['template',rule.template]"/>
          </a-form-item>
        </a-col>




      </a-row>


    </a-form>


    <div class="clearfix">

      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
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

  updateTextStyleInfo

} from '@/api/textStyleInfo.js';

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
      rule: {},
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
        update() {
          this.form.validateFields((err, values) => {
            if (!err) {
              updateTextStyleInfo(values).then(res => {
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
        },

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
