<template>
  <div class="login">
    <div class="login-center">
      <a-form
        class="login-form"
        :form="form"
        @submit="handleSubmit"
        :style="{ textAlign: 'center' }"
      >
        <p class="login_title">盈达邮件管理系统</p>

        <a-form-item
          :validate-status="userNameError() ? 'error' : ''"
          :help="userNameError() || ''"
        >
          <a-input
            v-decorator="[
              'login',
              {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              }
            ]"
            placeholder="请输入用户名"
          >
            <a-icon slot="suffix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item
          :validate-status="passwordError() ? 'error' : ''"
          :help="passwordError() || ''"
        >
          <a-input
            v-decorator="[
              'passwd',
              {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              }
            ]"
            type="password"
            placeholder="请输入密码"
          >
            <a-icon slot="suffix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :style="{ width: '100%' }"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { getMenusByUserId, login } from "@/api/system.js";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this),
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    if (this.$store.getters.token != "") {
      this.$router.push({ path: this.redirect || "/" });
    }
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      let _this = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$store
            .dispatch("Login", {
              login: values.login,
              passwd: this.$md5(values.passwd)
            })
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
            });
        } else {
        }
      });
    }
  }
};
</script>

<style>
.login {
  height: 100vh;
  background: url("../../assets/login/login-bg.jpg");
  background-size: cover;
  border-color: red;
}

.login-center {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -165px;
  margin-left: -300px;
  background: url("../../assets/login/login_bg1.png");
  background-size: cover;
  height: 330px;
  width: 600px;
  box-shadow: 5px 10px 15px 2px rgba(0, 0, 0, 0.4);
}

.login-form {
  margin-left: 370px;
  margin-right: 10px;
}

.ant-input-affix-wrapper .ant-input {
  border-radius: 0px;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  box-shadow: none;
}

.ant-input-affix-wrapper .ant-input:focus {
  border-radius: 0px;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  box-shadow: none;
}

.login_title {
  margin-top: 50px;
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 18px;
  font-family: "apple";
  letter-spacing: 4px;
}
</style>
