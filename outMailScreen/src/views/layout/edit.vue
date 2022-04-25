<template>
  <a-drawer
    :title="dialogTypeMap[dialogType]"
    placement="right"
    :closable="true"
    @close="onClose"
    :visible="showVisible"
    width="700px"
  >
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item
            label="登录名"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-input
              placeholder="请输入登录名"
              :disabled="disabled"
              v-decorator="['login', rule.login]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="姓名"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-input
              placeholder="请输入姓名"
              :disabled="disabled"
              v-decorator="['name', rule.name]"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item
            label="状态"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-radio-group
              :disabled="disabled"
              v-decorator="['isValid', rule.isValid]"
            >
              <a-radio value="0">启用</a-radio>
              <a-radio value="1">禁用</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="modeButton">
      <a-button :style="{ marginRight: '8px' }" @click="onClose">
        取消
      </a-button>
      <a-button @click="onSubmit" type="primary">{{
        SubmitTypeMap[dialogType]
      }}</a-button>
    </div>
  </a-drawer>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      dialogTypeMap: {
        show: "用户详情",
        create: "用户新增",
        update: "用户修改"
      },
      hackRest: false,
      SubmitTypeMap: {
        show: "确认",
        create: "提交",
        update: "提交"
      },
      showVisible: false,
      rule: {
        login: {
          rules: [{ required: true, message: "请输入用户名" }],
          initialValue: ""
        },
        name: {
          rules: [{ required: true, message: "请输入姓名" }],
          initialValue: ""
        },
        isValid: {
          rules: [{ required: true, message: "请选择状态" }],
          initialValue: "1"
        }
      }
    };
  },
  props: {
    showVisible: Boolean
  },

  methods: {
    //查看
    ShowDialog(query) {
      this.disabled = true;
      this.showVisible = true;
      this.dialogType = "show";
      this.$nextTick(() => {
        this.form.setFieldsValue(query);
      });
    },

    //新增
    CreateDialog() {
      this.disabled = false;
      this.showVisible = true;
      this.dialogType = "create";
    },
    //修改
    UpdateDialog(query) {
      this.disabled = false;
      this.showVisible = true;
      this.dialogType = "update";
      this.$nextTick(() => {
        this.hackRest = true;
        this.form.setFieldsValue(query);
      });
    },
    //关闭
    onClose() {
      this.showVisible = false;
      this.form.resetFields();
    },
    //提交按钮
    onSubmit() {
      if (this.dialogType == "show") {
        this.showVisible = false;
      }
      if (this.dialogType == "create") {
        this.create();
      }
      if (this.dialogType == "update") {
        this.update();
      }
    },
    create() {
      this.form.validateFields((err, values) => {
        if (err) {
          this.$message.error("新增失败！");
        } else {
          // var listArry=this.form.getFieldsValue()
          //console.log(listArry)
          addJob(values).then(res => {
            if (res.status == 200) {
              this.$message.success("新增成功！");
              this.$emit("fresh");
            } else {
              this.$message.error("新增失败！");
            }
          });
          this.showVisible = false;
        }
      });
    },
    update() {
      this.form.validateFields((err, values) => {
        console.info(values);
        //  var listArry=this.form.getFieldsValue()
        updateJob(values).then(res => {
          if (res.status == 200) {
            this.$message.success("修改成功！");
            this.$emit("fresh");
            this.showVisible = false;
          } else {
            this.$message.error("修改失败！");
            this.showVisible = false;
          }
        });
      });
      //end update
    }
  }
};
</script>
