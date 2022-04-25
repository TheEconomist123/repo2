<template>
	<div style="overflow: hidden;">
		<div class="titshow">
			<span>总交易量：</span>
			<span>
			   <span>{{endNum}}</span>
			   
			</span>
			<span>笔</span>
		</div>
		<div class="showtab">
			<table class="tabheader">
				<tr>
					<td>排名</td>
					<td>分类</td>
					<td>数量</td>
					<td>占比</td>
				</tr>
			</table>
		</div>
		<div class="box">
		  <ul class="byc1">
			<template >
		  	<li v-for="index in 6" :key="index">
		  		<div>
					<template v-for="page in pages">
		  			<p v-if="(page-1)*6+index<=list.length">
						<span class="pm"><em  :class="{changeNum:(page-1)*6+index==1 || (page-1)*6+index==2 || (page-1)*6+index==3}">{{ (page-1)*6+index }}</em></span> 
						<span class="fenglei">{{list[page*6+index-7].rankName}}</span>
						<span class="sl">{{list[page*6+index-7].number}}</span> 
						<span class="zb">{{list[page*6+index-7].percentage}}</span>
					</p>
		  			</template>
		  		</div>
		  	</li>
			</template>
		  </ul>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	//import {getGuiMianRankData,queryCounterTotal}  from '@/api/chart.js';
	export default{
		data(){
			return{
				dots:false,
				autoplay:true,
				pages:0,
				last:0,
				list:[],
				startNum:0,
				endNum:0,
				flag:true,
				liindex:0,
				showdiv:{},
				pageindex : 1
				
			}
		},
		computed: {
		 	 ...mapGetters(["getCounterTotal","getGuiMianRankData"])
		},
		watch:{
			 'getCounterTotal' (val,old){
					//this.showMiddle(val)
					//this.time1(val);
					//console.info(val)
					this.channelsNum(val);
			 },
			'getGuiMianRankData'(val,old){
				//console.info(val)
				let redata = JSON.parse(val);
				this.getQu(redata);
				
			}
		},
		
		
		
		created(){
			//this.getQu();
			//this.channelsNum()
			//this.timer=setInterval(this.channelsNum,30000)
		},
		mounted(){
			this.time1();
			
		},
		methods:{
			
			time1(){
				var that=this
				
				this.showdiv = $(".byc1").find("div");
				var set1 = setInterval(function(){
					if(that.pageindex<that.pages){
						that.ainbyc(that.showdiv);
						that.liindex = 0;
						that.pageindex++
					}else{
						//clearInterval(set1);
						//alert('加载')
						//that.getQu();
						//that.channelsNum();
						that.pageindex=0;
					}
					
					//that.flag = !that.flag;
				},4000);
			},
			
			
			getQu(res){
				//console.info(res);
				//请求前端（柜面）交易量
				//getGuiMianRankData().then(res=>{
					
					this.list =res;
					this.pages = parseInt((res.length-1)/6+1);
					this.last = res.length%6==0?6:res.length%6;
					//this.time1();
					
				//})
			},
			channelsNum(res){
				//queryCounterTotal().then(res=>{
					let sres=res.replace(/"/g,"");
					this.endNum=sres;
				//})
			},
			ainbyc(ds){
				var that=this;
				var set2 = setInterval(function(){
					//所有的LI移动完毕，就清除
				  if(that.liindex == that.showdiv.length){
					clearInterval(set2);
					//向上
				  }
	
				  var top = (that.pageindex-1)*75*-1;
				  ds.eq(that.liindex).animate({"top":top},300);
				  
				  /* else if(that.flag){
					ds.eq(that.liindex).animate({"top":0},300);
					//向下
				  }else{
					ds.eq(that.liindex).animate({"top":-70},300);
				  } */
				  that.liindex++;
				},100);		
			},	
			
		}
	
	}
</script>

<style scoped="scoped">
	.titshow{
		width: 100%;
		height: 80px;
		background: rgba(255,222,2,0.3);
		border-bottom: 2px solid rgba(255,255,255,0.4);
		margin-top: 16px;
		padding-left: 10px;
	}
	.titshow >span{
		font-size: 30px;
		color: #FFFFFF;
	}
	.titshow >span:nth-of-type(2) >span{
		font-size: 50px;
		color: #FFDE02;
		font-family: 'Digiface Regular';
		letter-spacing: 4px;
	}
	
	.tabheader,.tabbody{
		width: 870px;
	}
	
	.tabheader tr{
		height: 80px;
		width: 200px;
	}
	.tabheader tr td{
		font-size: 36px;
		color: #FFFFFF;
		padding-left: 10px;
	}

	
	.tabheader tr td:nth-of-type(1) {
		width: 135px;
	} 
	.tabheader tr td:nth-of-type(2) {
		width: 339px;
	}

	
	.box{
		width: 870px;
		height: 480px;
	}
		
	ul.byc1{
		width: 100%;
		height: 100%;
		list-style:none;
	}
		
	ul.byc1 li{
		position:relative;
		width:100%;
		height: 80px;
		overflow:hidden;
	}
	ul.byc1 li:nth-of-type(2n+1){
		background: rgba(238,129,2,0.2);
	}
		
	ul.byc1 li div{
		width: 100%;
		position:absolute;
		top:0px;
	}
		
	ul.byc1 li div p{
		width: 100%;
		height:75px;
		font-size: 30px;
		color: #FFFFFF;
		line-height: 75px;
	}
	ul.byc1 li p span{
		display: inline-block;
		padding-left: 10px;
	}
	ul.byc1 li p .pm{
		width: 135px;	
	}
	ul.byc1 li p .fenglei{
		width: 339px;
	}
	ul.byc1 li p .sl{
		width: 205px;
	}
	ul.byc1 li p .pm em{
		display: inline-block;
		width: 64px;
		height: 64px;
		background: url(../../../assets/image/red/img_m_pbg_b.png);
		text-align: center;
		line-height: 64px;
	}
	ul.byc1 li p .pm em.changeNum{
		display: inline-block;
		width: 64px;
		height: 64px;
		background: url(../../../assets/image/red/img_m_pbg_a.png);
		text-align: center;
		line-height: 64px;
	}
	

</style>

