<template>
  <a-config-provider :locale="zh_CN">
    <a-layout id="layout">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="220"
        :style="{ boxShadow: '3px 0px 5px  #ddd' }"
      >
        <div :class="theme">
          <div :class="collapsed ? 'logo1' : 'logo'">
            <div class="overhidden">
              <div class="logoimg">
                <img src="@/assets/logo.png" />
              </div>

              <span class="title">&nbsp;&nbsp;盈达邮件管理系统</span>
            </div>
          </div>
          <a-divider :style="{ margin: '0px 0px' }" />
          <mymenu :theme="theme" :collapsed="collapsed" />
        </div>
      </a-layout-sider>

      <a-layout id="layoutRight">
        <a-layout-header id="layoutHeader">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />

          <div :style="{ float: 'left' }">
            <a-breadcrumb :style="{ lineHeight: '64px' }">
              <span slot="separator" id="brseparator">/</span>
              <a-breadcrumb-item v-for="(item, i) in levelList">
                <span v-if="i === levelList.length - 1">
                  <a-icon :type="item.meta.icon" /> {{ item.meta.title }}
                </span>
                <router-link v-else :to="item.path">
                  <a-icon :type="item.meta.icon" /> {{ item.meta.title }}
                </router-link>
              </a-breadcrumb-item>
            </a-breadcrumb>
          </div>

          <span style="float:right;padding-right:10px;">
            <a-dropdown>
              <a-icon
                class="trigger1"
                :type="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"
              />
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript::" @click="screenfull">{{
                    isFullscreen ? "退出全屏" : "页面全屏"
                  }}</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>

            <a-dropdown>
              <a-icon class="trigger1" type="user" />
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript::" @click="logOut">退出登录</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript::" @click="passwd">修改密码</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>

            <a-dropdown>
              <a-icon class="trigger1" type="skin" />
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript::" @click="changeSkin('#992777')">洋红</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript::" @click="changeSkin('#F5222D')">薄暮</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript::" @click="changeSkin('#52C41A')"
                    >极光绿</a
                  >
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript::" @click="changeSkin('#FA541C')">火山</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript::" @click="changeSkin('#FAAD14')">日暮</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript::" @click="changeSkin('#13C2C2')">明青</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript::" @click="changeSkin('#1890FF')"
                    >拂晓蓝</a
                  >
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript::" @click="changeSkin('#2F54EB')"
                    >极客蓝</a
                  >
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript::" @click="changeSkin('#722ED1')">酱紫</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </a-layout-header>
        <a-layout-content>
          <tabs />
          <div id="content">
            <div id="contentmain">
              <router-view />
            </div>
          </div>
        </a-layout-content>
        <a-layout-footer id="foot">
          江苏盈达信息技术有限公司&copy;2021-
        </a-layout-footer>
      </a-layout>
      <div>
        <a-back-top :visibilityHeight="visibilityHeight">
          <div class="ant-back-top-inner">回顶部</div>
        </a-back-top>
      </div>
      <passwd ref="pass" />
    </a-layout>
  </a-config-provider>
</template>
<script>
import screenfull from "screenfull";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import store from "@/store";
moment.locale("zh-cn");

import tabs from "./tabs";
import mymenu from "./menu";
import passwd from "./passwd";

export default {
  data() {
    return {
      collapsed: false,
      levelList: [],
      zh_CN,
      isFullscreen: false,
      theme: "light",
      visibilityHeight: 100
    };
  },
  components: {
    tabs,
    mymenu,
    passwd
  },
  mounted() {
    let _that = this;
    window.onresize = function() {
      if (!_that.checkFull()) {
        // 全屏下按键esc后要执行的动作
        _that.isFullscreen = false;
      }
    };
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
    this.changeSkin(store.state.primaryColor);
  },
  methods: {
    changeSkin(primaryColor) {
      this.$store.dispatch("ChangeprimaryColor", primaryColor).then(() => {
        window.less.modifyVars({
          "@primary-color": primaryColor,
          "@link-color": primaryColor,
          "btn-primary-bg": primaryColor
        });
      });
    },
    passwd() {
      this.$refs.pass.showModal();
    },
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    logOut() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
        //this.$router.push({path:'/login'})
      });
    },
    getBreadcrumb() {
      let matched = this.$route.matched;

      //const first = matched[0]
      //alert(first.name);
      //if (first && first.name.trim().toLocaleLowerCase() !== 'main'.toLocaleLowerCase()) {
      //matched = [{ path: '/main', meta: { title: '首页' }}].concat(matched)
      //}

      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    //全屏
    /**
     * 全屏事件
     */
    screenfull() {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    },
    contentfull() {
      screenfull.toggle(document.getElementById("contentmain"));
    },
    /**
     * 是否全屏并按键ESC键的方法
     */
    checkFull() {
      var isFull =
        window.fullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenEnabled;
      // to fix : false || undefined == undefined
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    }
  }
};
</script>
<style rel="stylesheet/less" lang="less">
.ant-btn {
  min-width: 75px;
}

.logoimg {
  display: inline-block;
  // width: 50px;
}

.logo {
  margin-left: 15px;
}

.logo1 {
  margin-left: 15px;
}

.logo img {
  vertical-align: center;
  height: 32px;
  width: 32px;
}

.overhidden {
  width: 200px;
  line-height: 64px;
  height: 64px;
  //overflow: hidden;
  //background: #000;
}

.logo1 img {
  vertical-align: center;
  height: 32px;
  width: 32px;
}

#layout {
  min-height: calc(100%);
}

#layout .trigger {
  font-size: 22px;
  padding: 22px 20px;
  cursor: pointer;
  transition: color 0.3s;
  float: left;
  color: #444;
}

#layout .trigger:hover {
  //color: @primary-color;
}

#layoutHeader {
  background: #fff;
  padding: 0px;
  border: 1px solid #e8e8e8;
  border-top: 0px solid #ccc;
  margin-left: 2px;
}

#layout .trigger1 {
  font-size: 16px;
  padding: 23px 10px 24px 10px;
  cursor: pointer;
  transition: color 0.3s;
  float: left;
  color: #444;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
}

#layout .trigger1:hover {
  //color: @primary-color;
  background-color: #eee;
}

#layout .logo {
  padding: 0px;
  height: 64px;
  //overflow: hidden;
}

#layout .logo1 {
  padding: 0px;
  height: 64px;
  overflow: hidden;
}

#layoutRight {
}

#layout .logo .title {
  margin: 0px;
  margin-left: 10px;
  //background: #fcfcfc;
  cursor: default;
  font-size: 16px;
  //padding: 0px;
  //width: 110px;
  display: inline;
}

#layout .logo1 .title {
  margin: 0px;
  color: #fff;
  margin-left: 10px;
  ///background: #fcfcfc;
  cursor: default;
  font-size: 16px;
  //padding: 0px;
  //width: 110px;
  line-height: 64px;
  //width: 0px;
  display: inline;
  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#layout .logo1 img {
  margin-left: 10px;
  margin-right: 10px;
}

#title:hover {
  //color: @primary-color;
}

.setting {
  position: fixed;
  top: 40%;
  right: 2px;
}

#content {
  margin: 1px 10px;
  padding: 15px 5px;

  min-height: calc(100%);
  background-color: #fefefe;
  border: 1px solid #e8e8e8;
  width: 100%;
}

#contentmain {
  min-height: calc(100%);
  width: 100%;
  display: block;
  overflow: auto;
}
</style>

<style rel="stylesheet/less" lang="less" scoped>
.ant-back-top {
  bottom: 13px;
  right: 13px;
}

.ant-back-top-inner {
  height: 44px;
  width: 44px;
  line-height: 44px;
  border-radius: 22px;
  //background-color: @primary-color;

  color: #fff;
  text-align: center;
  font-size: 12px;
}

.ant-menu-line {
  background: #fcfcfc;
}

.ant-menu-dark .ant-menu-item > a {
  color: #000;
}

.ant-menu-dark .ant-menu-item {
  color: #000;
}

.ant-layout-sider {
  background: #fcfcfc;
}

.ant-layout-footer {
  padding: 20px 50px;
}

#brseparator {
  //color: @primary-color;
}

.light {
  height: 100%;
  width: 100%;
  background: #ffffff;

  .title {
    color: #000;
  }

  .ant-divider {
    background-color: #ddd;
  }
}

.dark {
  height: 100%;
  width: 100%;
  background: #001529;

  .title {
    color: #fff;
  }

  .ant-divider {
    background-color: #444;
  }
}

#foot {
  text-align: center;
}
</style>
