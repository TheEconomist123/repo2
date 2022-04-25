<template>
  <div></div>
</template>
<script>
import { mapGetters } from "vuex";

import { getQuDaoRankData } from "@/api/chart.js";
export default {
  data() {
    return {
      list: [],
      pages: 0,
      last: 0
    };
  },
  components: {},

  created() {},
  methods: {
    // getQuDaoRankData() {
    //   //请求柜面交易量
    //   getQuDaoRankData().then(res => {
    //     console.log(res);
    //   });
    // }
  }
};
</script>
