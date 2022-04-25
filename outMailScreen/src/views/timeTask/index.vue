<template>

  <div class="components-form-demo-advanced-search">
    <a-form class="ant-advanced-search-form"
            :form="form"
            @submit="" style="border:none;">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item label="作业名称" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <a-input v-model="listQuery.processName" placeholder="请输入作业名称" />
          </a-form-item>
        </a-col>
		
		<a-col :span="6">
		  <a-form-item label="状态" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" >
			<a-select defaultValue="0" style="width: 100%" @change="" v-model="listQuery.isValid" placeholder="请选择状态" >
			  <a-select-option value="1">禁用</a-select-option>
			  <a-select-option value="0">启用</a-select-option>
			  
			</a-select>
		  </a-form-item>
		</a-col>
		
      
        <a-col :span="8">
          <a-form-item>
			  <a-button type="primary" @click="getList">
				搜索
			  </a-button>
			  
		  </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="search-result-list">
		<div class="table-operations" >
			
			<a-button type="dashed" block style='margin:0;' @click="createlist()">+ 新增</a-button>
		</div>
      <a-table :columns="columns" :dataSource="list" bordered :pagination="pagination" :loading='loading' >
        <span slot="status_1" slot-scope="status">
            <a-badge :status="status=='运行'?'success':'error'"/>
            {{status}}
			
        </span>
		
		<span slot="status_2" slot-scope="status">
		     <a-badge :status="status=='0'?'success':'error'"/>
		     {{status | statusFilter}}
					
		 </span>
		
        <span slot="operation" slot-scope="text,recoed">
			<a  @click="showlist(recoed)">查看</a>
			<a-divider type="vertical" />
			<a-dropdown>
			  <a class="ant-dropdown-link" href="javascript:;">
				更多 <a-icon type="down" />
			  </a>
			  <a-menu slot="overlay">
				<a-menu-item>
				  <a href="javascript:;" @click="update(recoed)">修改</a>
				</a-menu-item>
				<a-menu-item>
				  <a href="javascript:;" @click="deletList(recoed)">删除</a>
				</a-menu-item>
				
				<a-menu-item>
				  <a href="javascript:;" @click="updatestatue(recoed)">{{recoed.isValid | FstatusFilter}}</a>
				</a-menu-item>
			  </a-menu>
			</a-dropdown>
			
		</span>
		

      </a-table>
    </div>
        <edit ref='edit' @fresh="fresh"/>
  </div>

</template>
<script>
import {getAllJobsByPage ,delJob,forbidJob,startJob} from '@/api/index.js';
import edit from './edit';

  export default {
	filters:{
		statusFilter(status){
			const statusMap={
				'0':'启用',
				'1':'禁用'
			}
			return statusMap[status]
		},
		FstatusFilter(status){
			const statusMap={
				'1':'启用',
				'0':'禁用'
			}
			return statusMap[status]
		}
	},
    data() {
      return {
        expand: false,
		loading:false,
        form: this.$form.createForm(this),
        columns: [
		  { title: '作业名称', dataIndex: 'processName' },
          { title: 'Java类名', dataIndex: 'className' },
		  { title: '组名', dataIndex: 'groupName'},
          { title: '调度表达式', dataIndex: 'cronExpr' },
		  { title: '调度说明', dataIndex: 'scheduleDesc'},
          { title: '状态', dataIndex: 'isValid',align:'center', scopedSlots: { customRender: 'status_2' } },
          { title: '操作',    dataIndex: 'operation',width:'160px',align:'center', scopedSlots: { customRender: 'operation' } }
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
        showVisible: false,
        record:{},
		
		listQuery:{
			processName:'',
			isValid:'',
			pageNum:1,
			pageSize:5
		},
		
      }
    },
    components:{
      edit
    },
    computed: {
      count() {
        return this.expand ? 11 : 3
      }
    },
	created(){
		this.getList()
	},
    methods: {
		//列表展示和搜索
		getList(){
			this.loading=true
			 getAllJobsByPage(this.listQuery).then(res=>{
				if(res.data.code=='0000'){
					this.loading=false
					//console.log(res)
					this.list = res.data.extend.list
					this.pagination.total = res.data.extend.total;
				}else{
					this.loading=false
					this.$message.error(res.data.message)
				}
			 })
		},
		

		  handleReset() {
			this.form.resetFields()
		  },

		//查看更多
		  showlist(row) {
			this.$refs.edit.ShowDialog(Object.assign({},row));
		  },
		  
		  //新增
		  createlist() {
			this.$refs.edit.CreateDialog();
		  },
		  
		  //删除
		  deletList(row){
			  if(row.isValid==0){
				this.$info({
					title:'提示',
					content:'启用状态下不可删除！',
					
				})
			  }else{
				var _this=this
				this.$confirm({
				  title:'确认删除？',
				  content:'确认删除本条记录，删除后不可恢复',
				  okType:'danger',
				  onOk(){
					delJob({processId:row.processId}).then(res=>{
						//console.log(res)
						if(res.data.code=='0000'){
							_this.getList()
							_this.$message.success(res.data.message)
						}else{
							_this.$message.error(res.data.message)
						}
							
					})
				  },
								  
				})
			  }
			  
		  },
		  
		  //修改
		  update(row){
			this.$refs.edit.UpdateDialog(row);  
		  },
		  
		  //修改状态
		  updatestatue(query){
			var _this=this
			var processId=query.processId
			if(query.isValid=='0'){// 0=》 启用    1 =》停用
				forbidJob({processId:processId}).then(res=>{
					if(res.data.code=="0000"){
						_this.getList()
						_this.$message.success(res.data.message)
					}else{
						_this.$message.error(res.data.message)
					}
				})
			}else{
				startJob({processId:processId}).then(res=>{
					if(res.data.code=="0000"){
						_this.getList()
						_this.$message.success(res.data.message)
					}else{
						_this.$message.error(res.data.message)
					}
				})
			}
			
		  },
		  
		  //刷新数据
		  fresh(){
			  this.getList()
		  },
		   
		  onClose() {
			this.showVisible = false
		  },

		  toggle() {
			this.expand = !this.expand
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
		  }
    }
  }

</script>
<style>

  .ant-advanced-search-form {
    padding: 0px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }

  .ant-advanced-search-form .ant-form-item {
    display: flex;
  }

  .ant-advanced-search-form .ant-form-item-control-wrapper {
    flex: 1;
  }

  .components-form-demo-advanced-search .ant-form {
    max-width: none;
    border-radius: 4px;
  }
  .components-form-demo-advanced-search .search-result-list {
    margin-top: 5px;
    text-align: center;
    padding: 4px 12px;
  }

  #test .ant-row {
    margin: 10px;
  }

  .table-operations {
    text-align: right;
  margin-bottom: 10px;
}

.table-operations > button {
  margin-right: 18px;
}



</style>
