<template>
	<div class="dsbox">
		<div class="titshow">
			地市农商行实时交易监控
		</div>
		<div class="showtab">
            
            <div class="titnum">
                <span>总交易量</span>
                <span class="titspan">
                    <countTo :startVal="0" :endVal="1000" :duration="1000" :decimals="2"/>
                </span>
                <em class="em">（笔）</em>
            </div>

			<table class="tabheader">
				<tr>
					<td>排名</td>
					<td>分类</td>
					<td>数量</td>
					<td>占比</td>
				</tr>
			</table>

            <div class="box">
                <ul class="byc1">
                    <template >
                    <li v-for="index in 8" :key="index">
                        <div>
                            <template v-for="page in pages">
                            <p v-if="(page-1)*8+index<=list.length">
                                <span class="pm"><em  :class="{changeNum:(page-1)*8+index==1 || (page-1)*8+index==2 || (page-1)*8+index==3}">{{ (page-1)*8+index }}</em></span> 
                                <span class="fenglei">{{list[page*8+index-9].rankName}}</span>
                                <span class="sl">{{list[page*8+index-9].number}}</span> 
                                <span class="zb">{{list[page*8+index-9].percentage}}</span>
                            </p>
                            </template>
                        </div>
                    </li>
                    </template>
                </ul>
		    </div>
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
				//this.channelsNum(val);
			 },
			'getGuiMianRankData'(val,old){
				let redata = JSON.parse(val);
				//this.getQu(redata);
				
			}
		},
		
		created(){},
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
					this.pages = parseInt((res.length-1)/8+1);
					this.last = res.length%8==0?8:res.length%8;
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
    @font-face {
        font-family: "BR";
        src: url(../../../assets/font/Digiface/BR.ttf);
    }

	.titshow{
		width: 806px;
        height: 120px;
        background: url(../../../assets/image/2021slices/out/img_tit_a.png) no-repeat center;
        font-size: 56px;
        color: #FFFFFF;
        text-align: center;
        font-weight: 500;
        line-height: 120px;
        margin-left: 390px;
	}
    
	.showtab{
        width: 1586px;
        height: 1340px;
        background: url(../../../assets/image/2021slices/out/img_bg_a.png) no-repeat center;
        margin-top: 30px;
        overflow: hidden;
    }

    .titnum{
        width: 1440px;
        height: 100px;
        background: url(../../../assets/image/2021slices/out/img_tbg_a.png)no-repeat center;
        margin-top: 94px;
        margin-left: 73px;
    }
    .titnum span{
        font-size: 56px;
        color: #FFFFFF;
        letter-spacing: 4px;
        font-weight: 500;
        padding-left: 66px;
        line-height: 100px;
    }
    
    .titspan span{
        font-size: 50px;
        color: #0EFCFF;
        font-family: 'BR';
        letter-spacing: 8.6px;
    }
    .titnum .em{
        font-size: 30px;
        color: #0EFCFF;
        font-style: normal;
        letter-spacing: 8.6px;
    }

	.tabheader,.tabbody{
		width: 1440px;
        margin: 47px 0px 20px 105px;
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
		width: 239px;
	} 
	.tabheader tr td:nth-of-type(2) {
		width: 538px;
	}

	
	.box{
		width: 1440px;
        margin-left: 35px;
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
		background: rgba(19,128,214,0.2);
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
		
		text-align: center;
		line-height: 64px;
	}
	ul.byc1 li p .pm em.changeNum{
		display: inline-block;
		width: 64px;
		height: 64px;
		
		text-align: center;
		line-height: 64px;
	}
	

</style>

