<template>
  <a-drawer
		placement="right"
		:closable="true"
		@close="onClose"
		:visible="showVisible"
		width="1100px">
		<span slot="title">
			<a-icon type="form"/>&nbsp; {{dialogTypeMap[dialogType]}}

		</span>

    <a-tabs>
    <a-tab-pane tab="用户信息">
		<a-form :form="form">
		  <a-row :gutter="24">
			<a-col :span="24">
			  <a-form-item label="登录名" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
					  <a-input type="hidden" placeholder="请输入登录名" :disabled="disabled" v-decorator="['id']"/>
					<a-input placeholder="请输入登录名" :disabled="disabled" v-decorator="['login',rule.login]"/>
			  </a-form-item>
			</a-col>
			<a-col :span="24">
			  <a-form-item label="姓名" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
				<a-input  placeholder="请输入姓名"  :disabled="disabled" v-decorator="['name',rule.name]"  />
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

	</a-tab-pane>
	</a-tabs>

	<a-tabs>
		<a-tab-pane tab=" 角色信息 ">
			<a-table :columns="columns"  :dataSource="list" bordered :pagination="pagination" :loading='loading' style="margin-bottom:50px;">

				<span slot="status" slot-scope="status">
				     <a-badge :status="status=='1'?'success':'error'"/>
				     {{status | statusFilter}}

				 </span>
			</a-table>
		</a-tab-pane>
	</a-tabs>

    <div class="modeButton">
      <a-button :style="{marginRight: '8px'}"
                @click="onClose">
        取消
      </a-button>
      <a-button @click="onSubmit" type="primary">{{SubmitTypeMap[dialogType]}}</a-button>
    </div>
  </a-drawer>

</template>

<script>
import {getRoleByUserId} from '@/api/system.js';

  export default {

	filters:{
		statusFilter(status){
			const statusMap={
				'1':'启用',
				'0':'禁用'
			}
			return statusMap[status]
		},


	},

    data() {
      return {
        iconType:'from',
        form: this.$form.createForm(this),
        dialogTypeMap: {
          show: '用户详情',
          create: '用户新增',
          update: '用户修改'
        },
        hackRest:false,
        SubmitTypeMap: {
          show: '确认',
          create: '提交',
          update: '提交'
        },
        showVisible: false,
        rule:{
          login:{ rules: [{ required: true, message: '请输入用户名' }],initialValue:''},
          name:{ rules: [{ required: true, message: '请输入姓名' }],initialValue:''},
          status:{ rules: [{ required: true, message: '请选择状态' }],initialValue:'1'},
        },

		columns: [
		  { title: '角色ID', dataIndex: 'id',align:'center' },
		  { title: '角色名称', dataIndex: 'name' ,align:'center'},
		  { title: '角色描述', dataIndex: 'desc',align:'center' },
		  { title: '角色状态', dataIndex: 'status',align:'center',scopedSlots: { customRender: 'status' } },

		],

		list: [
		],
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
      }
    },
    props: {
      showVisible: Boolean
    },

    methods: {
      //查看
      ShowDialog(query) {
        this.disabled = true
        this.showVisible = true
        this.dialogType = 'show'

		this.getList(query)
        this.$nextTick(() => {
          this.form.setFieldsValue(query)
        })
      },

	  //获取关联角色信息
	  getList(query){
	  	this.loading=true
	  	 getRoleByUserId({userId:query.id}).then(res=>{
	  		if(res.data.code=='0000'){
	  			this.loading=false
	  			console.log(res)
	  			this.list = res.data.extend.list
	  			this.pagination.total = res.data.extend.total;
	  		}else{
	  			this.loading=false
	  			this.$message.error(res.data.message)
	  		}
	  	 })
	  },


  	  //关闭
  	  onClose(){
  		  this.showVisible = false;
  		  this.form.resetFields();
  	  },
      //提交按钮
        onSubmit() {
       if(this.dialogType=='show'){
        this.showVisible = false
       }
       if(this.dialogType=='create'){
          this.create();
       }
       if(this.dialogType=='update'){
          this.update();
       }
     },

    }
  }

</script>
