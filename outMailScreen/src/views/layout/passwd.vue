<template>
  <a-modal v-model="visible" onOk="handleOk">
    <span slot="title">
      <a-icon type="edit" />&nbsp;
      {{ title }}
    </span>
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item
            label="原密码"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-input
              placeholder="请输入原密码"
              :disabled="disabled"
              v-decorator="['oldpasswd', rule.oldpasswd]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="新密码"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-input
              placeholder="请输入新密码"
              :disabled="disabled"
              v-decorator="['newpasswd', rule.newpasswd]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="确认密码"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-input
              placeholder="请输入确认密码"
              :disabled="disabled"
              v-decorator="['newpasswd1', rule.newpasswd1]"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <template slot="footer">
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
      >
        确认
      </a-button>
    </template>
  </a-modal>
</template>
<script>
import { updatePasswd } from "@/api/system.js";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      loading: false,
      disabled: false,
      visible: false,
      title: "密码修改",
      rule: {
        oldpasswd: {
          rules: [{ required: true, message: "请输入原密码" }],
          initialValue: ""
        },
        newpasswd: {
          rules: [{ required: true, message: "请输入新密码" }],
          initialValue: ""
        },
        newpasswd1: {
          rules: [{ required: true, message: "请输入确认密码" }],
          initialValue: ""
        }
      }
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          updatePasswd({
            oldpasswd: values.oldpasswd,
            newpasswd: this.$md5(values.newpasswd)
          }).then(response => {
            if (response.data.code == "0000") {
              this.$message.success("密码修改成功！");
              this.$store.dispatch("LogOut").then(() => {
                this.$router.push({ path: "/login" });
              });
              this.visible = false;
            } else {
              this.$message.success("密码修改失败！");
            }
          });
        }
      });
    },
    handleCancel(e) {
      this.visible = false;
    }
  }
};
</script>
