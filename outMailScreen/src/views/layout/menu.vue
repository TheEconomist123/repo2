<template>
  <a-menu :selectedKeys="[$route.path]" mode="inline">
    <a-menu-item key="/main/">
      <router-link to="/main/"
        ><a-icon type="home" /> <span class="nav-text">首页</span></router-link
      >
    </a-menu-item>

    <!--<a-menu-item key="/main/datashow">
      <router-link to="/main/datashow"
        ><a-icon type="cloud" /> <span class="nav-text">展示</span></router-link
      >
    </a-menu-item>-->
	
	

   <template v-for="item in menuList">
      <a-menu-item v-if="item.type == 1" :key="item.path">
        <router-link :to="item.path"
          ><a-icon :type="item.icon" />
          <span class="nav-text">{{ item.name }}</span></router-link
        >
      </a-menu-item>

      <a-sub-menu v-if="item.type == 0" :key="item.path">
        <span slot="title"
          ><a-icon :type="item.icon" />
          <span>{{ item.name }}</span>
        </span>
        <a-menu-item v-for="subitem in item.node">
          <router-link :to="subitem.path"
            ><a-icon :type="subitem.icon" />
            <span class="nav-text">{{ subitem.name }}</span></router-link
          >
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>
<script>
import store from "@/store";
import { getMenusByUserId } from "@/api/system.js";
export default {
  data() {
    return {
      menuList: [],
      theme: "light"
    };
  },
  created() {
    this.getMenusByUserId();
  },
  methods: {
    getMenusByUserId() {
      getMenusByUserId().then(response => {
        //let menu = response.data.extend;
        this.menuList = response.data.extend;
      });
    }
  }
};
</script>
