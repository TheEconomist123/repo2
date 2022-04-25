<template>

  <a-drawer   placement="right"  :closable="true"  @close="onClose"  :visible="showVisible"  width="700px">
    <span slot="title">
      <a-icon type="form" />&nbsp;{{dialogTypeMap[dialogType]}}
    </span>

    <a-form :form="form">
      <a-row :gutter="24">

        <a-col :span="24">
          <a-form-item label="菜单名称" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
			  <a-input  type="hidden" :disabled="disabled" v-decorator="['id']"/>
            <a-input  placeholder="请输入菜单名称"  :disabled="disabled" v-decorator="['name',rule.name]"  />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="菜单路径" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-input  placeholder="请输入菜单路径"  :disabled="disabled" v-decorator="['path',rule.path]"  />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="菜单图标" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-input  placeholder="请输入菜单图标"  :disabled="disabled" v-decorator="['icon',rule.icon]"  />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="菜单类型" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-radio-group  @change='change'  :disabled="disabled" v-decorator="['type',rule.type]" >
              <a-radio value="0">一级菜单</a-radio>
              <a-radio value="1">二级菜单</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="父菜单" v-show="query.type=='0'" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
			<a-input  type="hidden" :disabled="disabled" v-decorator="['parent']"/>
            <a-input-search placeholder="父菜单" @search="showMenu" size="large"  v-decorator="['parentName']" :disabled='disabled'>
    <a-button type="primary" slot="enterButton" :disabled="disabled"  @click="showMenu" >选择</a-button>
  </a-input-search>

          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="状态" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-radio-group   :disabled="disabled" v-decorator="['status',rule.status]" >
              <a-radio value="0">停用</a-radio>
              <a-radio value="1">启用</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="modeButton">
      <a-button :style="{marginRight: '8px'}"
                @click="onClose">
        取消
      </a-button>
      <a-button @click="onSubmit" type="primary">{{SubmitTypeMap[dialogType]}}</a-button>
    </div>
	<mymenu ref='mymenu' @showId="showId"></mymenu>
  </a-drawer>

</template>

<script>
import mymenu from './menu';
import {addMenu,updateMenu} from '@/api/system.js';

  export default {
    data() {
      return {
        form: this.$form.createForm(this),
        dialogTypeMap: {
          show: '菜单详情',
          create: '菜单新增',
          update: '菜单修改'
        },
        	hackRest:false,
        SubmitTypeMap: {
          show: '确认',
          create: '提交',
          update: '提交'
        },
        query:{
            type:'1'
        },
        showVisible: false,
        rule:{
          type:{ rules: [{ required: true, message: '类型' }],initialValue:'0'},
          name:{ rules: [{ required: true, message: '请输入姓名' }],initialValue:''},
          path:{ rules: [{ required: true, message: '请输入密码' }],initialValue:''},
          icon:{ rules: [{ required: true, message: '请输入确认密码' }],initialValue:''},
          status:{ rules: [{ required: true, message: '请选择状态' }],initialValue:'1'},
        }
      }
    },
    props: {
      showVisible: Boolean
    },
	components:{
	  mymenu
	},

    methods: {
		showId(query){
				  this.form.setFieldsValue(query)

		},
      //查看
      ShowDialog(query) {
        this.disabled = true
        this.showVisible = true
        this.dialogType = 'show'
        this.query = query

        this.$nextTick(() => {
          this.form.setFieldsValue(query)
        })
      },
	  //选择关联指标id
	  showMenu(){

	  		this.$refs.mymenu.showChildrenDrawer()
	  		// console.log(this.$refs.bounced)
	  },

      //新增
      CreateDialog() {
        this.disabled = false
        this.showVisible = true
        this.dialogType = 'create'
        this.query.type = '1'
      },
      //修改
  	  UpdateDialog(query) {
  	  	this.disabled=false
  	    this.showVisible = true
  	  	this.dialogType='update'
  		  this.$nextTick(()=>{
          	this.hackRest=true;
  			this.form.setFieldsValue(query)
        this.change();
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
           addMenu(values).then(res=>{
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
     change(){
       this.query.type = this.form.getFieldValue("type");

     },
     update(){
        this.form.validateFields((err, values) => {
          console.info(values)
        //  var listArry=this.form.getFieldsValue()
          updateMenu(values).then(res=>{
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


     }
    }
  }

</script>
