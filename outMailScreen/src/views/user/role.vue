<template>

  <a-drawer title="角色分配"  placement="right"  :closable="true"  @close="onClose"  :visible="showVisible"  width="700px">
    <div class="drawerBody">
    <a-table rowKey="id" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="list" bordered :pagination="pagination">
      <span slot="status" slot-scope="status">
           <a-badge :status="status=='01'?'success':'error'" />
          {{statusmap[status]}}
      </span>
    </a-table>
  </div>
    <div class="modeButton">
      <a-button :style="{marginRight: '8px'}"
                @click="onClose">
        取消
      </a-button>
      <a-button @click="onSubmit" type="primary">确认</a-button>
    </div>
  </a-drawer>

</template>

<script>
import {roleAllList,userrole} from '@/api/system.js';
  export default {
    data() {
      return {
        form: this.$form.createForm(this),
        columns: [
          { title: '角色ID', dataIndex: 'id',align:'center' },
          { title: '角色名称', dataIndex: 'name' ,align:'center'},
          { title: '角色描述', dataIndex: 'desc',align:'center' },
          { title: '角色状态', dataIndex: 'status',align:'center',scopedSlots: { customRender: 'status' } },
        ],
        list: [
        ],
        pagination: {

             defaultPageSize:5,
             showTotal: total => `共 ${total} 条数据`,
             showSizeChanger:true,
             pageSizeOptions: ['5', '10', '15', '20'],

        },
        showVisible: false,
        statusmap:{
          '00':'停用',
          '01':'启用'
        },
        selectedRowKeys:[]
      }
    },
    props: {
      showVisible: Boolean
    },

    methods: {

  	  initDialog(query) {
        this.handleSearch()

  	    this.showVisible = true
  	  },
      //查询所有角色
      handleSearch() {
        roleAllList().then(response=>{
          this.list = response.data;
          //this.pagination.total=this.list.;
          this.userrole();
        }).catch(error=>{
          console.info("失败");
          console.info(error.message);
        });
      },

      //查询用户角色
      userrole() {
        userrole().then(response=>{
          //this.list = response.data;
        this.selectedRowKeys = response.data;
        }).catch(error=>{
          console.info("失败");
          console.info(error.message);
        });
      },



      onSelectChange(selectedRowKeys) {

       this.selectedRowKeys = selectedRowKeys;
     },

  	  //关闭
  	  onClose(){
  		  this.showVisible = false;
  		  this.form.resetFields();
  	  },
      //提交按钮
        onSubmit() {
     }
        //end update

    }
  }

</script>

<style>
  .drawerBody{
    padding-bottom: 40px;
  }

</style>
