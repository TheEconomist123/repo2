import Vue from "vue";
import Vuex from "vuex";
import cookie from "js-cookie";
import { message } from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import { getMenusByUserId, login } from "@/api/system.js";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    //这里放全局参数
    token: "" || cookie.get("token"),
    primaryColor: "" || cookie.get("primaryColor"),
    theme: "" || cookie.get("theme"),
    menu: "" || cookie.get("menu"),

    // =================

    trafficVolume: {}, //流量
    responseTime: {}, //响应时间
    CashAndPosition: {}, //地图
    MiddleRankData: {}, //中间服务方数据排名
    CounterTotal: "0", //柜面总数
    GuiMianRankData: [], //柜面数据
    ChannelTotal: "0", //渠道总数
    QuDaoRankData: [], //渠道排名
    Total: "0", //总交易量
    AllDeposit: {}, //总存款,

    CounterAmounts: "0", //在线柜员数
    CoreTotal: "0", //核心交易量
    Ebank: {}, //网银信息
    Bst: {}, //Bst 信息
    Atm: {}, //Atm 信息
    Epay: {}, //信E付
    AndroidNum: {}, //android
    IphoneNum: {}, //iphonenum
    EveryLoan: {} //各项贷款
  },
  getters: {
    getSession: state => state.session,
    getPrimaryColor: state => state.primaryColor,
    getTheme: state => state.theme,
    getMenu: state => state.menu,
    getToken: state => state.token,
    // ==================
    getTrafficVolume: state => state.trafficVolume,
    getResponseTime: state => state.responseTime,
    getCashAndPosition: state => state.CashAndPosition,
    getMiddleRankData: state => state.MiddleRankData,

    getCounterTotal: state => state.CounterTotal,
    getGuiMianRankData: state => state.GuiMianRankData,

    getChannelTotal: state => state.ChannelTotal,
    getQuDaoRankData: state => state.QuDaoRankData,
    getTotal: state => state.Total,

    getAllDeposit: state => state.AllDeposit, //总存款

    getCounterAmounts: state => state.CounterAmounts, //在线柜员数
    getCoreTotal: state => state.CoreTotal, //核心交易量
    getEbank: state => state.Ebank, //网银信息
    getBst: state => state.Bst, //Bst 信息
    getAtm: state => state.Atm, //Atm 信息
    getEpay: state => state.Epay, //Epay
    getAndroidNum: state => state.AndroidNum,
    getIphoneNum: state => state.IphoneNum,

    getZS01: state => state.EveryLoan //各项贷款
  },
  mutations: {
    //这里是set方法

    SET_SESSION: (state, session) => {
      state.session = session;
      cookie.set("session", session);
    },
    INIT_TOKEN: state => {
      state.token = "" || cookie.get("token");
    },

    CLEAR_TOKEN: state => {
      state.token = "";
      cookie.set("token", "");
    },
    SET_PRIMARYCOLOR: (state, primaryColor) => {
      state.primaryColor = primaryColor;
      cookie.set("primaryColor", primaryColor);
    },
    SET_THEME: (state, theme) => {
      state.theme = theme;
      cookie.set("theme", theme);
    },
    SET_MENU: (state, menu) => {
      state.menu = JSON.stringify(menu);
      cookie.set("menu", JSON.stringify(menu));
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
      cookie.set("token", token);
    },

    // ================
    SET_AllDeposit: (state, allDepsit) => {
      state.allDeposit = allDepsit;
    },
    //流量
    SET_GETTRAFFICVOLUME: (state, trafficVolume) => {
      state.trafficVolume = trafficVolume;
    },

    //响应时间
    SET_GETTRESPONSETIME: (state, responseTime) => {
      state.responseTime = responseTime;
    },

    //地图
    SET_CASHANDPOSITION: (state, CashAndPosition) => {
      state.CashAndPosition = CashAndPosition;
    },
    //中间服务方数据排名
    SET_MIDDLERANKDATA: (state, MiddleRankData) => {
      state.MiddleRankData = MiddleRankData;
    },
    //柜面总数
    SET_COUNTERTOTAL: (state, CounterTotal) => {
      state.CounterTotal = CounterTotal;
    },
    //柜面排名
    SET_GUIMIANRANKDATA: (state, GuiMianRankData) => {
      //console.info(GuiMianRankData);

      state.GuiMianRankData = GuiMianRankData;
    },

    //柜面总数
    SET_CHANNELTOTAL: (state, ChannelTotal) => {
      state.ChannelTotal = ChannelTotal;
    },
    //柜面排名
    SET_QUDAORANKDATA: (state, QuDaoRankData) => {
      state.QuDaoRankData = QuDaoRankData;
    },

    //设置总交易
    SET_TOTAL: (state, total) => {
      state.Total = total;
    },

    //设置总存款
    SET_ALLDEPOSIT: (state, AllDeposit) => {
      state.AllDeposit = AllDeposit;
    },

    //在线柜员数
    SET_COUNTERAMOUNTS: (state, CounterAmounts) => {
      state.CounterAmounts = CounterAmounts;
    },
    //核心交易量
    SET_CORETOTAL: (state, CoreTotal) => {
      state.CoreTotal = CoreTotal;
    },
    //核心交易量
    SET_EBANK: (state, Ebank) => {
      state.Ebank = Ebank;
    },
    //Bst 信息
    SET_BST: (state, Bst) => {
      state.Bst = Bst;
    },
    //ATM 信息
    SET_ATM: (state, Atm) => {
      state.Atm = Atm;
    },
    //Epay 信息
    SET_EPAY: (state, Epay) => {
      state.Epay = Epay;
    },

    SET_ANDROIDNUM: (state, AndroidNum) => {
      state.AndroidNum = AndroidNum;
    },
    SET_IPHONENUM: (state, IphoneNum) => {
      state.IphoneNum = IphoneNum;
    },

    //各项贷款
    SET_EVERYLOAN: (state, EveryLoan) => {
      state.EveryLoan = EveryLoan;
    }
  },
  actions: {
    Login({ commit }, parm) {
      return new Promise((resolve, reject) => {
        login(parm).then(response => {
          if (response.data.code == "0000") {
            commit("SET_TOKEN", response.data.extend.token);
            resolve();
          } else {
            message.error("登录失败" + response.data.message);
            reject();
          }
        });
      });
    },
    LogOut({ commit }) {
      commit("CLEAR_TOKEN");
    },
    ChangeprimaryColor({ commit }, primaryColor) {
      commit("SET_PRIMARYCOLOR", primaryColor);
    },
    ChangeTheme({ commit }, theme) {
      commit("SET_THEME", theme);
    },

    // =============
    ChangeAllDepsit({ commit }, allDepsit) {
      commit("SET_AllDeposit", allDepsit);
    },

    ChangeGetTrafficVolume({ commit }, trafficVolume) {
      commit("SET_GETTRAFFICVOLUME", trafficVolume);
    },

    ChangeGetResponseTime({ commit }, responseTime) {
      commit("SET_GETTRESPONSETIME", responseTime);
    },
    ChangeGetCashAndPosition({ commit }, CashAndPosition) {
      commit("SET_CASHANDPOSITION", CashAndPosition);
    },

    ChanegeGetMiddleRankData({ commit }, MiddleRankData) {
      commit("SET_MIDDLERANKDATA", MiddleRankData);
    },
    ChangeCounterTotal({ commit }, CounterTotal) {
      commit("SET_COUNTERTOTAL", CounterTotal);
    },
    ChangeGuiMianRankData({ commit }, GuiMianRankData) {
      commit("SET_GUIMIANRANKDATA", GuiMianRankData);
    },

    ChangeChannelTotal({ commit }, ChannelTotal) {
      commit("SET_CHANNELTOTAL", ChannelTotal);
    },
    ChangeQuDaoRankData({ commit }, QuDaoRankData) {
      commit("SET_QUDAORANKDATA", QuDaoRankData);
    },
    ChangeTotal({ commit }, total) {
      commit("SET_TOTAL", total);
    },
    ChangeAllDeposit({ commit }, AllDeposit) {
      commit("SET_ALLDEPOSIT", AllDeposit);
    },
    ChangeCounterAmounts({ commit }, CounterAmounts) {
      commit("SET_COUNTERAMOUNTS", CounterAmounts);
    },
    ChangeCoreTotal({ commit }, CoreTotal) {
      commit("SET_CORETOTAL", CoreTotal);
    },
    ChangeEbank({ commit }, Ebank) {
      commit("SET_EBANK", Ebank);
    },
    ChangeBst({ commit }, Bst) {
      commit("SET_BST", Bst);
    },
    ChangeAtm({ commit }, Atm) {
      commit("SET_ATM", Atm);
    },
    ChangeEpay({ commit }, Epay) {
      commit("SET_EPAY", Epay);
    },
    ChangeAndroidNum({ commit }, AndroidNum) {
      commit("SET_ANDROIDNUM", AndroidNum);
    },
    ChangeAndroidNum({ commit }, AndroidNum) {
      commit("SET_ANDROIDNUM", AndroidNum);
    },
    ChangeIphoneNum({ commit }, IphoneNum) {
      commit("SET_IPHONENUM", IphoneNum);
    },

    //各项贷款
    ChangeEveryLoan({ commit }, EveryLoan) {
      commit("SET_EVERYLOAN", EveryLoan);
    },

    //获取用户菜单
    GetMenusByUserId({ commit }) {
      return new Promise((resolve, reject) => {
        getMenusByUserId()
          .then(response => {
            let menu = response.data.extend;
            commit("SET_MENU", menu);
            resolve();
          })
          .catch(error => {
            reject();
          });
      });
    }
  }
});

export default store;
