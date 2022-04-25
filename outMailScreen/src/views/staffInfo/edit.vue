<template>

  <a-drawer placement="right" :closable="true" @close="onClose" :visible="showVisible" width="700px">
		<span slot="title">
			<a-icon :type="iconType"/>&nbsp; {{ dialogTypeMap[dialogType] }}

		</span>

    <a-form class="ant-advanced-search-form" style="border:none;" :form="form">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="员工编号" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
            <a-input placeholder="请输入员工编号" :disabled="disabled1" v-decorator="['id',rule.id]"/>
          </a-form-item>
        </a-col>


        <a-col :span="24">
          <a-form-item label="员工姓名" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
            <a-input placeholder="请输入员工姓名" :disabled="disabled" v-decorator="['name',rule.name]"/>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="出生日期" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
            <a-date-picker placeholder="请输入出生日期" style="width:100%" :disabled="disabled"

                           format="yyyy-MM-DD"
                           valueFormat="yyyy-MM-DD"

                           v-decorator="['birth',rule.birth]"/>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="入职日期" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
            <a-date-picker placeholder="请输入入职日期" style="width:100%" :disabled="disabled"
                           format="yyyy-MM-DD"
                           valueFormat="yyyy-MM-DD"
                           v-decorator="['entry',rule.entry]"/>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="员工描述" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
            <a-input placeholder="请输入员工描述" :disabled="disabled" v-decorator="['desx',rule.desx]"/>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="Email" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
            <a-input placeholder="请输入员工邮箱" :disabled="disabled" v-decorator="['eMail',rule.eMail]"/>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="在职状态" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
            <template>
              <a-radio-group name='status' :disabled="disabled" v-decorator="['status',rule.status]">
                <a-radio value="0">离职</a-radio>
                <a-radio value="1">在职</a-radio>
              </a-radio-group>
            </template>
          </a-form-item>
        </a-col>

      </a-row>
    </a-form>
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
  addStaffInfo,
  updateStaffInfo
} from '@/api/staffInfo.js';

export default {
  data() {
    return {
      disabled: '',
      disabled1: '',
      showVisible: false,
      form: this.$form.createForm(this),
      hackRest: false,
      dialogType: '',
      dialogTypeMap: {
        show: '员工详情',
        create: '员工新增',
        update: '员工修改'
      },
      SubmitTypeMap: {
        show: '关闭',
        create: '确认新增',
        update: '确认修改',
      },
      showCanel: true,
      rule: {
        id: {
          rules: [{
            required: true,
            message: '请输入员工编号'
          }],
          initialValue: ''
        },
        name: {
          rules: [{
            required: true,
            message: '请输入员工名称'
          }],
          initialValue: ''
        },
        birth: {
          rules: [{
            required: true,
            message: '请输入员工出生日期'
          }],
          initialValue: ''
        },
        eMail: {
          rules: [{
            required: true,
            message: '请输入员工邮箱'
          }],
          initialValue: ''
        },
        entry: {
          rules: [{
            required: true,
            message: '请输入员工入职日期'
          }],
          initialValue: ''
        },
        desx: {
          rules: [{
            required: false,
            message: '请输入员工描述'
          }],
          initialValue: ''
        },

        status: {
          rules: [{
            required: true,
            message: '请选择在职状态'
          }],
          initialValue: '1'
        },
      }
    }
  },
  methods: {
    //查看
    ShowDialog(query) {
      this.disabled = true
      this.disabled1 = true
      this.showCanel = false
      this.showVisible = true
      this.iconType = "copy";
      this.dialogType = 'show'
      this.timeTask = query
      this.$nextTick(() => {
        this.hackRest = true;
        this.form.setFieldsValue(query)
      });
    },

    //新增
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
      if (this.dialogType == 'show') {
        this.showVisible = false
      }
      if (this.dialogType == 'create') {
        this.create();
      }
      if (this.dialogType == 'update') {
        this.update();
      }
    },
    //新增
    create() {
      this.form.validateFields((err, values) => {
        if (!err) {
          addStaffInfo(values).then(res => {
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
    //修改
    update() {
      this.form.validateFields((err, values) => {
        if (!err) {
          updateStaffInfo(values).then(res => {
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
  }
}
</script>
