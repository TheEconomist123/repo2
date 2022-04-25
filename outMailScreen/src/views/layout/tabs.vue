<template>
  <!-- hideAdd
	tabBarGutter='4' -->
  <div class="card-container">
    <a-tabs
      hideAdd
      v-model="activeKey"
      type="editable-card"
      size="small"
      @edit="onEdit"
      @change="onChange"
    >
      <a-tab-pane
        v-for="pane in panes"
        :key="pane.key"
        :closable="pane.closable"
      >
        <span slot="tab">
          <a-icon :type="pane.icon" />
          {{ pane.title }}
        </span>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data() {
    const panes = [
      { title: "首  页", key: "/main/", closable: false, icon: "home" }
    ];
    return {
      activeKey: panes[0].key,
      panes,
      newTabIndex: 0
    };
  },
  created() {
    this.gettabs();
  },
  watch: {
    $route(to, from) {
      this.gettabs();
    }
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    remove(targetKey) {
      let activeKey = this.activeKey;
      let lastIndex;
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.panes.filter(pane => pane.key !== targetKey);
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key;
      }
      this.panes = panes;
      this.activeKey = activeKey;
      this.onChange();
    },
    gettabs() {
      var flag = false;
      let matched = this.$route.matched;
      const activeKey = matched[matched.length - 1].path;
      this.panes.forEach(item => {
        if (activeKey == item.key) flag = true;
      });
      var pane = {
        title: matched[matched.length - 1].meta.title,
        key: activeKey,
        icon: matched[matched.length - 1].meta.icon
      };
      if (!flag) this.panes.push(pane);
      this.activeKey = activeKey;
    },
    onChange() {
      this.$router.push({ path: this.activeKey });
    }
  }
};
</script>
<style>
.card-container {
  background: #f0f2f5;
  overflow: hidden;
  padding: 2px 24px;
  padding-bottom: 0px;
  padding-left: 10px;
  margin-bottom: -2px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  margin-top: -15px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  //border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;

  line-height: 32px;
  background: #000;
}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
  background: #000;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}

.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-nav-container {
  height: auto;
}
</style>
