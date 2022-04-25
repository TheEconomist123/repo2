<template>
	<div>
	<a-drawer
	          placement="right"
	          :closable="showCanel"
	          :visible="showVisible"
			   @close="onClose"
	          width="600px">
				<span slot="title">
					<a-icon type="form"/>&nbsp; {{title}}
				</span>

				<a-steps size="small" :current="current" :status = "stepstatus" >
					<a-step title="第一步">
						<span slot="description">{{title}}</span>
					</a-step>
					<a-step title="第二步">
						<span slot="description">菜单分配</span>
					</a-step>
					<a-step title="结束">
					</a-step>
				</a-steps>



			<div class="stepContent" v-show="current==0">
				<a-form class="ant-advanced-search-form" style="border:none;" :form="form">
				  <a-row :gutter="24">

					<a-col :span="24">
					  <a-form-item label="角色名称" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
						   <a-input type="hidden"   v-decorator="['id']"/>
					    <a-input  placeholder="请输入角色名称"  :disabled="disabled" v-decorator="['name',rule.name]"  />
					  </a-form-item>
					</a-col>
					<a-col :span="24">
					  <a-form-item label="角色描述" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
					    <a-input  placeholder="请输入角色描述"  :disabled="disabled" v-decorator="['desc',rule.desc]"  />
					  </a-form-item>
					</a-col>

					<a-col :span="24">
					  <a-form-item label="状态" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
					    <a-radio-group   :disabled="disabled" v-decorator="['status',rule.status]" >
					      <a-radio value="0">禁用</a-radio>
					      <a-radio value="1">启用</a-radio>
					    </a-radio-group>
					  </a-form-item>
					</a-col>

				  </a-row>

				</a-form>
			</div>

				<!--第二步-->
				<div class="stepContent" v-show="current==1">

					<a-tree
					  checkable
					  :treeData="treeData"
					  :checkedKeys="innerCheckedKeys"
					  @select="this.onSelect"
					  @check="this.onCheck"
					  :replaceFields="replaceFields">
					    <template slot="custom" slot-scope="item">
					      <a-icon :type="item.icon"/>&nbsp;
					      <span>{{ item.name }}</span>
					  </template>
					</a-tree>


				</div>

				<!-- 第三步 -->
				<div class="stepContent" v-show="current==2" style="text-align:center;marginTop:30px">
					<a-icon type="check-circle" style="color:green;font-size:50px;marginBottom:10px"></a-icon>
					<p style="font-size:25px;">{{this.dialogType=='create'?'新增成功':'修改成功'}}</p>
				</div>

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
					<a-button type="primary" @click="submitCreate" v-show="current!=2" :style="{marginRight:'5px'}">
							   提交
					</a-button>
					<a-button type="success" v-show="showNext" @click="goNext" :style="{marginRight:'5px'}">
							   跳过
					</a-button>
				    <a-button :style="{marginRight: '8px'}" @click="onClose" v-if="showCanel"> {{canelTitle}} </a-button>
				  </div>
				</a-drawer>
				<bounced ref='bounced' @showId="showId"></bounced>
			</div>
</template>

<script>
	import {addRole,getUsersByPage ,getMenusAll ,addRoleIdAndMenuIds, getMenuIdsByRoleId,updateUser} from '@/api/system.js';

	// import bounced from './bounced';
	 export default {
		filters:{
			statusFilter(status){
				const statusMap={
					'0':'启用',
					'1':'禁用'
				}
				return statusMap[status]
			},



		},

		 components:{
			// bounced
		 },
		 data(){
			 return {
				checkedKeysResult:[],
				query: {
				  login: '',
				  name: '',
				  status: undefined,
				  page:1,
				  pageSize:5
				},

				listQuery: {
				  name: '',
				  status: '',
				  page:1,
				  pageSize:5
				},

				statusmap:{
				  '0':'停用',
				  '1':'启用'
				},
				typemap:{
				  '0':'一级菜单',
				  '1':'二级菜单'
				},

				innerCheckedKeys:'',

				title:'角色管理新增',
				expand: false,
				 dialogType:'',
				 showNext:false,
				 canelTitle:'取消',
				 stepstatus:'process',
				 showStatus:true,
				 loading:false,
				 showVisible: false,
				 selectedRowKeys:[],
				 id:"",
				 current:0,
				 form: this.$form.createForm(this),
				 rule:{
				  name:{ rules: [{ required: true, message: '请输入角色姓名' }],initialValue:''},
				  desc:{ rules: [{ required: true, message: '请输入角色描述' }],initialValue:''},
				  status:{ rules: [{ required: true, message: '请输入角色状态' }],initialValue:''},
				 },

				treeData:[
				  ],
				  replaceFields:{
				    children:'node',
				    title:'name',
				    key:'id'
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
				}
			 }
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

		 },

		 methods:{
			 //显示绑定关联ID
			 showId(query){
				this.form.setFieldsValue(query)
			 	//console.log(query)
			 },

			 //新增
			 CreateDialog() {
				this.title='用户管理新增'
				this.showNext = false
				this.showStatus=true
				this.iconType ="form"
				this.showCanel = true
				this.disabled=false
				this.showVisible = true
				this.current = 0
				this.dialogType='create'
				this.stepstatus ="process"
				this.canelTitle="取消"
				this.showCanel = true
				this.selectedRowKeys = []
				this.form.resetFields();//清除缓存数据
				this.query={
				  login: '',
				  name: '',
				  status: '',
				  page:1,
				  pageSize:5
				}
			 },

			 // 修改
			 updateDialog(query){
				this.title='用户管理修改'
				this.showStatus=true
				this.iconType ="form"
				this.showCanel = true
				this.disabled=false
				this.showVisible = true
				this.current = 0
				this.dialogType='update'
				this.canelTitle="取消"
				this.stepstatus ="process"
				this.showCanel = true
				this.selectedRowKeys = []
				this.id=query.id;
				this.query={
				  login: '',
				  name: '',
				  status: '',
				  page:1,
				  pageSize:5
				}
				this.form.resetFields();//清除缓存数据
				 this.showNext = true
				this.$nextTick(()=>{
				    this.form.setFieldsValue(query)
				});


			 },

			 getMenuIdsByRoleId(){
				  let _this = this
				 getMenuIdsByRoleId({roleId:this.id}).then(res=>{
				 	if(res.data.code=='0000'){
				 		this.canelTitle="关闭"
				 		this.showCanel = true
				 		this.showNext = true
				 		this.current=1
						this.innerCheckedKeys = res.data.extend;
				 		}else{
						this.current=1;
						_this.stepstatus = 'error';
				 		 }
				 		}).catch(function(error){
							this.current=1;
				 		 _this.stepstatus = 'error';
				 		})
			 },
			 submitCreate(){
				 if(this.current ==0){
					 if(this.dialogType=="create"){
						 this.create();
					 }else if(this.dialogType=="update"){
						 this.update();
					 }

				 }else if(this.current == 1){//添加关联表信息
					 this.addRoleIdAndMenuIds();
				 }else{
					 this.current=2
				 }
			 },
			 // 直接进入第三步
			 goNext(){
				 if(this.current==0){

					  this.getList();

				 }else{
					 this.canelTitle="关闭"
					 this.showCanel = true
					 this.showNext = false
					  this.current=2
				 }

			 },


			 addRoleIdAndMenuIds(){
				 let _this = this
				 addRoleIdAndMenuIds({roleId:this.id,menuIds:this.checkedKeysResult.join(",")}).then(res=>{
					 if(res.data.code=='0000'){
						 this.canelTitle="关闭"
						 this.showCanel = true
						 this.showNext = false
						 this.current=2
					 }else{
						 this.$message.error(res.data.message)
						 _this.stepstatus = 'error';
					 }
				 }).catch(function(error){
						 _this.stepstatus = 'error';
					});
			 },

			 getList(){

			 	 getMenusAll(this.query).then(res=>{
			 		if(res.data.code=='0000'){
						this.showNext = true

						this.showCanel = false
						this.current=1;
			 			console.log(res)

			 			let list = res.data.extend;
						for(var i=0;i<list.length;i++){
							list[i].scopedSlots= { title: 'custom' }
							for(var j=0;j<list[i].node.length;j++){
								list[i].node[j].scopedSlots= { title: 'custom' }
							}
						}

						this.treeData=list

						if(this.dialogType=="update"){
							this.getMenuIdsByRoleId()
						}

			 		}else{
						this.current=1;
						_this.stepstatus = 'error';

			 			this.$message.error(res.data.message)
			 		}
			 	 }).catch(function(error){
							  this.current=1;
							  _this.stepstatus = 'error';
						  })
			 },
			 //新增
			 create(){
				 let _this= this;
			 		 this.form.validateFields((err, values) => {
			 		  if(!err){
			 			  addRole(values).then(res=>{
			 				if(res.data.code=='0000'){
								this.id = res.data.extend;
								this.$emit('fresh')
								this.getList();

			 					//this.$message.success(res.data.message)


			 				}else{
			 					this.$message.error(res.data.message)
								_this.stepstatus = 'error';
			 				}
			 			  }).catch(function(error){
							  _this.stepstatus = 'error';
						  })
			 			  //this.showVisible = false
			 			}
			 		  });
			 },
			 //修改
			 update(){
			 		  this.form.validateFields((err, values) => {
			 		   if(!err){
			 			  updateUser(values).then(res=>{
			 				  //console.log(res)
			 				if(res.data.code=='0000'){
								this.getList();
			 					this.$message.success(res.data.message)
			 					this.$emit('fresh')
			 				}else{
			 					this.$message.error(res.data.message)
			 				}
			 			  })

			 			}
			 		   });
			 },
			 onSelectChange(selectedRowKeys) {
				 console.info(selectedRowKeys)

			   this.selectedRowKeys = selectedRowKeys;
			 },
			 //健康状态
			 healthType(status){
				  if(status=='0'){
					return 'success'
				  }else if(status=='1'){
					return 'warning'
				  }else if(status=='2'){
					return 'error'
				  }
				  else{
					return 'default'
				  }
			 },
			 toggle() {
			 	this.expand = !this.expand
			 },

			 //关闭
			 onClose(){
				  this.showVisible = false;
				  this.form.resetFields();
				  this.$message.info('已取消操作！')
			 },

			 //选择归属ecc展示系统
			 showBounced(){
			 	this.$refs.bounced.showChildrenDrawer()
			 	// console.log(this.$refs.bounced)
			 },

			 onSelect(selectedKeys, info) {
			   console.log('selected', selectedKeys, info);
			 },
			 onCheck(checkedKeys, info) {
			     this.checkedKeysResult = [...checkedKeys, ...info.halfCheckedKeys];
			     this.innerCheckedKeys = checkedKeys;
			   console.log('onCheck', checkedKeys, info);
			 },

		 },

	 }

</script>

<style>
	.stepContent{
		margin-top:30px;
	}
</style>
