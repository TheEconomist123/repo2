<template>

  <a-drawer
      class="padding20"
		 placement="right"
		 :closable="true"
		 @close="onClose"
		 :visible="showVisible"
		 width="1100px">
		 <span slot="title">
			<a-icon type="form"/>&nbsp; {{dialogTypeMap[dialogType]}}

		 </span>



	<a-tabs >
	<a-tab-pane tab="角色信息">
		<a-form :form="form">
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

	</a-tab-pane>
	</a-tabs>

	<a-tabs calss="padding20">
		<a-tab-pane tab=" 菜单信息 ">
			<a-table class="padding20" :columns="columns" :dataSource="list" bordered :pagination="pagination">
			  <span slot="icon" slot-scope="icon">
			      <a-icon  :type="icon"/>
			  </span>
			  <span slot="status" slot-scope="status">
			       <a-badge :status="status=='1'?'success':'error'" />
			      {{statusmap[status]}}
			  </span>
					<span slot="type" slot-scope="type">
					    {{typemap[type]}}
					</span>

			  <span slot="operation" slot-scope="text, record">
			  <a  @click="showlist(record)">查看</a>
			  <a-divider type="vertical" />
			  <a-dropdown>
			    <a class="ant-dropdown-link" href="javascript:;">
			    更多 <a-icon type="down" />
			    </a>
			    <a-menu slot="overlay">
			    <a-menu-item>
			      <a href="javascript:;" @click="update(record)">修改</a>
			    </a-menu-item>
			    <a-menu-item>
			      <a href="javascript:;" @click="deletList(record)">删除</a>
			    </a-menu-item>
			    </a-menu>
			  </a-dropdown>
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
	import {addRole,updateRole,getMenuByRoleId} from '@/api/system.js';

  export default {
    data() {
      return {
        form: this.$form.createForm(this),
        dialogTypeMap: {
          show: '角色详情',
          create: '角色新增',
          update: '角色修改'
        },
        	hackRest:false,
          columns: [
            { title: '菜单ID', dataIndex: 'id',align:'center' },
            { title: '菜单名称', dataIndex: 'name',align:'center' },
            { title: '菜单路径', dataIndex: 'path' ,align:'center'},
  		      { title: '菜单类型', dataIndex: 'type' ,align:'center',scopedSlots: { customRender: 'type' }},
            { title: '父菜单', dataIndex: 'parentName' ,align:'center'},
            { title: '菜单图标', dataIndex: 'icon' ,align:'center',width:'90px',scopedSlots: { customRender: 'icon' }},
            { title: '状态', dataIndex: 'status',align:'center',scopedSlots: { customRender: 'status' } }
          ],
          listQuery:{
            page:1,
            pageSize:5,
            roleId:''
          },
          query:{},
          list:[],
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
        SubmitTypeMap: {
          show: '确认',
          create: '提交',
          update: '提交'
        },

		statusmap:{
		  '0':'停用',
		  '1':'启用'
		},
		typemap:{
		  '0':'一级菜单',
		  '1':'二级菜单'
		},
        showVisible: false,
        rule:{
          name:{ rules: [{ required: true, message: '请输入角色姓名' }],initialValue:''},
          desc:{ rules: [{ required: true, message: '请输入角色描述' }],initialValue:''},
          status:{ rules: [{ required: true, message: '请输入角色状态' }],initialValue:''},
        }
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
          this.query = query
        	this.getList(query)
        this.$nextTick(() => {
          this.form.setFieldsValue(query)
        })
      },

      //获取关联角色信息
      getList(){
        this.loading=true
        this.listQuery.roleId = this.query.id
         getMenuByRoleId(this.listQuery).then(res=>{
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

      //新增
      CreateDialog() {
        this.disabled = false
        this.showVisible = true
        this.dialogType = 'create'
      },
      //修改
  	  UpdateDialog(query) {
  	  	this.disabled=false
  	    this.showVisible = true
  	  	this.dialogType='update'
  		  this.$nextTick(()=>{
          	this.hackRest=true;
  			this.form.setFieldsValue(query)
  		});
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
     create(){
       this.form.validateFields((err, values) => {
         if (err) {
           this.$message.error("新增失败！");
         }else{
          // var listArry=this.form.getFieldsValue()
           //console.log(listArry)
         addRole(values).then(res=>{
           if(res.status==200){
             this.$message.success('新增成功！')
             this.$emit('fresh')
           }else{
             this.$message.error('新增失败！')
           }
           })
           this.showVisible = false
         }
        });
     },
     update(){
        this.form.validateFields((err, values) => {
          console.info(values)
        //  var listArry=this.form.getFieldsValue()
          updateRole(values).then(res=>{
            if(res.status==200){
              this.$message.success('修改成功！')
              this.$emit('fresh')
              this.showVisible = false
            }else{
              this.$message.error('修改失败！')
              this.showVisible = false
            }
          })
        });
        //end update
     },
     pageSizeChange(pageSize){
       this.listQuery.pageNum = 1;
       this.listQuery.pageSize = pageSize;
       this.getList();
     },
     pagechage(pageNum, pageSize){

       this.listQuery.pageNum= pageNum;
         this.listQuery.pageSize = pageSize;
       this.getList();
     }


    }
  }

</script>

<style>
  .padding20{
    padding-bottom: 40px;
  }
</style>
