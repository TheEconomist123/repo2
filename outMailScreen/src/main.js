import Vue from "vue";
import App from "./App.vue";
import ant from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import store from "./store";
import router from "./router";
import md5 from "js-md5";
//import './mock' // simulation data

import "./assets/font/font.less";

import $ from "jquery";
import countTo from "vue-count-to";
Vue.component("countTo", countTo);

import Icon from "vue-svg-icon/Icon";
Vue.component("Icon", Icon);

// 引入echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

// 还要特别引入china.json，这样中国地图才会出现，不然只会出现右下角的南海诸岛

import anhui from "echarts/map/json/province/anhui.json";
echarts.registerMap("anhui", anhui);

// 将自动注册所有组件为全局组件
import dataV from "@jiaminghi/data-view";
Vue.use(dataV);

Vue.use(ant);
Vue.prototype.$md5 = md5;

Vue.config.productionTip = false;

//websocket
import VueWebsocket from "vue-native-websocket";
//Vue.use(VueWebsocket);

//取消 Vue 所有的日志与警告。
Vue.config.silent = true;

//import $ from 'jquery';

//水波图
// import Hliquid from "h-liquid";
// Vue.use(Hliquid);


new Vue({
  store,
  router,
  $,
  render: h => h(App)
}).$mount("#app");
