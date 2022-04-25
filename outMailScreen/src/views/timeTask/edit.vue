<template>

  <a-drawer
            placement="right"
            :closable="true"
            @close="onClose"
            :visible="showVisible"
            width="700px">
			<span slot="title">
				<a-icon :type="iconType"/>&nbsp; {{dialogTypeMap[dialogType]}}
				
			</span>

    <a-form class="ant-advanced-search-form" style="border:none;" :form="form">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="作业名称"
                       :label-col="{ span: 4 }"
                       :wrapper-col="{ span: 24 }">
            <a-input placeholder="请输入作业名称"  :disabled="disabled" 
					v-decorator="['processName',rule.processName]"
			/>
			
			<a-input type="hidden"  :disabled="disabled"
					v-decorator="['processId']"
			/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Java类名"
                       :label-col="{ span: 4 }"
                       :wrapper-col="{ span: 12 }">
            <a-input  placeholder="请输入Java类名" :disabled="disabled"
					v-decorator="['className',rule.className]"
			/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="组名"
                       :label-col="{ span: 4 }"
                       :wrapper-col="{ span: 12 }">
            <a-input  placeholder="请输入组名"  :disabled="disabled"
					v-decorator="['groupName',rule.groupName]" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="调度表达式"
                       :label-col="{ span: 4 }"
                       :wrapper-col="{ span: 12 }">
            <a-input  placeholder="请输入调度表达式" :disabled="disabled" 
					v-decorator="['cronExpr',rule.cronExpr]"/>
          </a-form-item>
        </a-col>
		
		<a-col :span="24">
		  <a-form-item label="调度说明"
		               :label-col="{ span: 4 }"
		               :wrapper-col="{ span: 12 }">
		    <a-input  placeholder="请输入调度说明" :disabled="disabled1"
					v-decorator="['scheduleDesc',rule.scheduleDesc]"/>
		  </a-form-item>
		</a-col>
		
		
		<a-col :span="24">
		  <a-form-item label="启用状态"
		               :label-col="{ span: 4 }"
		               :wrapper-col="{ span: 12 }">
		    <template>
				<a-radio-group  name='isValid' :disabled="disabled"  v-decorator="['isValid',rule.isValid]" >
					<a-radio value="0">启用</a-radio>
					<a-radio value="1">禁用</a-radio>
				</a-radio-group>
			</template>
		  </a-form-item>
		</a-col>
        
      </a-row>
    </a-form>
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
      <a-button :style="{marginRight: '8px'}" @click="onClose" v-if="showCanel"> 取消 </a-button>
      <a-button @click="onSubmit" type="primary">{{SubmitTypeMap[dialogType]}}</a-button>
    </div>
  </a-drawer>

</template>

<script>
import {addJob ,updateJob} from '@/api/index.js';

  export default {
    data() {
      return {
		disabled:'',
		disabled1:'',
        showVisible: false,
		form: this.$form.createForm(this),
		hackRest:false,
		dialogType:'',
		dialogTypeMap:{
			show:'任务详情',
			create:'任务管理新增',
			update:'任务管理修改'
		},
		SubmitTypeMap:{
			show:'关闭',
			create:'确认新增',
			update:'确认修改',
		},
		showCanel:true,
		rule:{
			processName:{ rules: [{ required: true, message: '请输入作业名称' }],initialValue:''},
			className:{ rules: [{ required: true, message: '请输入Java类名' }],initialValue:''},
			groupName:{ rules: [{ required: true, message: '请输入组名' }],initialValue:'默认组'},
			cronExpr:{ rules: [{ required: true, message: '请输入调度表达式' }],initialValue:''},
			scheduleDesc:{ rules: [{ required: true, message: '请输入调度说明' }],initialValue:''},
			isValid:{ rules: [{ required: true, message: '请选择状态' }],initialValue:'1'},
			
		}
      }
    },
    methods: {
	   //查看
      ShowDialog(query) {
		this.disabled=true
		this.disabled1=true
		this.showCanel = false
        this.showVisible = true
		this.iconType ="copy";
		this.dialogType='show'
		this.timeTask=query
		this.$nextTick(()=>{
			this.hackRest=true;
			this.form.setFieldsValue(query)
		});
      },
	  
	  //新增
	  CreateDialog() {
		this.iconType ="form";
		this.showCanel = true
		this.disabled=false
		this.disabled1=false
	    this.showVisible = true
	  	this.dialogType='create'
		this.form.resetFields();//清除缓存数据
	  },
	  //修改
	  UpdateDialog(query) {
		this.iconType ="form";
		this.showCanel = true
	  	this.disabled=false
		this.disabled1=false
	    this.showVisible = true
	  	this.dialogType='update'
		this.timeTask=query
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
	  //新增
	  create(){
		 this.form.validateFields((err, values) => {
		  if(!err){
			  addJob(values).then(res=>{
				  //console.log(res)
				if(res.data.code=='0000'){
					this.$message.success(res.data.message)
					this.$emit('fresh')
					
				}else{
					this.$message.error(res.data.message)
				}
			  })
			  this.showVisible = false
			}
		  });
	  },
	  //修改
	  update(){
		  this.form.validateFields((err, values) => {
		   if(!err){
			  updateJob(values).then(res=>{
				  //console.log(res)
				if(res.data.code=='0000'){
					this.$message.success(res.data.message)
					this.$emit('fresh')
				}else{
					this.$message.error(res.data.message)
				}
			  })
			  this.showVisible = false
			}
		   });
	  }
    }
  }

</script>
