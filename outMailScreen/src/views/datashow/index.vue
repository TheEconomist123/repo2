<template>
  <div id="showbox">
    <div class="ftit">
      <div class="tit">外联服务中台实时业务监控</div>
    </div>
    <div class="msgbox">
      <div class="left">
        <leftdate/>
      </div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import leftdate from "./components/leftdate.vue";
// import rigdate from "./components/rigdate.vue";
// import center from "./components/center.vue";
export default {
  components: {
    leftdate,
    // rigdate,
    // center
  },
  data() {
    return {
  	path:window.g.baseUrl,
  	websock: null,
    };
  },
  mounted() {
  
  	//console.info("----");
  	 // 初始化
  	// this.init()
  	//this.initWebSocket()
  	 let  wsuri = window.g.basewsUrl;//ws地址
  	//  console.info(wsuri);
  
  	this.websock = new WebSocket(wsuri); 
  	
  	//console.info(this.websock);
      if(this.websock){
  		
  		this.initWebSocket();
      }
  
  },
  methods: {
  	initWebSocket(){ //初始化weosocket
  	    
  	     let _this=this;
  	     this.websock.onopen=_this.websocketonopen;
  	
  	     // this.websocket.onerror = _this.websocketonerror;
  	     this.websock.onmessage = _this.websocketonmessage; 
  	     this.websock.onclose = _this.websocketclose;
  	
  	 },
  	 websocketonopen() {
  	     this.websocketsend("ok");
  	     console.log("WebSocket连接成功");
  	 },
  	 websocketonerror(e) { //错误
  	     console.log("WebSocket连接发生错误");
  	 },
  	
  	 websocketonmessage(e){ //数据接收 
  	     // console.info(e);
  	     if(e){
			 
  	         //console.log(e);
  	
  	        let redata = JSON.parse(e.data);
  			 
  	        // console.info(redata.getResponseTime); 
  			 
  			 this.$store.dispatch("ChangeGetTrafficVolume",redata.getTrafficVolume);
  			 this.$store.dispatch("ChangeGetResponseTime",redata.getResponseTime);
  			 this.$store.dispatch("ChangeGetCashAndPosition",redata.getCashAndPosition);
  			 this.$store.dispatch("ChanegeGetMiddleRankData",redata.getMiddleRankData);
  			 this.$store.dispatch("ChangeCounterTotal",redata.queryCounterTotal);
  			 this.$store.dispatch("ChangeGuiMianRankData",redata.getGuiMianRankData);
  			 this.$store.dispatch("ChangeChannelTotal",redata.queryChannelTotal);
  			 this.$store.dispatch("ChangeQuDaoRankData",redata.getQuDaoRankData);
  			 this.$store.dispatch("ChangeTotal",redata.getTotal);
  			 this.$store.dispatch("ChangeAllDeposit",redata.getAllDeposit);
  			 this.$store.dispatch("ChangeCounterAmounts",redata.getCounterAmounts);
  			 this.$store.dispatch("ChangeCoreTotal",redata.queryCoreTotalVolume);
  			 this.$store.dispatch("ChangeEbank",redata.getEbankCount);
  			 
  			 // console.info("---bst"+redata.getBSTQR01);
  			 this.$store.dispatch("ChangeBst",redata.getBSTQR01);
  			 this.$store.dispatch("ChangeAtm",redata.getAtmCache);
  			 this.$store.dispatch("ChangeEpay",redata.getEPAY017);
  			 
  			 
  			 this.$store.dispatch("ChangeIphoneNum",redata.getIphoneCount);
  			 this.$store.dispatch("ChangeAndroidNum",redata.getAndroidCount);
  			 //各项贷款
  			 this.$store.dispatch("ChangeEveryLoan",redata.getZS01);
  			 
  			 
  			 
  
  			 
  	     }
  	     
  	 }, 
  	
  	 websocketsend(agentData){//数据发送 
  	     // this.websock.send(agentData); 
  	 }, 
  	 websocketclose(e){ //关闭 
  	     console.info("close connection");
  	 }
  },
  created(){
     
      
  },
  destroyed(){
      // this.websocketclose();
      // this.websock.close();
  
  }
};
</script>

<style scoped>
@font-face {
  font-family: "pm";
  src: url(../../assets/font/Digiface/pm.ttf);
}

#showbox {
  margin: 0;
  padding: 0;
  width: 5760px;
  height: 3240px;
  background-image: url(../../assets/image/2021slices/out/img_bg.png);
  background-size: cover;
  background-size: contain;
  background-size: 100% 100%;
}

.ftit {
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../../assets/image/2021slices/out/img_t_bg.png) no-repeat bottom;
  
}

.tit {
  height: 140px;
  font-size: 140px;
  color: #03DEF9;
  line-height: 140px;
  /* background: angular-gradient(180deg, #ffffff 0%, #00aeff 100%); */
  position: relative;
  top: 0px;

  /* background-image: -webkit-linear-gradient(#ffffff, #00aeff); */
  font-family: "pm";
  letter-spacing: 21px;
  left: 20px;
}

.msgbox{
  width: 100%;
  height: 2990px;
  display: flex;
  justify-content: space-evenly;
}
.left{
  width:1586px ;
  height: 2871px;
}
.center{
  width: 2146px;
  height: 2871px;
  background: pink;
}
.right{
  width: 1586px;
  height: 2871px;
  background: blue;
}

</style>
