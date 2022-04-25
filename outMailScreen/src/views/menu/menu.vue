<template>
	<a-drawer
	        width="700px"
	        :closable="true"
	        @close="onChildrenDrawerClose"
	        :visible="childrenDrawer"
	      >
				<span slot="title">
					<a-icon type="form"/>&nbsp; 父级菜单

				</span>
	 <a-form class="commomForm"
	         :form="form"
	         @submit="handleSearch">
	   <a-row :gutter="24">
	     <a-col :span="8">
	       <a-form-item label="菜单名称" :label-col="{ span: 8 }"
	   :wrapper-col="{ span: 12 }">
	         <a-input v-model="listQuery.name" placeholder="姓名" />
	       </a-form-item>
	     </a-col>
	     <a-col :span="8">
	       <a-form-item label="状态" :label-col="{ span: 8 }"
	   :wrapper-col="{ span: 16  }">
	     <a-select defaultValue="0" v-model="listQuery.status" style="width: 100%" @change="handleChange">
	       <a-select-option value="0">停用</a-select-option>
	       <a-select-option value="1">启用</a-select-option>
	     </a-select>
	       </a-form-item>
	     </a-col>
	     <a-col :span="8" :style="{ textAlign: 'right',paddingRight:'20px' }">
	       <a-form-item>
	       <a-button type="primary" @click="getList" icon="search">
	         搜&nbsp;&nbsp;索
	       </a-button>
	      <!-- <a-button :style="{ marginLeft: '8px' }" @click="handleReset" icon="redo">
	         重&nbsp;&nbsp;置
	       </a-button> -->
	         </a-form-item>
	     </a-col>
	   </a-row>
	 </a-form>


	  <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" bordered :pagination="pagination">
		<span slot="icon" slot-scope="icon">
		    <a-icon  :type="icon"/>
		</span>
		<span slot="status" slot-scope="status">
		     <a-badge :status="status=='01'?'success':'error'" />
		    {{statusmap[status]}}
		</span>

	  </a-table>

	  <div :style="{
	               position: 'absolute',
	               left: 0,
	               bottom: 0,
	               width: '100%',
	               borderTop: '1px solid #e9e9e9',
	               padding: '10px 16px',
	               background: '#fff',
	               textAlign: 'right',
	             }">
	    <a-button :style="{marginRight: '8px'}" @click="onChildrenDrawerClose"> 取消 </a-button>
	    <a-button @click="onSubmit" type="primary">确认</a-button>
	  </div>
	</a-drawer>
</template>

<script>
import {getMenusByPage} from '@/api/system.js';
	export default{
		data(){
			return {

				expand: false,
				childrenDrawer:false,
				columns: [
				 { title: '菜单ID', dataIndex: 'id',align:'center' },
				 { title: '菜单名称', dataIndex: 'name',align:'center' },
				 { title: '菜单路径', dataIndex: 'path' ,align:'center'},
				 { title: '菜单图标', dataIndex: 'icon' ,align:'center',width:'90px',scopedSlots: { customRender: 'icon' }},
				 { title: '状态', dataIndex: 'status',align:'center',scopedSlots: { customRender: 'status' } },
				],
				data:[],
				enterData:[],
				listQuery:{
					targetName:'',
					targetDesc:'',
					targetType:'',
					pageNum:1,
					pageSize:5
				},
				pagination: {
					 total:0,
				     defaultPageSize:5,
				     showTotal: total => `共 ${total} 条数据`,
				     showSizeChanger:true,
				     pageSizeOptions: ['5', '10', '15', '20'],
				     onChange:(page, pageSize)=>{
				       this.pagechage(page, pageSize);
				     },
					 onShowSizeChange:(current,pageSize)=>{
						 this.pageSizeChange(pageSize);
					 }
				},
				statusmap:{
				  '0':'停用',
				  '0':'启用'
				},
			}
		},
		created(){
			this.getList()
		},
		methods:{
			showChildrenDrawer() {
				this.childrenDrawer = true;

			},
			onChildrenDrawerClose() {
				this.childrenDrawer = false;
				this.$message.info('已取消操作')
			},

			pagechage(page, pageSize){
				this.listQuery.pageNum = page;
				this.listQuery.pageSize = pageSize;
				this.getList();
			},
			pageSizeChange(pageSize){
			    this.listQuery.pageNum = 1;
			    this.listQuery.pageSize = pageSize;
			    this.getList();
			},

			getList(){
				this.loading=true
				getMenusByPage(this.listQuery).then(res=>{
					if(res.data.code=='0000'){
						this.loading=false
						//console.log(res)
						this.data = res.data.extend.list
						this.pagination.total = res.data.extend.total;
					}else{
						this.loading=false
						this.$message.error(res.data.message)
					}
				 })
			},

			healthType(status){
			  if(status=='0'){
				  return 'success'
			  }else if(status=='1'){
				  return 'warning'
			  }else{
				  return 'error'
			  }
			},


			//提交
			onSubmit() {
				if(this.enterData.length==1){
					var query={parent:this.enterData[0].id,parentName:this.enterData[0].name}
					this.$emit('showId',query)

					this.childrenDrawer = false;
				}else{
					this.$message.error('请选择一条数据！')
				}

			},

			//展开/收起
			toggle() {
				this.expand = !this.expand
			},

			handleReset() {
				// this.form.resetFields()
				this.listQuery={}
			},
		},
		computed: {
		  rowSelection() {
			const { selectedRowKeys } = this;
			return {
			  onChange: (selectedRowKeys, selectedRows) => {
				// console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
				this.enterData=selectedRows
				//console.log(this.enterData)
			  },

			};
		  },

		  count() {
		    return this.expand ? 11 : 3
		  }

		},
	}
</script>
